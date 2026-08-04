export const QUERY_KEYS = {
  USER: {
    ME: ["user", "me"],
  },

  POSTS: {
    ALL: ["posts"],
    DETAIL: (postId) => ["posts", postId],
  },

  CAMPUS_PULSE: {
    ANNOUNCEMENTS: ["campus-pulse", "announcements"],
    EVENTS: ["campus-pulse", "events"],
    TRENDING: ["campus-pulse", "trending"],
  },
};