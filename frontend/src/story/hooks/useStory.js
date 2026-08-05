import { useEffect, useState } from "react";
import { getStoryById } from "../services/story.service";

export function useStory(storyId) {
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchStory() {
      try {
        setLoading(true);
        setError(null);

        const data = await getStoryById(storyId);

        if (!cancelled) {
          setStory(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    if (storyId) {
      fetchStory();
    }

    return () => {
      cancelled = true;
    };
  }, [storyId]);

  return {
    story,
    loading,
    error,
  };
}