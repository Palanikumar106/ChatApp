import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { IoIosEye, IoIosEyeOff } from "react-icons/io"; // Import the eye icons
import { Link, useNavigate } from "react-router-dom";
import uploadFile from "../helper/uploadFile";
import axios from "axios";
import toast from "react-hot-toast";

const RegisterPage = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    profile_pic: "",
  });

  useEffect(() => {
    setData({
      name: "",
      email: "",
      password: "",
      profile_pic: "",
    });
  }, []);

  const [uploadphoto, setUploadphoto] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };

  const handleUploadPhoto = async (e) => {
    const file = e.target.files[0];
    const uploadPhoto = await uploadFile(file);
    console.log(uploadPhoto?.url);
    setUploadphoto(file);
    setData((prev) => {
      return {
        ...prev,
        profile_pic: uploadPhoto?.url,
      };
    });
  };

  const clearUploadPhoto = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setUploadphoto(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const url = `${process.env.REACT_APP_BACKEND_URL}/api/register`;

    try {
      const res = await axios.post(url, data);
      console.log(res);
      toast.success(res.data.message);
      if (res.data.success) {
        setData({
          name: "",
          email: "",
          password: "",
          profile_pic: "",
        });
        navigate("/email");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message);
      console.log(err);
    }
    console.log(data);
  };

  return (
    <div className="mt-5">
      <div className="bg-white w-full max-w-md rounded overflow-hidden p-4 mx-auto">
        <h3>Welcome to Chat App</h3>

        <form className="grid gap-4 mt-2" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1">
            <label htmlFor="name">Name :</label>

            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter Your Name"
              className="bg-slate-100 pxc-2 py-1 focus:outline-primary"
              onChange={handleOnChange}
              value={data.name}
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="email">Email :</label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Enter Your Email"
              className="bg-slate-100 pxc-2 py-1 focus:outline-primary"
              onChange={handleOnChange}
              value={data.email}
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="password">Password :</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"} // Toggle input type based on state
                id="password"
                name="password"
                placeholder="Enter Your Password"
                className="bg-slate-100 pxc-2 py-1 focus:outline-primary w-full"
                onChange={handleOnChange}
                value={data.password}
                required
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
                onClick={() => setShowPassword((prev) => !prev)} // Toggle the password visibility
              >
                {showPassword ? (
                  <IoIosEyeOff size={24} />
                ) : (
                  <IoIosEye size={24} />
                )}
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="profile_pic">
              Photo :
              <div className="h-14 br-slate-200 flex justify-center items-center border rounded hover:border-primary cursor-pointer">
                <p className="text-sm max-w-[300px] text-ellipsis line-clamp-1">
                  {uploadphoto?.name ? uploadphoto?.name : "Upload your photo"}
                </p>
                {uploadphoto?.name && (
                  <button
                    className="text-lg ml-2 hover:text-red-600"
                    onClick={clearUploadPhoto}
                  >
                    <IoClose />
                  </button>
                )}
              </div>
            </label>
            <input
              type="file"
              id="profile_pic"
              name="profile_pic"
              className="bg-slate-100 pxc-2 py-1 focus:outline-primary hidden"
              onChange={handleUploadPhoto}
            />
          </div>
          <button className="bg-primary text-lg px-4 py-1 hover:bg-secondary rounded mt-2 font-bold text-white leading-relaxed tracking-wide">
            Register
          </button>
        </form>
        <p className="my-3 text-center">
          Already have an account ?{" "}
          <Link to={"/email"} className="hover:text-primary font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
