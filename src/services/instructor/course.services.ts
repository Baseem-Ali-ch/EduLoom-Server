import { CourseRepo } from '../../repo/instructor/course.repo';
import { CourseDTO } from '../../dtos/dto';
import { ObjectId } from 'mongoose';
import { GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

export class instructorCourseService {
  private _courseRepository: CourseRepo;
  private _s3Client: S3Client;

  constructor(courseRepo: CourseRepo) {
    this._courseRepository = courseRepo;
    this._s3Client = new S3Client({
        region: process.env.AWS_REGION,
        credentials: {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
        },
      });
  }

  async createCourse(courseData: CourseDTO, instructorId: ObjectId): Promise<any> {
    courseData.instructorId = instructorId;
    console.log('instructor id', instructorId)
    console.log('courseData', courseData)

    const files = courseData.modules.flatMap((module) => module.lessons.filter((lesson) => lesson.document)).map((lesson) => lesson.document); // Assuming document is a file object
    console.log('files', files)
    if (files.length > 0) {
      try {
        const uploadPromises = files.map(async (file: any, index: number) => {
          const key = `course-content/${Date.now()}-${index}-${file.originalname}`;
          const params = {
            Bucket: process.env.AWS_S3_BUCKET_NAME!,
            Key: key,
            Body: file.buffer,
            ContentType: file.mimetype,
          };

          await this._s3Client.send(new PutObjectCommand(params));

          const signedUrl = await getSignedUrl(
            this._s3Client,
            new GetObjectCommand({
              Bucket: params.Bucket,
              Key: params.Key,
            }),
            { expiresIn: 3600 }
          );

          return { key, signedUrl };
        });

        const uploadedFiles = await Promise.all(uploadPromises);

        let fileIndex = 0;
        courseData.modules.forEach((module) => {
          module.lessons.forEach((lesson) => {
            if (lesson.document) {
              lesson.document = uploadedFiles[fileIndex].key; // Store S3 key
              fileIndex++;
            }
          });
        });
      } catch (error) {
        console.error('Error uploading files to S3:', error);
        throw new Error('File upload failed');
      }
    }

    try {
      const course = await this._courseRepository.create(courseData);
      console.log('Course created:', course);
      return course;
    } catch (error) {
      console.error('Error saving course to DB:', error);
      throw new Error('Failed to save course');
    }
  }
}
