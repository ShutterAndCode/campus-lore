import { useEffect, useState } from "react";

import { getRelatedStories } from "../services/story.service";


export function useRelatedStories(storyId) {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    async function loadRelatedStories() {
      try {
        const data =
          await getRelatedStories(storyId);

        setStories(data);
      } finally {
        setLoading(false);
      }
    }


    if (storyId) {
      loadRelatedStories();
    }

  }, [storyId]);


  return {
    stories,
    loading,
  };
}