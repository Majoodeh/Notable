import type { Request, Response } from "express";
import Note from "../modles/Notes.js";

//Get all Notes
export async function getNotes(req: Request, res: Response) {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (error: any) {
    console.error("Error in getNotes", error);

    res.status(500).json({ message: "Internal server error" });
  }
}

// PUT a note (UPDATE)
export async function updateNote(req: Request, res: Response) {
  try {
    const { title, content } = req.body;
    const noteId = req.params.id;

    // Title, Content validation
    if (!title || !content) {
      return res
        .status(400)
        .json({ message: "Title and Content are required" });
    }

    const updatedNote = await Note.findByIdAndUpdate(
      noteId,
      { title, content },
      { returnDocument: "after", runValidators: true },
    );

    // to check if the id exist or not
    if (!updatedNote) {
      console.log("Note not found in DB");
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json(updatedNote);
  } catch (error: any) {
    console.error(" Error in updating the note", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// POST a new note
export async function createNote(req: Request, res: Response) {
  try {
    const { title, content } = req.body;

    // Validation Check, to check if data exists
    if (!title || !content) {
      return res
        .status(400)
        .json({ message: "Title and content are required" });
    }
    // Create the note and save it
    const newNote = await Note.create({ title, content });

    // Response
    res
      .status(201)
      .json({ message: "Note created successfully", note: newNote });
  } catch (error: any) {
    console.error(" Error in creating a note", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// DELETE a note
export async function deleteNote(req: Request, res: Response) {
  try {
    const noteId = req.params.id;

    const deletedNote = await Note.findByIdAndDelete(noteId);
    if (!deletedNote) {
      return res.status(404).json({ message: "Note does not exist" });
    }

    res.status(200).json({ message: "Note is deleted successfully" });
  } catch (error: any) {
    console.error(" Error in deleting the note", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
