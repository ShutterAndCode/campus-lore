import { useEffect, useState } from "react";

import { searchStories } from "../services/search.service";

export function useSearch(filters) {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadStories() {
      setLoading(true);

      try {
        const data = await searchStories(filters);
        setStories(data);
      } finally {
        setLoading(false);
      }
    }

    loadStories();
  }, [filters.query, filters.branch, filters.year, filters.sort]);

  return {
    stories,
    loading,
  };
}
