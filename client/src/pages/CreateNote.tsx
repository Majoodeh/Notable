import React, { useState } from "react";
import { ArrowLeft, Send } from "lucide-react";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import api from "../lib/axios";

// ! TODO : add condition to disable the create note button when it is empty or when it is creationg a note.
const CreateNote: React.FC = () => {
  // states management

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error(" Title and content cannot be empty");
      return;
    }
    setIsLoading(true);
    try {
      await api.post("/notes", { title, content });
      toast.success("Note Created Successfully");
      navigate("/");
    } catch (error) {
      toast.error(
        " An error occurred while creating the note. Please try again later.",
      );
      console.log("Error in creating the note: -- ", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col bg-base-100 p-4 md:p-8 h-screen max-h-screen">
      <div className="flex flex-col flex-1 mx-auto w-full max-w-3xl overflow-hidden">
        {/* Navigation */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 mb-6 font-medium hover:text-accent text-sm text-base-content/60 transition-colors shrink-0"
        >
          <ArrowLeft className="size-4" />
          Back To Home
        </Link>

        {/* Main Form Card  */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col flex-1 bg-base-100 shadow-base-300/50 shadow-xl border border-base-300 rounded-3xl overflow-hidden"
        >
          <div className="flex flex-col flex-1 p-6 md:p-10">
            <div className="flex flex-col flex-1 space-y-6">
              {/* Title  */}
              <div className="space-y-2 shrink-0">
                <input
                  type="text"
                  placeholder="Title"
                  className="bg-transparent placeholder:opacity-30 outline-none w-full font-bold text-base-content text-3xl md:text-4xl"
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                  value={title}
                />
                <div className="bg-base-300 w-full h-px" />
              </div>

              {/* Content Input  */}
              <textarea
                placeholder="Content"
                className="flex-1 bg-transparent placeholder:opacity-30 py-2 outline-none w-full text-base-content/80 text-lg resize-none"
                onChange={(e) => {
                  setContent(e.target.value);
                }}
                value={content}
              ></textarea>

              {/* Bottom Bar  */}
              <div className="flex sm:flex-row flex-col justify-between items-center gap-4 pt-6 border-base-200 border-t shrink-0">
                <span className="order-2 sm:order-1 font-medium text-xs text-base-content/40">
                  Drafting in <span className="text-accent">Notable</span>
                </span>

                <button
                  className="shadow-accent/20 shadow-lg rounded-xl w-full sm:w-auto btn btn-accent btn-sm md:btn-md"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? "Creating the note ..." : "Create Note"}
                  <Send className="size-4" />
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateNote;
