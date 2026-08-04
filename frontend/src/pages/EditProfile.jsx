import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { profileSchema } from "@/lib/profileSchema";

// import { useProfile } from "@/hooks/useProfile";
import useUpdateProfile from "@/hooks/useUpdateProfile";

import Container from "@/components/layout/Container";
import Page from "@/components/layout/Page";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/auth";

function EditProfileSkeleton() {
  return (
    <Page>
      <Container>
        <Skeleton className="h-72 w-full max-w-lg rounded-xl" />
      </Container>
    </Page>
  );
}

function EditProfileError() {
  return (
    <Page>
      <Container>
        <Alert variant="destructive">
          <AlertTitle>Unable to load profile</AlertTitle>
          <AlertDescription>
            Please refresh the page and try again.
          </AlertDescription>
        </Alert>
      </Container>
    </Page>
  );
}

export default function EditProfile() {
  const navigate = useNavigate();

  const {
    data: profile,
    isLoading,
    isError,
  } = useAuth()

  const { mutate, isPending } = useUpdateProfile();

  const form = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      bio: "",
    },
  });

  useEffect(() => {
    if (!profile) return;

    form.reset({
      name: profile.name ?? "",
      bio: profile.bio ?? "",
    });
  }, [profile, form]);

  function onSubmit(data) {
    mutate(data, {
      onSuccess: () => {
        toast.success("Profile updated successfully.");
        navigate("/profile");
      },
      onError: () => {
        toast.error("Failed to update profile.");
      },
    });
  }

  if (isLoading) {
    return <EditProfileSkeleton />;
  }

  if (isError) {
    return <EditProfileError />;
  }

  return (
    <Page>
      <Container>
        <Card className="max-w-lg">
          <CardHeader>
            <CardTitle>Edit Profile</CardTitle>
          </CardHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent className="space-y-5">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>

                      <FormControl>
                        <Input
                          placeholder="Your full name"
                          autoComplete="name"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bio</FormLabel>

                      <FormControl>
                        <Textarea
                          rows={4}
                          placeholder="Tell everyone a little about yourself..."
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>

              <CardFooter className="flex justify-end gap-3">
                <Button
                  type="button"
                  variant="outline"
                  disabled={isPending}
                  onClick={() => navigate("/profile")}
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  disabled={isPending}
                >
                  {isPending ? "Saving..." : "Save Changes"}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
      </Container>
    </Page>
  );
}