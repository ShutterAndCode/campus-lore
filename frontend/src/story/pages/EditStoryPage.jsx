import { useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { storySchema } from "../schemas/storySchema";
import { useStory } from "../hooks/useStory";
import { useUpdateStory } from "../hooks/useUpdateStory";

import StoryForm from "../components/StoryForm";

export default function EditStoryPage() {
  const { storyId } = useParams();

  const navigate = useNavigate();

  const { story, loading } = useStory(storyId);

  const { mutate, isPending } = useUpdateStory();

  const form = useForm({
    resolver: zodResolver(storySchema),

    defaultValues: {
      title: "",
      content: "",
      tags: [],
      branch: "",
      year: "",
      anonymous: false,
    },
  });

  useEffect(() => {
    if (!story) return;

    form.reset({
      title: story.title ?? "",

      content: story.content ?? "",

      tags: story.tags ?? [],

      branch: story.branch ?? "",

      year: story.year ?? "",

      anonymous: story.anonymous ?? false,
    });
  }, [story, form]);

  function onSubmit(data) {
    mutate(storyId, data, {
      onSuccess: () => {
        toast.success("Story updated successfully.");

        navigate(`/stories/${storyId}`);
      },

      onError: () => {
        toast.error("Failed to update story.");
      },
    });
  }

  function onInvalid() {
    toast.error("Please fix the errors before updating.");
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!story) {
    return <div>Story not found.</div>;
  }

  return (
    <StoryForm
      form={form}
      onSubmit={onSubmit}
      onInvalid={onInvalid}
      isSubmitting={isPending}
    />
  );
}
