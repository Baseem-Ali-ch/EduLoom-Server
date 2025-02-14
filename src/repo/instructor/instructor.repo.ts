import bcrypt from 'bcrypt';
import { Instructor } from '../../models/Instructor';
import { IInstructor, IInstructorRepo } from '../../interfaces/IInstructor';

export class InstructorRepo implements IInstructorRepo {
  async findByEmail(email: string): Promise<IInstructor | null> {
    return await Instructor.findOne({ email });
  }

  async passwordCompare(password: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }

  // async createUser(instructorData: IInstructor): Promise<IInstructor | null> {
  //   const salt = await bcrypt.genSalt(10);
  //   instructorData.password = await bcrypt.hash(instructorData.password, salt);
  //   const newInstructor = new Instructor(instructorData);
  //   return await newInstructor.save();
  // }

  async updatePassword(instructor: IInstructor, password: string): Promise<any> {
    const hashedPassword = await bcrypt.hash(password, 10);
    return await Instructor.updateOne({ email: instructor.email }, { password: hashedPassword });
  }

  async update(instructor: any): Promise<IInstructor | null> {
    return await Instructor.findByIdAndUpdate(instructor._id, instructor, { new: true });
  }

  async findById(userId: string): Promise<IInstructor | null> {
    return await Instructor.findById(userId);
  }

  async findStatus(instructor: IInstructor): Promise<IInstructor | null> {
    return await Instructor.findOne({ email: instructor.email, isActive: instructor.isActive === true });
  }
}

