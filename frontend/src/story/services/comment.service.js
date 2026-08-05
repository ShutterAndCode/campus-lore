const COMMENTS = [
  {
    id: "comment-1",
    storyId: "story-1",

    author: {
      id: "user-3",
      name: "Amit Kumar",
      avatar: "",
    },

    text:
      "This is really helpful. I wish I knew these things in my first year.",

    createdAt: "1h ago",
  },

  {
    id: "comment-2",
    storyId: "story-1",

    author: {
      id: "user-4",
      name: "Sneha Patel",
      avatar: "",
    },

    text:
      "The hostel adjustment part is very relatable.",

    createdAt: "30m ago",
  },
];


export async function getCommentsByStoryId(storyId) {
  return COMMENTS.filter(
    (comment) => comment.storyId === storyId
  );
}