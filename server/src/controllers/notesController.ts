import type { Request, Response } from "express";

//Get all Notes
export function getNotes(req: Request, res: Response) {
  res.status(200).json({
    message: "Note Get Worked",
  });
}

// PUT a note (UPDATE)

export function updateNote(req: Request, res: Response) {
  res.status(200).json({
    message: "Note Put Worked",
  });
}

// POST a new note
export function createNote(req: Request, res: Response) {
  res.status(200).json({
    message: "Note Post Worked",
  });
}

// DELETE a note
export function deleteNote(req: Request, res: Response) {
  res.status(200).json({
    message: "Note Delete Worked",
  });
}
