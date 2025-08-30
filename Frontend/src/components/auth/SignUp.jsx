import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { USER_API_END_POINT } from "@/utils/constant";
import "../Notify/ToastifyCSS.css";

export default function SignUp() {
  const [inputHandle, setInputHandle] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: null,
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputHandle({ ...inputHandle, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!inputHandle.email.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)) {
      toast.error("Please enter a valid email address.", { className: "error" });
      setLoading(false);
      return;
    }

    if (inputHandle.password.length < 6) {
      toast.error("Password must be at least 6 characters long.", { className: "error" });
      setLoading(false);
      return;
    }

    if (!inputHandle.role) {
      toast.error("Please select a role.", { className: "error" });
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("email", inputHandle.email);
    formData.append("password", inputHandle.password);
    formData.append("role", inputHandle.role);

    if (inputHandle.fullname) formData.append("fullname", inputHandle.fullname);
    if (inputHandle.phoneNumber) formData.append("phoneNumber", inputHandle.phoneNumber);
    if (inputHandle.file) formData.append("profilePic", inputHandle.file);

    try {
      const response = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response?.data?.success) {
        toast.success(`${response.data.message}`, { className: "success" });
        navigate("/login");
      } else {
        toast.error("Registration failed. Please try again.", { className: "error" });
      }
    } catch (error) {
      console.error("Registration Error:", error);
      toast.error("An error occurred. Please try again.", { className: "error" });
    } finally {
      setLoading(false);
    }
  };

  const { user } = useSelector((store) => store.auth);
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <form
        onSubmit={submitHandler}
        className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 sm:p-8"
      >
        <h1 className="font-bold text-2xl mb-6 text-center border-b pb-3">Sign Up</h1>

        {/* Full Name */}
        <div className="mb-4">
          <Label>Full Name</Label>
          <Input
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 mt-1 outline-none bg-transparent"
            type="text"
            value={inputHandle.fullname}
            name="fullname"
            placeholder="Enter Your Name"
            required
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <Label>Email</Label>
          <Input
            onChange={handleChange}
            type="email"
            className="w-full border border-gray-300 rounded-md p-2 mt-1 outline-none bg-transparent"
            value={inputHandle.email}
            name="email"
            placeholder="example@gmail.com"
            required
          />
        </div>

        {/* Phone Number */}
        <div className="mb-4">
          <Label>Phone Number</Label>
          <Input
            onChange={handleChange}
            type="tel"
            className="w-full border border-gray-300 rounded-md p-2 mt-1 outline-none bg-transparent"
            value={inputHandle.phoneNumber}
            name="phoneNumber"
            placeholder="9420111111"
            required
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <Label>Password</Label>
          <Input
            type="password"
            value={inputHandle.password}
            name="password"
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 mt-1 outline-none bg-transparent"
            placeholder="Enter Your Password"
            required
          />
        </div>

        {/* Role Selection */}
        <div className="mb-6">
          <Label>Role</Label>
          <div className="flex flex-col sm:flex-row sm:gap-8 mt-2">
            <label className="inline-flex items-center cursor-pointer mb-2 sm:mb-0">
              <input
                type="radio"
                id="student-option"
                name="role"
                value="student"
                checked={inputHandle.role === "student"}
                onChange={handleChange}
                className="form-radio h-5 w-5 text-red-600"
              />
              <span className="ml-2 text-lg text-blue-600">Student</span>
            </label>

            <label className="inline-flex items-center cursor-pointer">
              <input
                type="radio"
                id="recruiter-option"
                name="role"
                value="recruiter"
                checked={inputHandle.role === "recruiter"}
                onChange={handleChange}
                className="form-radio h-5 w-5 text-red-600"
              />
              <span className="ml-2 text-lg text-blue-600">Recruiter</span>
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full py-3 bg-red-600 hover:bg-red-500 focus:ring-4 focus:ring-red-400 text-white rounded-md transition-colors disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </Button>

        {/* Login Link */}
        <p className="text-center mt-5 text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-[#6A38C2] font-semibold hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
