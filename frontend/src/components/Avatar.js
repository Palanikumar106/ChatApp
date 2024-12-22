import React from "react";
import { PiUserCircle } from "react-icons/pi";

const Avatar = ({ userId, name, imageUrl, width, height }) => {
  let avatarName = "";
  if (name) {
    const splitName = name?.split(" ");
    if (splitName.length > 1) {
      avatarName = splitName[0][0] + splitName[1][0];
    } else avatarName = splitName[0][0];
  }
  const bgColor = [
    "bg-slate-200",
    "bg-teal-200",
    "bg-red-200",
    "bg-green-200",
    "bg-yellow-200",
    "bg-blue-200",
    "bg-purple-200",
    "bg-pink-200",
    "bg-indigo-200",
    "bg-cyan-200",
    "bg-emerald-200",
    "bg-orange-200",
    "bg-lime-200",
    "bg-rose-200",
    "bg-violet-200",
    "bg-amber-200",
    "bg-fuchsia-200",
    "bg-gray-200",
    "bg-zinc-200",
    "bg-neutral-200",
  ];
  const random = (name.length * bgColor.length) % bgColor.length;
  return (
    <div
      className={`text-slate-800 overflow-hidden rounded-full font-bold `}
      style={{ width: width + "px", height: height + "px" }}
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          width={width}
          height={height}
          alt={name}
          className="overflow-hidden rounded-full"
        />
      ) : name ? (
        <div
          style={{ width: width + "px", height: height + "px" }}
          className={`overflow-hidden rounded-full flex justify-center text-lg items-center ${bgColor[random]}`}
        >
          {avatarName}
        </div>
      ) : (
        <PiUserCircle size={width} />
      )}
    </div>
  );
};

export default Avatar;
