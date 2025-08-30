import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchJobByText } from '../redux/jobSlice';  // Adjust import path if necessary
import { useNavigate } from 'react-router-dom';
import { Button } from "../ui/button";
import { Input } from "../ui/input"; 
import AdminJobsTable from "./AdminJobsTable";
import useGetAdminAllJobs from "@/Hooks/useGetAdminAllJobs";

const AdminJobs = () => {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { loading, error } = useGetAdminAllJobs();

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input, dispatch]);

  return (
    <div className="max-w-6xl mx-auto my-10 px-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 my-5">

        <Input
          className="w-full max-w-sm"
          placeholder="Filter by name, role"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <Button onClick={() => navigate("/admin/job/create")}>
          New Jobs
        </Button>

      </div>

      {loading ? (
        <p className="text-center text-gray-600">Loading jobs...</p>
      ) : error ? (
        <p className="text-center text-red-600">{error}</p>
      ) : (
        <AdminJobsTable />
      )}
    </div>
  );
};

export default AdminJobs;
