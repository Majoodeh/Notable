import express from "express";
import {
  getNotes,
  updateNote,
  createNote,
  deleteNote,
} from "../controllers/notesController.js";

const router = express.Router();

router.get("/", getNotes);

router.post("/:id", createNote);

router.put("/:id", updateNote);

router.delete("/:id", deleteNote);

export default router;
