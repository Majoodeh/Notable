import mongoose from "mongoose";

// steps:
// 1- create a schema
//2- model based off of that schema

export interface INote extends mongoose.Document {
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

const noteSchema = new mongoose.Schema<INote>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
  },
  { timestamps: true },
);

const Note = mongoose.model<INote>("Note", noteSchema);

export default Note;
