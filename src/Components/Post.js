import { Avatar } from "@material-ui/core";
import MyAvatar from "../Assets/avatar.png";
import React, { useState, useEffect } from "react";
import "./Post.css";
import { db } from "../Firebase/firebase";
import firebase from "firebase";

function Post({ user, username, caption, imageUrl, postId }) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState(null);
  const postComment = (e) => {
    e.preventDefault();
    db.collection("posts").doc(postId).collection("comments").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      username: user.displayName,
      text: comment,
    });
    setComment("");
  };
  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }
    return () => {
      unsubscribe();
    };
  }, [postId]);

  return (
    <div>
      <div className="post-container">
        <div className="post">
          <div className="post-header">
            <Avatar
              className="post-avatar"
              alt="username"
              src={MyAvatar}
            ></Avatar>
            <h3>{username}</h3>
          </div>
          <img className="post-image" src={imageUrl} alt="" />
          <div className="post-caption">
            <b>{username}</b> {caption}
          </div>
          <div className="comment-container">
            <ul className="comments">
              {comments.map((comment) => {
                return (
                  <li>
                    <b>{comment.username}</b> {comment.text}
                  </li>
                );
              })}
            </ul>
          </div>
          <form onSubmit={postComment} className="post-comment">
            <input
              onChange={(e) => setComment(e.target.value)}
              placeholder="Post A Commment"
              type="text"
              value={comment}
            />
            <button disabled={!comment} type="submit">
              Post
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Post;
