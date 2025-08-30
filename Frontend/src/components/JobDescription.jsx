// import { useEffect, useState } from "react";
// import { Badge } from "./ui/badge";
// import { Button } from "./ui/button";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
// import { setSingleJob } from "./redux/jobSlice";
// import { useDispatch, useSelector } from "react-redux";
// import { toast } from "sonner";
// import "./Notify/ToastifyCSS.css";
// import "./index.css"
// const JobDescription = () => {
//   const { singleJob } = useSelector((store) => store.job);
//   const { user } = useSelector((store) => store.auth);
//   const isInitiallyApplied =
//     singleJob?.applications?.some(
//       (application) => application.applicant === user?._id
//     ) || false;
//   const [isApplied, setIsApplied] = useState(isInitiallyApplied);

//   const params = useParams();
//   const jobId = params.id;
//   const dispatch = useDispatch();

//   const applyJobHandler = async () => {
//     try {
//       const res = await axios.post(
//         `${APPLICATION_API_END_POINT}/apply/${jobId}`,
//         {},
//         { withCredentials: true }
//       );
//       if (res.data.success) {
//         setIsApplied(true); // Update the local state
//         const updatedSingleJob = {
//           ...singleJob,
//           applications: [...singleJob.applications, { applicant: user?._id }],
//         };
//         dispatch(setSingleJob(updatedSingleJob)); // helps us to real-time UI update
//         toast.success(res.data.message, {
//           className: "success",
//         });
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(
//         error.response?.data?.message || "An error occurred while applying.",
//         { className: "error" }
//       );
//     }
//   };

//   useEffect(() => {
//     const fetchSingleJob = async () => {
//       try {
//         const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
//           withCredentials: true,
//         });
//         if (res.data.success) {
//           dispatch(setSingleJob(res.data.job));
//           setIsApplied(
//             res.data.job.applications.some(
//               (application) => application.applicant === user?._id
//             )
//           );
//         }
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     fetchSingleJob();
//   }, [jobId, dispatch, user?._id]);

//   return (
//     <div className="max-w-7xl mx-auto my-10">
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="font-bold text-xl">{singleJob?.title}</h1>
//           <div className="flex items-center gap-2 mt-4">
//             <Badge className="font-bold" variant="ghost">
//               {singleJob?.position} Positions
//             </Badge>
//             <Badge className="font-bold" variant="ghost">
//               {singleJob?.jobType}
//             </Badge>
//             <Badge className="font-bold" variant="ghost">
//               {singleJob?.salary}LPA
//             </Badge>
//           </div>
//         </div>
//         <Button
//           onClick={isApplied ? null : applyJobHandler}
//           disabled={isApplied}
//           className={`rounded-lg ${
//             isApplied
//               ? "bg-gray-600 cursor-not-allowed"
//               : "bg-[#7209b7] hover:bg-[#d3453b]"
//           }`}
//         >
//           {isApplied ? "Already Applied" : "Apply Now"}
//         </Button>
//       </div>

//       <h1 className="border-b-2  font-medium py-4">
//         Job Description
//       </h1>

//       <div className="my-4">
//         <h1 className="font-bold my-1">
//           Role:{" "}
//           <span className="pl-4 font-normal ">
//             {singleJob?.title}
//           </span>
//         </h1>
//         <h1 className="font-bold my-1">
//           Location:{" "}
//           <span className="pl-4 font-normal ">
//             {singleJob?.location}
//           </span>
//         </h1>
//         <h1 className="font-bold my-1">
//           Description:{" "}
//           <span className="pl-4 font-normal ">
//             {singleJob?.description}
//           </span>
//         </h1>
//         <h1 className="font-bold my-1">
//           Experience:{" "}
//           <span className="pl-4 font-normal">
//             {singleJob?.experience} yrs
//           </span>
//         </h1>
//         <h1 className="font-bold my-1">
//           Salary:{" "}
//           <span className="pl-4 font-normal ">
//             {singleJob?.salary}LPA
//           </span>
//         </h1>
//         <h1 className="font-bold my-1">
//           Total Applicants:{" "}
//           <span className="pl-4 font-normal ">
//             {singleJob?.applications?.length}
//           </span>
//         </h1>
//         <h1 className="font-bold my-1">
//           Posted Date:{" "}
//           <span className="pl-4 font-normal ">
//             {singleJob?.createdAt?.split("T")[0]}
//           </span>
//         </h1>
//       </div>
//     </div>
//   );
// };

// export default JobDescription;
import { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import axios from "axios";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
import { setSingleJob } from "./redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import "./Notify/ToastifyCSS.css";
import "./index.css";

const JobDescription = () => {
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);

  const isInitiallyApplied =
    singleJob?.applications?.some(
      (application) => application.applicant === user?._id
    ) || false;

  const [isApplied, setIsApplied] = useState(isInitiallyApplied);

  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();

  const applyJobHandler = async () => {
    try {
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        {},
        { withCredentials: true }
      );
      if (res.data.success) {
        setIsApplied(true);
        const updatedSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updatedSingleJob));
        toast.success(res.data.message, {
          className: "success",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message || "An error occurred while applying.",
        { className: "error" }
      );
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(
            res.data.job.applications.some(
              (application) => application.applicant === user?._id
            )
          );
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  return (
    <div className="max-w-7xl mx-auto my-10 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex-1">
          <h1 className="font-bold text-xl truncate">{singleJob?.title}</h1>
          <div className="flex flex-wrap gap-2 mt-4">
            <Badge className="font-bold" variant="ghost">
              {singleJob?.position} Positions
            </Badge>
            <Badge className="font-bold" variant="ghost">
              {singleJob?.jobType}
            </Badge>
            <Badge className="font-bold" variant="ghost">
              {singleJob?.salary}LPA
            </Badge>
          </div>
        </div>
        <Button
          onClick={isApplied ? null : applyJobHandler}
          disabled={isApplied}
          aria-disabled={isApplied}
          className={`rounded-lg w-full sm:w-auto ${
            isApplied
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-[#7209b7] hover:bg-[#d3453b]"
          }`}
        >
          {isApplied ? "Already Applied" : "Apply Now"}
        </Button>
      </div>

      <h2 className="border-b-2 font-medium py-4 mt-8">Job Description</h2>

      <div className="my-4 space-y-3 text-sm sm:text-base">
        <p>
          <strong>Role:</strong> <span className="pl-2">{singleJob?.title}</span>
        </p>
        <p>
          <strong>Location:</strong>{" "}
          <span className="pl-2">{singleJob?.location}</span>
        </p>
        <p>
          <strong>Description:</strong>{" "}
          <span className="pl-2">{singleJob?.description}</span>
        </p>
        <p>
          <strong>Experience:</strong>{" "}
          <span className="pl-2">{singleJob?.experience} yrs</span>
        </p>
        <p>
          <strong>Salary:</strong>{" "}
          <span className="pl-2">{singleJob?.salary}LPA</span>
        </p>
        <p>
          <strong>Total Applicants:</strong>{" "}
          <span className="pl-2">{singleJob?.applications?.length}</span>
        </p>
        <p>
          <strong>Posted Date:</strong>{" "}
          <span className="pl-2">
            {singleJob?.createdAt?.split("T")[0]}
          </span>
        </p>
      </div>
    </div>
  );
};

export default JobDescription;
