import React, { useEffect, useState } from "react";
import "./_comments.scss";
import Comment from "../comment/Comment";
import { useDispatch, useSelector } from "react-redux";
import { getCommentsOfVideoById, addComment } from "../../redux/actions/comments.action";

const Comments = ({ videoId }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCommentsOfVideoById(videoId));
  }, [videoId, dispatch]);

  const comments = useSelector((state) => state.commentList.comments);
  const [text, setText] = useState(""); // Initialize text state

  const _comments = comments?.map(
    (comment) => comment.snippet.topLevelComment.snippet
  );

  const handleComment = (e) => {
    e.preventDefault(); // Corrected typo

    if (text.length === 0) return;

    // Dispatch the addComment action
    dispatch(addComment(videoId, text));

    // Clear the input field after adding the comment
    setText("");
  };

  return (
    <div className="comments__form">
      <p>1234 Comments</p>
      <img
        src="https://www.pngkey.com/png/detail/151-1518198_avatar-anonimo-mujer-women-user-icon-png.png"
        alt="Avatar Anonimo Mujer - Women User Icon Png@pngkey.com"
        style={{
          borderRadius: "50%",
          height: "50px",
          width: "50px",
          objectFit: "contain",
        }}
        className="rounded-image"
      ></img>

      <form onSubmit={handleComment} className="d-flex flex-grow-1">
        <input
          type="text"
          className="flex-grow-1"
          placeholder="Write a comment....."
          value={text} // Bind the input value to the text state
          onChange={(e) => setText(e.target.value)} // Update text state on input change
        />
        <button className="border-0 p-2">Comment</button>
      </form>
      <div className="comments__list">
        {_comments?.map((comment, i) => (
          <Comment comment={comment} key={i} />
        ))}
      </div>
    </div>
  );
};

export default Comments;
