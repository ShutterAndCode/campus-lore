import {
  fetchStories,
  fetchStoryById,
  addStory,
  editStory,
} from "../api/mockStory.api";


export async function getStories() {
  return fetchStories();
}


export async function getStoryById(id) {
  return fetchStoryById(id);
}


export async function createStory(data) {
  return addStory(data);
}


export async function updateStory(id, data) {
  return editStory(id, data);
}


export async function getRelatedStories(storyId) {

  const stories = await getStories();

  return stories.filter(
    (story) =>
      String(story.id) !== String(storyId)
  );

}


export async function getStoriesByAuthor(authorId) {

  const stories = await getStories();

  return stories.filter(
    (story) =>
      story.author.id === authorId
  );

}