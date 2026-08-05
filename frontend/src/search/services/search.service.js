import { STORY_FEED } from "@/story/constants/storyFeed";

export async function searchStories({
  query = "",
  branch = "All",
  year = "All",
  sort = "newest",
}) {
  let stories = [...STORY_FEED];

  // Search
  const search = query.trim().toLowerCase();

  if (search) {
    stories = stories.filter((story) => {
      const titleMatch = story.title
        .toLowerCase()
        .includes(search);

      const excerptMatch = story.excerpt
        .toLowerCase()
        .includes(search);

      const contentMatch = story.content
        ?.toLowerCase()
        .includes(search);

      const tagMatch = story.tags.some((tag) =>
        tag.toLowerCase().includes(search)
      );

      const branchMatch = story.branch
        .toLowerCase()
        .includes(search);

      return (
        titleMatch ||
        excerptMatch ||
        contentMatch ||
        tagMatch ||
        branchMatch
      );
    });
  }

  // Branch Filter
  if (branch !== "All") {
    stories = stories.filter(
      (story) => story.branch === branch
    );
  }

  // Year Filter
  if (year !== "All") {
    stories = stories.filter(
      (story) => story.year === year
    );
  }

  // Sorting
  switch (sort) {
    case "helpful":
      stories.sort(
        (a, b) => b.helpful - a.helpful
      );
      break;

    case "views":
      stories.sort(
        (a, b) => b.views - a.views
      );
      break;

    case "newest":
    default:
      // STORY_FEED is already newest-first.
      break;
  }

  return Promise.resolve(stories);
}