import bcrypt from 'bcrypt';
import { Instructor } from '../../models/Instructor';
import { IInstructor } from '../../interfaces/IInstructor';
import { BaseRepository } from '../base.repo';

export class InstructorRepo extends BaseRepository<IInstructor> {
  constructor() {
    super(Instructor);
  }

  async findByEmail(email: string): Promise<IInstructor | null> {
    try {
      return await Instructor.findOne({ email });
    } catch (error) {
      console.error('Error find instructor', error);
      return null;
    }
  }

  async passwordCompare(password: string, hashedPassword: string): Promise<boolean> {
    try {
      return await bcrypt.compare(password, hashedPassword);
    } catch (error) {
      console.error('Error compare password', error);
      return false;
    }
  }

  // async createUser(instructorData: IInstructor): Promise<IInstructor | null> {
  //   const salt = await bcrypt.genSalt(10);
  //   instructorData.password = await bcrypt.hash(instructorData.password, salt);
  //   const newInstructor = new Instructor(instructorData);
  //   return await newInstructor.save();
  // }

  async updatePassword(instructor: IInstructor, password: string): Promise<any> {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      return await Instructor.updateOne({ email: instructor.email }, { password: hashedPassword });
    } catch (error) {
      console.error('Error update password', error);
    }
  }

  // async update(instructor: any): Promise<IInstructor | null> {
  //   return await Instructor.findByIdAndUpdate(instructor._id, instructor, { new: true });
  // }

  // async findById(userId: string): Promise<IInstructor | null> {
  //   return await Instructor.findById(userId);
  // }

  async findStatus(instructor: IInstructor): Promise<IInstructor | null> {
    try {
      return await Instructor.findOne({ email: instructor.email, isActive: instructor.isActive === true });
    } catch (error) {
      console.error('Error find status', error);
      return null;
    }
  }
}
