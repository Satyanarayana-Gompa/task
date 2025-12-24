import React, { useEffect, useState } from "react";

function Comments() {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [showBox, setShowBox] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3001/comments")
      .then(res => res.json())
      .then(setComments);
  }, []);

  const handleSubmit = async () => {
    if (!newComment.trim()) return;

    const comment = {
      text: newComment,
      likes: 0,
      dislikes: 0,
      time: "Just now"
    };

    const res = await fetch("http://localhost:3001/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(comment)
    });

    const saved = await res.json();
    setComments(prev => [...prev, saved]);
    setNewComment("");
    setShowBox(false);
  };

  const updateReaction = async (id, type) => {
    const comment = comments.find(c => c.id === id);
    if (!comment) return;

    const updated = { ...comment, [type]: comment[type] + 1 };

    await fetch(`http://localhost:3001/comments/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ [type]: updated[type] })
    });

    setComments(prev =>
      prev.map(c => (c.id === id ? updated : c))
    );
  };

  return (
    <div className="container mt-4">
      <h6 className="fw-bold mb-3">
        {comments.length.toLocaleString()} Comments
      </h6>

      
      <div className="d-flex gap-3 mb-4">
        <div
          className="rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center"
          style={{ width: 40, height: 40 }}
        >
          U
        </div>

        <div className="flex-grow-1">
          <input
            placeholder="Add a comment..."
            className="form-control border-0 border-bottom rounded-0"
            onFocus={() => setShowBox(true)}
            value={newComment}
            onChange={e => setNewComment(e.target.value)}
          />

          {showBox && (
            <div className="d-flex justify-content-end gap-2 mt-2">
              <button
                className="btn btn-light"
                onClick={() => {
                  setNewComment("");
                  setShowBox(false);
                }}
              >
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleSubmit}>
                Submit
              </button>
            </div>
          )}
        </div>
      </div>

      
      {comments.map(comment => (
        <div key={comment.id} className="d-flex gap-3 mb-4">
          <div
            className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center"
            style={{ width: 40, height: 40 }}
          >
            {comment.text.charAt(0).toUpperCase()}
          </div>

          <div className="flex-grow-1">
            <p className="mb-1">{comment.text}</p>
            <small className="text-muted">{comment.time}</small>

            <div className="d-flex gap-3 mt-2">
              <button
                className="btn btn-sm"
                onClick={() => updateReaction(comment.id, "likes")}
              >
                <i className="fa-regular fa-thumbs-up me-1"></i>
                {comment.likes}
              </button>

              <button
                className="btn btn-sm"
                onClick={() => updateReaction(comment.id, "dislikes")}
              >
                 <i className="fa-regular fa-thumbs-down me-1"></i>
                 {comment.dislikes}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Comments;
