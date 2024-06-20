import React, { useEffect, useState } from "react";
import { PiUserCircle } from "react-icons/pi";
import { useSelector } from "react-redux";

const Avatar = ({ userId, name, imageUrl, width, height }) => {
  const [color, setColor] = useState("");
  const onlineUser = useSelector((state) => state?.chat?.onlineUser);
  useEffect(() => {
    if (!imageUrl) {
      const bgColor = [
        "bg-slate-200",
        "bg-teal-200",
        "bg-red-200",
        "bg-green-200",
        "bg-yellow-200",
        "bg-gray-200",
        "bg-cyan-200",
        "bg-sky-200",
        "bg-blue-200",
      ];

      const randomNumber = Math.floor(Math.random() * 9);

      setColor(bgColor[randomNumber]);
    }
  }, [imageUrl, setColor]);

  let avatarName = "";

  if (name) {
    const splitName = name?.split(" ");

    if (splitName.length > 1) {
      avatarName = splitName[0][0] + splitName[1][0];
    } else {
      avatarName = splitName[0][0];
    }
  }

  const isOnline = onlineUser.includes(userId);

  return (
    <div
      className={`relative`}
      style={{ width: width + "px", height: height + "px" }}
    >
      <div
        className={`text-slate-800 rounded-full font-bold overflow-hidden`}
        style={{ width: width + "px", height: height + "px" }}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            width={width}
            height={height}
            alt={name}
            className="object-cover rounded-full"
          />
        ) : name ? (
          <div
            style={{ width: width + "px", height: height + "px" }}
            className={`overflow-hidden rounded-full flex justify-center items-center text-lg ${color}`}
          >
            {avatarName}
          </div>
        ) : (
          <PiUserCircle size={width} />
        )}
      </div>
      {isOnline && (
        <div className="bg-green-600 w-3 h-3 absolute bottom-0 right-0 z-10 rounded-full border-2 border-white"></div>
      )}
    </div>
  );
};

export default Avatar;
