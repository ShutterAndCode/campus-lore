import { useState } from "react";

import { createStory } from "../services/story.service";


export function useCreateStory() {
  const [isPending, setIsPending] = useState(false);


  async function mutate(data, callbacks = {}) {
    try {
      setIsPending(true);

      const response = await createStory(data);

      callbacks.onSuccess?.(response);

    } catch (error) {

      callbacks.onError?.(error);

    } finally {

      setIsPending(false);

    }
  }


  return {
    mutate,
    isPending,
  };
}