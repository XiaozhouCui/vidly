import React from "react";

// Input liked: boolean
// Output: onClick
const Like = (props) => {
  let classes = "fa fa-heart";
  if (!props.liked) classes += "-o";
  return (
    <i
      className={classes}
      style={{ cursor: "pointer" }}
      aria-hidden="true"
      onClick={props.onLikeToggle}
    ></i>
  );
};

export default Like;
