import { useSearchParams } from "react-router-dom";

export function useSearchQuery() {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get("q") ?? "";
  const branch = searchParams.get("branch") ?? "All";
  const year = searchParams.get("year") ?? "All";
  const sort = searchParams.get("sort") ?? "newest";

  function updateParams(updates) {
    const next = new URLSearchParams(searchParams);

    Object.entries(updates).forEach(([key, value]) => {
      if (
        value === "" ||
        value === "All" ||
        value === null ||
        value === undefined
      ) {
        next.delete(key);
      } else {
        next.set(key, value);
      }
    });

    setSearchParams(next, {
      replace: true,
    });
  }

  function setQuery(value) {
    updateParams({
      q: value.trim(),
    });
  }

  function setBranch(value) {
    updateParams({
      branch: value,
    });
  }

  function setYear(value) {
    updateParams({
      year: value,
    });
  }

  function setSort(value) {
    updateParams({
      sort: value,
    });
  }

  return {
    query,
    branch,
    year,
    sort,

    setQuery,
    setBranch,
    setYear,
    setSort,
  };
}