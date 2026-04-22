import { ArrowLeft, Trash2, Save } from "lucide-react";
import type { NoteCard } from "../types";
import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router";
import Navbar from "../components/Navbar";
import api from "../lib/axios";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import type { ChangeEvent } from "react";

const NoteDetailPage = () => {
  const [note, setNote] = useState<NoteCard | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  // Validate the ID from the URL
  if (!id) {
    toast.error("Invalid note ID");
    navigate("/");
    return null;
  }

  useEffect(() => {
    const fetchNoteData = async () => {
      try {
        setIsLoading(true);
        const res = await api.get(`/notes/${id}`);

        setNote(res.data);
      } catch (error) {
        const axiosError = error as AxiosError<{ message: string }>;
        console.log(axiosError.response?.data?.message);
        toast.error(
          "An error occurred while fetching the note. Please try again later.",
        );
      } finally {
        setIsLoading(false);
      }
    };
    fetchNoteData();
  }, [id]);

  // Handle delete and save actions
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted successfully");
      navigate("/");
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      console.log(axiosError.response?.data?.message);
      toast.error(
        "An error occurred while deleting the note. Please try again later.",
      );
    }
  };

  // Handle save action
  const handleSave = async () => {
    if (!note) return;
    if (!note?.title.trim() && !note?.content.trim()) {
      await handleDelete();
      return;
    }

    if (!note?.title.trim() || !note?.content.trim()) {
      toast.error("All fields are required");
      return;
    }

    setSaving(true);
    try {
      await api.put(`/notes/${id}`, note);
      toast.success("Note updated successfully");
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      console.log(axiosError.response?.data?.message);
      toast.error(
        "An error occurred while updating the note. Please try again later.",
      );
    } finally {
      setSaving(false);
    }
  };

  // Handle input change for both title and content
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setNote((prevNote) => {
      if (!prevNote) return null;
      return { ...prevNote, [name]: value };
    });
  };

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="flex justify-center items-center bg-base-200 p-0 sm:p-4 min-h-screen">
          <div className="flex flex-col bg-base-100 shadow-xl border border-base-300 sm:rounded-2xl w-full max-w-2xl h-screen sm:h-[85vh] overflow-hidden">
            <div className="flex flex-1 justify-center items-center">
              <span className="loading-ring loading loading-xl"></span>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center bg-base-200 p-0 sm:p-4 min-h-screen">
        {/* 2. The "Window" Card: Responsive width and height */}
        <div className="flex flex-col bg-base-100 shadow-xl border border-base-300 sm:rounded-2xl w-full max-w-2xl h-screen sm:h-[85vh] overflow-hidden">
          {/* HEADER: Sticky at the top of the card */}
          <header className="flex justify-between items-center bg-base-100 p-4 border-base-300 border-b">
            <Link to="/">
              <button className="gap-2 btn btn-ghost btn-sm">
                <ArrowLeft className="size-4" />
                <span className="hidden sm:inline">Back</span>
              </button>
            </Link>
            <button
              className="gap-2 hover:bg-error/10 text-error btn btn-ghost btn-sm"
              onClick={handleDelete}
            >
              <Trash2 className="size-4" />
              <span className="hidden sm:inline">Delete</span>
            </button>
          </header>

          {/* BODY: Scrollable area for the note */}
          <main className="flex-1 space-y-4 p-6 overflow-y-auto custom-scrollbar">
            <input
              name="title"
              type="text"
              placeholder="Note Title"
              className="focus:bg-transparent placeholder:opacity-30 px-0 border-none focus:outline-none w-full font-bold text-2xl input input-ghost"
              value={note?.title || ""}
              onChange={handleInputChange}
            />

            <div className="bg-base-200 w-full h-[1px]" />

            <textarea
              name="content"
              placeholder="Start typing..."
              className="focus:bg-transparent px-0 border-none focus:outline-none w-full min-h-[300px] text-base leading-relaxed resize-none textarea textarea-ghost"
              value={note?.content || ""}
              onChange={handleInputChange}
            />
          </main>

          {/* FOOTER: Fixed at the bottom of the card */}
          <footer className="flex justify-end bg-base-50/50 p-4 border-base-300 border-t">
            <button
              className="shadow-md px-8 btn btn-primary btn-sm sm:btn-md"
              onClick={handleSave}
              disabled={saving}
            >
              <Save className="mr-2 size-4" />
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </footer>
        </div>
      </div>
    </>
  );
};

export default NoteDetailPage;
