import mongoose, { Schema, Document } from 'mongoose';

export interface IChat extends Document {
  chatRoomId: string;
  sender: string;
  message: string;
  timestamp: string;
}

const chatSchema: Schema = new Schema({
  chatRoomId: { type: String, required: true },
  sender: { type: String, required: true },
  message: { type: String, required: true },
  timestamp: { type: String, required: true },
});

export default mongoose.model<IChat>('Chat', chatSchema);
