import { useState } from "react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import useGetAllAppliedJob from "@/Hooks/useGetAllAppliedJob";
import "./index.css";

const Profile = () => {
  useGetAllAppliedJob();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  const hasResume = Boolean(user?.profile?.resume);

  return (
    <div className="px-4 md:px-0 max-w-4xl mx-auto">
      {/* Profile Card */}
      <section className="border border-gray-200 rounded-2xl my-5 p-6 md:p-8 shadow-sm bg-white">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-6">
          {/* Avatar & Name */}
          <div className="flex items-center gap-4 w-full md:w-auto">
            <Avatar className="h-24 w-24 flex-shrink-0">
              <AvatarImage
                src={
                  user?.profile?.avatar ||
                  "https://static.vecteezy.com/system/resources/previews/015/280/523/non_2x/job-logo-icon-with-tie-image-free-vector.jpg"
                }
                alt="profile"
              />
            </Avatar>
            <div>
              <h1 className="font-medium text-xl">{user?.fullname || "No Name"}</h1>
              <p className="text-gray-600">{user?.profile?.bio || "No bio available."}</p>
            </div>
          </div>

          {/* Edit Button */}
          <Button
            onClick={() => setOpen(true)}
            className="bg-yellow-500 rounded-full text-white hover:bg-yellow-600 transition-colors flex items-center justify-center"
            variant="outline"
            aria-label="Edit Profile"
          >
            <Pen />
          </Button>
        </div>

        {/* Contact Info */}
        <div className="my-5 space-y-3">
          <div className="flex items-center gap-3 text-gray-700">
            <Mail />
            <span>{user?.email || "Email not provided"}</span>
          </div>
          <div className="flex items-center gap-3 text-gray-700">
            <Contact />
            <span>{user?.phoneNumber || "Phone number not provided"}</span>
          </div>
        </div>

        {/* Skills */}
        <div className="my-5 flex flex-wrap items-center gap-3">
          <h2 className="font-semibold mr-3">Skills:</h2>
          {user?.profile?.skills?.length > 0 ? (
            user.profile.skills.map((skill, idx) => (
              <Badge
                key={idx}
                className="bg-black text-yellow-600 font-semibold outline-red-500"
              >
                {skill}
              </Badge>
            ))
          ) : (
            <span className="text-gray-500">NA</span>
          )}
        </div>

        {/* Resume */}
        <div className="flex items-center gap-2 max-w-sm">
          <Label className="text-md font-bold">Resume:</Label>
          {hasResume ? (
            <a
              href={user.profile.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline break-words"
              title={user.profile.originalResumeName || "Resume"}
            >
              {user.profile.originalResumeName || "View Resume"}
            </a>
          ) : (
            <span className="text-gray-500">NA</span>
          )}
        </div>
      </section>

      {/* Applied Jobs Section */}
      <section className="max-w-4xl mx-auto rounded-2xl bg-white p-4 md:p-6 shadow-sm">
        <h1 className="font-bold text-lg mb-5">Applied Jobs</h1>
        <AppliedJobTable />
      </section>

      {/* Update Profile Dialog */}
      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
