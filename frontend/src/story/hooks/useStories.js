import { useEffect, useState } from "react";

import { getStories } from "../services/story.service";

export default function useStories() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStories() {
      try {
        const data = await getStories();
        setStories(data);
      } finally {
        setLoading(false);
      }
    }

    loadStories();
  }, []);

  return {
    stories,
    loading,
  };
}