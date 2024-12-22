import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Avatar from "../components/Avatar";
import { IoIosEye, IoIosEyeOff } from "react-icons/io"; // Import eye icons
import { useDispatch } from "react-redux";
import { setToken } from "../redux/userSlice";

const CheckPassword = () => {
  const [data, setData] = useState({
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };

  useEffect(() => {
    if (!location?.state?.name) {
      navigate("/email");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/password`;

    try {
      const res = await axios({
        method: "post",
        url: URL,
        data: {
          userId: location?.state?._id,
          password: data.password,
        },
        withCredentials: true,
      });
      toast.success(res.data.message);

      if (res.data.success) {
        dispatch(setToken(res?.data?.token));
        localStorage.setItem("token", res?.data?.token);
        setData({
          password: "",
        });
        navigate("/");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message);
    }
  };

  return (
    <div>
      <div className="mt-5">
        <div className="bg-white w-full max-w-md rounded overflow-hidden p-4 mx-auto">
          <div className="w-fit mx-auto mb-2 flex justify-center items-center flex-col">
            <Avatar
              name={location?.state?.name}
              imageUrl={location?.state?.profile_pic}
              width={70}
              height={70}
            />
            <h2 className="font-semibold text-lg mt-1">
              {location?.state?.name}
            </h2>
          </div>
          <form className="grid gap-4 mt-2" onSubmit={handleSubmit}>
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

            <button className="bg-primary text-lg px-4 py-1 hover:bg-secondary rounded mt-2 font-bold text-white leading-relaxed tracking-wide">
              Login
            </button>
          </form>
          <p className="my-3 text-center">
            <Link
              to={"/forgot-password"}
              className="hover:text-primary font-semibold"
            >
              Forgot password?
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CheckPassword;
