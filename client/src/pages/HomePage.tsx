import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import RateLimitedUI from "../components/RateLimitedUI";
import toast from "react-hot-toast";
import NoteCard from "../components/NoteCard";
import api from "../lib/axios";

interface Note {
  _id: string;
  title: string;
  content: string;
  createdAt?: string;
  updatedAt?: string;
}

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get<Note[]>("/notes");
        setNotes(res.data);
        setIsRateLimited(false);
        console.log("notes=====>    ", notes);
        console.log(res.data);
        console.log("response=====>    ", res);
      } catch (error: any) {
        console.log("Error Fetching Notes:  ", error);
        if (error.response?.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error(
            "An error occurred while fetching notes. Please try again later.",
          );
        }
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      {/* // Conditional rendering of the */}
      {isRateLimited && <RateLimitedUI />}
      <div className="p-4">{loading && <p>Loading notes...</p>}</div>
      <div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {notes.map((note) => (
          <NoteCard key={note._id} note={note} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
