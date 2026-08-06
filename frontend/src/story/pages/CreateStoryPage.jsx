import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

import StoryForm from "../components/StoryForm";
import { storySchema } from "../schemas/storySchema";
import { useCreateStory } from "../hooks/mutations/useCreateStory";

import Container from "@/components/layout/Container";
import Page from "@/components/layout/Page";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CreateStoryPage() {
  const navigate = useNavigate();

  const { mutate, isPending } = useCreateStory();

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

  function onSubmit(data) {
    mutate(data, {
      onSuccess: () => {
        toast.success("Story published successfully.");

        navigate("/");
      },

      onError: () => {
        toast.error("Failed to publish story.");
      },
    });
  }

  function onInvalid(errors) {
    const firstError = Object.values(errors)[0];

    toast.error(firstError?.message ?? "Please fix the form errors.");
  }

  return (
    <Page>
      <Container>
        <Card className="max-w-2xl">
          <CardHeader>
            <CardTitle>Create Story</CardTitle>
          </CardHeader>

          <CardContent>
            <StoryForm
              form={form}
              onSubmit={onSubmit}
              onInvalid={onInvalid}
              isSubmitting={isPending}
            />
          </CardContent>
        </Card>
      </Container>
    </Page>
  );
}
