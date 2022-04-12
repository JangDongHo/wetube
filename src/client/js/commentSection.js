import fetch from "node-fetch";

const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
const deleteCommentBtns = document.querySelectorAll("#deleteComment");

const addDeleteCommentBtnEvent = () => {
  deleteCommentBtns.forEach((btn) => {
    btn.addEventListener("click", handleDeleteCommentBtn);
  });
};

const addComment = (text, id) => {
  const videoComments = document.querySelector(".video__comments ul");
  const newComment = document.createElement("li");
  newComment.dataset.commentid = id;
  newComment.className = "video__comment";
  const icon = document.createElement("i");
  icon.className = "fas fa-comment";
  const span = document.createElement("span");
  span.innerText = ` ${text}`;
  const span2 = document.createElement("span");
  span2.innerText = "❌";
  newComment.appendChild(icon);
  newComment.appendChild(span);
  newComment.appendChild(span2);
  span2.addEventListener("click", handleDeleteCommentBtn);
  videoComments.prepend(newComment);
};

const removeComment = (comment) => {
  comment.remove();
};

const handleSubmit = async (event) => {
  event.preventDefault();
  const textarea = form.querySelector("textarea");
  const text = textarea.value;
  const videoId = videoContainer.dataset.videoid;
  if (text === "") {
    return;
  }
  const response = await fetch(`/api/videos/${videoId}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });
  if (response.status === 201) {
    textarea.value = "";
    const { newCommentId } = await response.json();
    addComment(text, newCommentId);
  }
};

const handleDeleteCommentBtn = async (event) => {
  const {
    target: { parentElement },
  } = event;
  const {
    dataset: { commentid },
  } = parentElement;
  removeComment(parentElement);
  const response = await fetch(`/api/comments/${commentid}`, {
    method: "DELETE",
  });
};

if (form) {
  form.addEventListener("submit", handleSubmit);
}

addDeleteCommentBtnEvent();
