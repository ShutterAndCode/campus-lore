import { useState } from "react";

import { updateStory } from "../services/story.service";


export function useUpdateStory() {

  const [isPending, setIsPending] = useState(false);


  async function mutate(id, data, callbacks = {}) {

    try {

      setIsPending(true);


      const response =
        await updateStory(id, data);


      callbacks.onSuccess?.(response);


    } catch(error) {


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