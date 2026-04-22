export interface Note {
  _id: string;
  title: string;
  content: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface NoteCard {
  title: string;
  content: string;
}
