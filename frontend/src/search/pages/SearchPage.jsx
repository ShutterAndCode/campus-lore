import Container from "@/components/layout/Container";
import Page from "@/components/layout/Page";

import { EmptyState, SectionLoader } from "@/components/feedback";
import StoryCard from "@/home/components/StoryCard";
import { Input } from "@/components/ui/input";

import SearchFilters from "../components/SearchFilters";
import { useSearch } from "../hooks/useSearch";
import { useSearchQuery } from "../hooks/useSearchQuery";

import { useDebounce } from "@/lib/hooks/useDebounce";

export default function SearchPage() {
  const {
    query,
    branch,
    year,
    sort,
    setQuery,
  } = useSearchQuery();

  const debouncedQuery = useDebounce(query, 300);

  const { stories, loading } = useSearch({
    query: debouncedQuery,
    branch,
    year,
    sort,
  });

  const hasActiveSearch =
    query.trim() ||
    branch !== "All" ||
    year !== "All";

  return (
    <Page>
      <Container className="space-y-6">
        <h1 className="text-3xl font-bold">
          Search
        </h1>

        <Input
          placeholder="Search stories..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <SearchFilters />

        {hasActiveSearch && loading && (
          <SectionLoader label="Searching..." />
        )}

        {hasActiveSearch &&
          !loading &&
          stories.length > 0 && (
            <p className="text-sm text-muted-foreground">
              {stories.length} result
              {stories.length !== 1 ? "s" : ""} found
            </p>
          )}

        {hasActiveSearch &&
          !loading &&
          stories.length === 0 && (
            <EmptyState
              title="No stories found"
              description="Try a different keyword or filter."
            />
          )}

        {hasActiveSearch &&
          stories.length > 0 && (
            <div className="space-y-8">
              {stories.map((story) => (
                <StoryCard
                  key={story.id}
                  story={story}
                />
              ))}
            </div>
          )}
      </Container>
    </Page>
  );
}