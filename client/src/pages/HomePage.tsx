import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import RateLimitedUI from "../components/RateLimitedUI";
import axios from "axios";

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get("http://localhost:5001/api/notes");
        console.log(res.data);
        console.log("response=====>    ", res);
      } catch (error) {
        console.log("Error Fetching Notes:  ", error);
      }
    };
  });

  return (
    <div className="min-h-screen">
      <Navbar />
      {/* // Conditional rendering of the */}
      {isRateLimited && <RateLimitedUI />}
    </div>
  );
};

export default HomePage;
