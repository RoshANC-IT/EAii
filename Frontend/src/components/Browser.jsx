import { useDispatch, useSelector } from "react-redux";
import Job from "./Job";
import { useEffect } from "react";
import { setSearchJobQueryText } from "./redux/jobSlice";
import useGetAllJobs from "@/Hooks/useGetAllJobs";
import { motion } from "framer-motion";
import "./index.css";

export default function Browser() {
  useGetAllJobs();
  const dispatch = useDispatch();
  const { allJobs } = useSelector((store) => store.job);

  useEffect(() => {
    dispatch(setSearchJobQueryText(""));
  }, [dispatch]);

  return (
    <div className="max-w-7xl mx-auto my-10 px-4 sm:px-6 lg:px-8">
      <h4 className="font-semibold text-lg sm:text-xl">
        Search Result{" "}
        <span className="font-bold text-red-500">{allJobs.length}</span>
      </h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
        {allJobs.map((job) => (
          <motion.div
            key={job._id}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5, ease: [0.43, 0.13, 0.28, 0.96] }}
          >
            <Job job={job} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
