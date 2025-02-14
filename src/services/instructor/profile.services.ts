import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { IInstructor, IInstructorProfileService } from 'src/interfaces/IInstructor';
import { InstructorRepo } from 'src/repo/instructor/instructor.repo';

export class InstructorProfileService implements IInstructorProfileService {
  private _instructorRepository: InstructorRepo;
  private _s3Client: S3Client;

  constructor(instructorRepository: InstructorRepo) {
    this._instructorRepository = instructorRepository;
    this._s3Client = new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      },
    });
  }

  // get instructor details
  async instructorDetails(userId: string) {
    const instructor = await this._instructorRepository.findById(userId);
    return instructor;
  }

  // update instructor details
  async updateInstructor(instructorId: string, updateData: Partial<IInstructor>) {
    const instructor = await this._instructorRepository.findById(instructorId);
    if (!instructor) {
      throw new Error('Instructor not found');
    }
    Object.assign(instructor, updateData);
    return await this._instructorRepository.update(instructor);
  }

  // change password
  async changePassword(userId: string, currentPassword: string, newPassword: string) {
    const instructor = await this._instructorRepository.findById(userId);
    if (!instructor) {
      throw new Error('Instructor not found');
    }

    const isValidPassword = await this._instructorRepository.passwordCompare(currentPassword, instructor.password as string);
    if (!isValidPassword) {
      throw new Error('Invalid current password');
    }

    const changedPassword = await this._instructorRepository.updatePassword(instructor, newPassword);
    return changedPassword;
  }

  // update profile photo
  async uploadFileToS3(file: Express.Multer.File, userId: any) {
    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME!,
      Key: `profile-photos/${Date.now()}-${file.originalname}`,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    try {
      await this._s3Client.send(new PutObjectCommand(params));
      const photoUrl = `https://${params.Bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${params.Key}`;

      const user = await this._instructorRepository.findById(userId);
      if (!user) {
        throw new Error('User not found');
      }
      user.profilePhoto = photoUrl;
      console.log('user after upload', user);
      await this._instructorRepository.update(user);
      return photoUrl;
    } catch (error) {
      console.log('Error uploading file to s3', error);
      throw new Error('File upload failed');
    }
  }
}
