import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import RateLimitedUI from "../components/RateLimitedUI";
import toast from "react-hot-toast";
import NoteCard from "../components/NoteCard";
import api from "../lib/axios";
import type { Note } from "../types";
import type { AxiosError } from "axios";

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
      } catch (error: any) {
        console.log("Error Fetching Notes:  ", error);
        if (error.response?.status === 429) {
          setIsRateLimited(true);
        } else {
          const axiosError = error as AxiosError<{ message: string }>;
          console.log(axiosError.response?.data?.message);

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
      <div className="p-4">
        {loading && (
          <>
            <p>Loading notes...</p>
            <span className="loading-ring loading loading-xl"></span>
          </>
        )}
      </div>
      <div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {notes.map((note) => (
          <NoteCard key={note._id} note={note} setNotes={setNotes} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
