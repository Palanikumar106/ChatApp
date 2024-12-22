import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { PiUserCircle } from "react-icons/pi";
const CheckEmail = () => {
  const [data, setData] = useState({
    email: "",
  });

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const url = `${process.env.REACT_APP_BACKEND_URL}/api/email`;

    try {
      const res = await axios.post(url, data);
      toast.success(res.data.message);
      if (res.data.success) {
        setData({
          email: "",
        });
        navigate("/password", {
          state: res?.data.data,
        });
      }
    } catch (err) {
      toast.error(err?.response?.data?.message);
    }
  };
  return (
    <div>
      <div className="mt-5">
        <div className="bg-white w-full max-w-md rounded overflow-hidden p-4 mx-auto">
          <div className="w-fit mx-auto mb-2">
            <PiUserCircle size={80} />
          </div>
          <h3>Welcome to Chat App</h3>

          <form className="grid gap-4 mt-2" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1">
              <label htmlFor="email ">Email :</label>
              <input
                type="text"
                id="email"
                name="email"
                placeholder="Enter Your Email"
                className="bg-slate-100 pxc-2 py-1  focus:outline-primary"
                onChange={handleOnChange}
                value={data.email}
                required
              />
            </div>

            <button className="bg-primary textlg px-4 py-1 hover:bg-secondary rounded mt-2 font-bold text-white leading-relaxed tracking-wide">
              Let's Go
            </button>
          </form>
          <p className="my-3 text-center ">
            New User?{" "}
            <Link to={"/register"} className="hover:text-primary font-semibold">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CheckEmail;
