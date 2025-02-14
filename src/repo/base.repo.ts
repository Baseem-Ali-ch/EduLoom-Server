import { IBaseRepository } from "../interfaces/IBaseRepo";

export class BaseRepository<T> implements IBaseRepository<T> {
  private _model: any; 

  constructor(model: any) {
    this._model = model;
  }

  async findById(id: string): Promise<T | null> {
    return this._model.findById(id).exec();
  }

  async findAll(): Promise<T[]> {
    return this._model.find().exec();
  }

  async create(entity: T): Promise<T> {
    const newEntity = new this._model(entity);
    return newEntity.save();
  }

  async update(entity: any): Promise<T> {
    return this._model.findByIdAndUpdate(entity._id, entity, { new: true }).exec();
  }

  async delete(id: string): Promise<void> {
    await this._model.findByIdAndDelete(id).exec();
  }
}