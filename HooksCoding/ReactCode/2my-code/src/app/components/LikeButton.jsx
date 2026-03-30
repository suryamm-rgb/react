"use client";

import { useState } from "react";

export const LikeButton = () => {
  const [count, setCount] = useState(0);
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    if (liked) {
      setCount(count - 1);
    } else {
      setCount(count + 1);
    }
    setLiked(!liked);
  };

  return (
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
  );
};
