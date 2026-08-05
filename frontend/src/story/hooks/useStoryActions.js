import { useState } from "react";

import {
  toggleBookmark,
  shareStory,
  reportStory,
} from "../services/storyAction.service";


export function useStoryActions({
  storyId,
  initialBookmarked,
}) {

  const [bookmarked, setBookmarked] = useState(
    initialBookmarked
  );


  async function handleBookmark() {
    const updated =
      await toggleBookmark(storyId);

    setBookmarked(updated);
  }


  async function handleShare() {
    await shareStory(storyId);
  }


  async function handleReport() {
    await reportStory(storyId);
  }


  return {
    bookmarked,
    handleBookmark,
    handleShare,
    handleReport,
  };
}