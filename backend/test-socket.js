import { io } from "socket.io-client";

const socket = io("http://localhost:5000", {
  auth: {
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhNmM2MTNlMjE1Y2ZmNmE4OWE3OGE4MCIsInJvbGUiOiJzdHVkZW50IiwiaWF0IjoxNzg1NTIwMjQ1LCJleHAiOjE3ODYxMjUwNDV9.AgvARYf8mLXnLeheM8ZJx9OBcXinL89DfluyWyKm3I4",
  },
});

socket.on("connect", () => {
  console.log("✅ Connected:", socket.id);

  socket.emit("conversation:join", "6a6d93b0b2f7f94800c6a825");
});
socket.on("conversation:joined", (data) => {
  console.log("Joined conversation:", data);
});


socket.on("connect_error", (err) => {
  console.log("❌", err.message);
});


socket.on("message:new", (data) => {
  console.log("New message:", data);
});

socket.on("message:read", (data) => {
  console.log("Read:", data);
});

socket.on("socket:error", (err) => {
  console.log("Socket error:", err);
});
