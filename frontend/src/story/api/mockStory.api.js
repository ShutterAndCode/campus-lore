import { STORY_FEED } from "@/story/constants/storyFeed";


let stories = [...STORY_FEED];


export async function fetchStories() {
  return Promise.resolve(stories);
}


export async function fetchStoryById(id) {

  return Promise.resolve(
    stories.find(
      (story) =>
        String(story.id) === String(id)
    ) ?? null
  );

}


export async function addStory(data) {

  const newStory = {

    id: `story-${Date.now()}`,

    ...data,


    author: {
      id: "current-user",
      name: data.anonymous
        ? "Anonymous"
        : "Current User",
      avatar: "",
    },


    helpful: 0,
    comments: 0,
    views: 0,

    bookmarked: false,

    createdAt: "just now",

  };


  stories.unshift(newStory);


  return Promise.resolve(newStory);

}



export async function editStory(id, data) {

  const index = stories.findIndex(
    (story) =>
      String(story.id) === String(id)
  );


  if (index === -1) {
    throw new Error("Story not found");
  }


  stories[index] = {
    ...stories[index],
    ...data,
    updatedAt: "just now",
  };


  return Promise.resolve(
    stories[index]
  );

}