"use client";

import { useState } from "react";

export const LikeButton = () => {
  const [count, setCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const [change, setChange] = useState(false);

  const handleLike = () => {
    if (liked) {
      setCount(count - 1);
    } else {
      setCount(count + 1);
    }
    setLiked(!liked);
  };
  const handleTimeClick = () => {
    const currentTime = new Date().toLocaleDateString();
    alert(`Current time: ${currentTime}`);
    setChange(true);
  };
  return (
    <div>
      <div>
        <h1>❤️ Like Button</h1>

        <button
          onClick={handleLike}
          style={{
            fontSize: "20px",
            color: liked ? "red" : "black",
            cursor: "pointer",
          }}
        >
          ❤️ {count}
        </button>
      </div>
      <div>
        <h2>
          Display current time on button click and Change button text after
          click.
        </h2>
        <button
          onClick={handleTimeClick}
          className="p-4 bg-pink-400 hover:bg-pink-700 m-6"
        >
          {change ? "Clicked ✅" : "Show Time"}
        </button>
      </div>
    </div>
  );
};
