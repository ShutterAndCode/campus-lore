import { useEffect, useState } from "react";

import { getStoriesByAuthor } from "../services/story.service";


export function useAuthorStories(authorId) {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    async function loadStories() {
      try {
        const data =
          await getStoriesByAuthor(authorId);

        setStories(data);

      } finally {
        setLoading(false);
      }
    }


    if (authorId) {
      loadStories();
    }

  }, [authorId]);


  return {
    stories,
    loading,
  };
}