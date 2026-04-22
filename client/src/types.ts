export interface Note {
  _id: string;
  title: string;
  content: string;
  createdAt?: string;
  updatedAt?: string;
}

export type NoteCard = Pick<Note, "title" | "content">;
