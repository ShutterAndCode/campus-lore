import { useEffect, useState } from "react";

import { getCommentsByStoryId } from "../services/comment.service";


export function useComments(storyId) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    async function loadComments() {
      try {
        const data = await getCommentsByStoryId(storyId);

        setComments(data);
      } finally {
        setLoading(false);
      }
    }

    if (storyId) {
      loadComments();
    }

  }, [storyId]);


  return {
    comments,
    loading,
  };
}