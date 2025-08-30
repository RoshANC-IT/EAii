import { useState } from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchJobQueryText } from "./redux/jobSlice";

function HeroSection() {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    if (!query.trim()) return; // Optional: prevent empty searches
    dispatch(setSearchJobQueryText(query));
    navigate("/browser");
  };

  return (
    <div className="text-center px-4">
      <div className="flex py-2 gap-5 my-1"></div>
      <span className="px-4 py-4 rounded-full bg-gray-100 text-[#d3453b] font-medium">
        No: 1 Job Hunt Website
      </span>

      <h1 className="text-5xl font-bold my-5">
        Search Apply & <br /> Get your{" "}
        <span className="text-[#d3453b]">Dream Jobs</span>
      </h1>

      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa nesciunt
        earum fugit aut explicabo{" "}
      </p>

      {/* Search Bar */}
      <div className="flex w-full max-w-md sm:w-3/4 md:w-2/5 shadow-2xl p-3 rounded items-center gap-4 mx-auto">
        <input
          type="text"
          placeholder="Find your Dream's Jobs"
          className="w-full outline-none border-none bg-transparent text-black dark:text-white"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") searchJobHandler();
          }}
          aria-label="Job search input"
        />
        <Button onClick={searchJobHandler} aria-label="Search Jobs">
          <Search className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}

export default HeroSection;
