import { CourseRepo } from '../../repo/instructor/course.repo';
import { CourseDTO } from '../../dtos/dto';
import { ObjectId } from 'mongoose';
import { GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Course } from '../../models/Course';
import { ICourse } from '../../interfaces/IInstructor';
import { MapCourse } from '../../mappers/mapper';

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

  async getCourse() {
    const courses = await this._courseRepository.findAllCourse();
    const populatedCourses = await Course.populate(courses, [{ path: 'instructorId' }, { path: 'offer' }]);
    return populatedCourses;
  }

  async getDoc(courseId: string): Promise<{ [key: string]: string }> {
    const course = await this._courseRepository.findById(courseId);
  
    if (!course) {
      throw new Error('Course not found');
    }
  
    const signedUrls: { [key: string]: string } = {};
  
    // Iterate through modules and lessons to generate signed URLs
    for (const module of course.modules) {
      for (const lesson of module.lessons) {
        if (lesson.document) {
          const signedUrl = await getSignedUrl(
            this._s3Client,
            new GetObjectCommand({
              Bucket: process.env.AWS_S3_BUCKET_NAME!,
              Key: lesson.document,
            }),
            { expiresIn: 3600 } // 1 hour expiration
          );
          signedUrls[lesson.document] = signedUrl; // Map documentKey to signedUrl
        }
      }
    }
  
    return signedUrls;
  }

  async createCourse(courseData: CourseDTO, instructorId: ObjectId, files: Express.Multer.File[]): Promise<any> {
    courseData.instructorId = instructorId;

    if (files && files.length > 0) {
      try {
        const uploadPromises = files.map(async (file: Express.Multer.File, index: number) => {

          const fileName = file.originalname;
          const sanitizedFileName = fileName.replace(/[^a-zA-Z0-9.-]/g, '-').replace(/-+/g, '-');
          const key = `course-content/${Date.now()}-${index}-${sanitizedFileName}`;
          console.log('s3 key', key);

          const params = {
            Bucket: process.env.AWS_S3_BUCKET_NAME!,
            Key: key,
            Body: file.buffer,
            ContentType: file.mimetype,
          };

          console.log('params', params);
          await this._s3Client.send(new PutObjectCommand(params));

          const signedUrl = await getSignedUrl(
            this._s3Client,
            new GetObjectCommand({
              Bucket: params.Bucket,
              Key: params.Key,
            }),
            { expiresIn: 3600 }
          );
          console.log('signed url', signedUrl);

          return { key, signedUrl };
        });

        const uploadedFiles = await Promise.all(uploadPromises);

        let fileIndex = 0;
        courseData.modules.forEach((module) => {
          module.lessons.forEach((lesson) => {
            if (fileIndex < uploadedFiles.length) {
              lesson.document = uploadedFiles[fileIndex].key;
              fileIndex++;
            }
          });
        });
      } catch (error) {
        console.error('Error uploading files to S3:', error);
        throw new Error('File upload failed');
      }
    }

    const mappedCourseData: ICourse = MapCourse(courseData, instructorId);
    try {
      const course = await this._courseRepository.create(mappedCourseData);
      console.log('Course created:', course);
      return course;
    } catch (error) {
      console.error('Error saving course to DB:', error);
      throw new Error('Failed to save course');
    }
  }
}
