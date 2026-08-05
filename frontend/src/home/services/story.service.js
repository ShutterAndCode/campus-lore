import { STORY_FEED } from "../constants/storyFeed";

export async function getStories() {
  return Promise.resolve(STORY_FEED);
}