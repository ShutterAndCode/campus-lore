let bookmarkedStories = new Set();


export async function toggleBookmark(storyId) {
  if (bookmarkedStories.has(storyId)) {
    bookmarkedStories.delete(storyId);

    return false;
  }

  bookmarkedStories.add(storyId);

  return true;
}


export async function shareStory(storyId) {
  console.log("Sharing story:", storyId);

  return true;
}


export async function reportStory(storyId) {
  console.log("Reporting story:", storyId);

  return true;
}