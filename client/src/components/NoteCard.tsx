import React from "react";
import { Link } from "react-router";
import { SquarePen, Trash2Icon } from "lucide-react";
import { formatDat } from "../lib/utils";
import toast from "react-hot-toast";
import api from "../lib/axios";
import type { Note } from "../types";

// Note Data Shape

//Porps
interface NoteCardProps {
  note: Note;
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
}

const NoteCard: React.FC<NoteCardProps> = ({ note, setNotes }) => {
  const handleDelete = async (
    e: React.MouseEvent<HTMLButtonElement>,
    id: string,
  ) => {
    e.preventDefault();
    if (!window.confirm("are you sure?")) return;
    try {
      await api.delete(`/notes/${id}`);

      setNotes((prev) => prev.filter((note) => note._id !== id));
      toast.success("Note deleted successfully");
    } catch (error) {
      console.log("Error in deleting the note ==>  ", error);
      toast.error("An error occurred while deleting your note. ");
    }
  };

  return (
    <Link to={`/note/${note._id}`} className="block">
      <div className="group bg-accent/5 hover:bg-accent/10 hover:shadow-lg p-3 border border-accent/20 rounded-4xl transition-all duration-300">
        <div className="bg-base-100 shadow-sm p-6 border border-accent/5 rounded-3xl">
          <div className="flex justify-between items-start mb-3">
            <h2 className="font-bold group-hover:text-accent text-base-content text-xl transition-colors">
              {note.title}
            </h2>
          </div>

          <p className="text-sm text-base-content/70 line-clamp-3 leading-relaxed">
            {note.content}
          </p>
        </div>

        <div className="flex justify-between items-center px-4 py-3">
          <div className="flex items-center gap-2">
            {note.updatedAt && (
              <span className="bg-accent/10 px-2 py-1 rounded-md font-black text-[10px] text-accent/60 uppercase tracking-widest">
                {formatDat(note.updatedAt)}
              </span>
            )}
          </div>

          <div className="flex gap-1">
            <div className="hover:bg-accent/20 text-accent/70 btn btn-ghost btn-circle btn-sm">
              <SquarePen className="size-4" />
            </div>
            <button
              aria-label="Delete note"
              className="hover:bg-error/10 text-error/70 btn btn-ghost btn-circle btn-sm"
              onClick={(e) => handleDelete(e, note._id)}
            >
              <Trash2Icon className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NoteCard;
