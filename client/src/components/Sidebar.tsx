import Navbar from "./Navbar";

import React from "react";

const Sidebar = () => {
  return (
    <div className="flex bg-base-100 min-h-screen">
      {/* SIDEBAR - The 'group' class is the secret sauce here */}
      <aside className="group z-10 flex flex-col bg-base-100 p-4 border-base-300 border-r w-20 hover:w-64 transition-all duration-300">
        <ul className="space-y-4 p-0 menu">
          {/* Example Item: Notes */}
          <li className="flex items-center">
            <a className="flex items-center gap-4 hover:bg-base-200 px-3 py-2 rounded-lg">
              <span className="text-xl shrink-0">📝</span>{" "}
              {/* Icon always visible */}
              <span className="opacity-0 group-hover:opacity-100 font-medium whitespace-nowrap transition-opacity duration-300">
                Notes
              </span>
            </a>
          </li>

          {/* Example Item: Folders */}
          <li className="flex items-center">
            <a className="flex items-center gap-4 hover:bg-base-200 px-3 py-2 rounded-lg">
              <span className="text-xl shrink-0">📁</span>
              <span className="opacity-0 group-hover:opacity-100 font-medium whitespace-nowrap transition-opacity duration-300">
                Personal
              </span>
            </a>
          </li>
        </ul>

        {/* Bottom Button (New Folder) */}
        <button className="group-hover:btn-block flex justify-center group-hover:justify-start items-center gap-4 mt-auto p-3 group-hover:rounded-xl btn btn-ghost btn-circle">
          <span>➕</span>
          <span className="hidden group-hover:block transition-all">
            New Folder
          </span>
        </button>
      </aside>

      {/* MAIN CONTENT - Ensure it takes the remaining space */}
      <main className="flex-1 overflow-y-auto">
        <Navbar />
        <div className="p-8">{/* Note Card Grid */}</div>
      </main>
    </div>
  );
};

export default Sidebar;
