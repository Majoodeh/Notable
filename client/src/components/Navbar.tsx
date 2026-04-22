import { FilePlusCorner } from "lucide-react";
import { Link, useLocation } from "react-router";

const Navbar = () => {
  const location = useLocation();
  return (
    <header className="bg-base-300 border-base-content/10 border-b">
      <div className="mx-auto p-4 max-w-6xl">
        <div className="flex justify-between items-center">
          <Link to="/">
            <h1 className="font-mono font-bold text-accent text-3xl tracking-tight">
              Notable
            </h1>
          </Link>

          <div className="flex items-center gap-4">
            {location.pathname === "/" && (
              <Link to={"/create"} className="btn btn-soft btn-accent">
                <FilePlusCorner className="size-5" />
                <span>New Note</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
