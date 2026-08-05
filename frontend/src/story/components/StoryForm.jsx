import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";


export default function StoryForm({
  form,
  onSubmit,
  onInvalid,
  isSubmitting,
}) {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(
          onSubmit,
          onInvalid
        )}
        className="space-y-6"
      >

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Title
              </FormLabel>

              <FormControl>
                <Input
                  placeholder="Give your story a title"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />


        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>

              <FormLabel>
                Story
              </FormLabel>

              <FormControl>
                <Textarea
                  rows={10}
                  placeholder="Share your experience..."
                  {...field}
                />
              </FormControl>

              <FormMessage />

            </FormItem>
          )}
        />


        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>

              <FormLabel>
                Tags
              </FormLabel>

              <FormControl>
                <Input
                  placeholder="First Year, Hostel, Academics"
                  value={field.value.join(", ")}
                  onChange={(event) =>
                    field.onChange(
                      event.target.value
                        .split(",")
                        .map((tag) => tag.trim())
                        .filter(Boolean)
                    )
                  }
                />
              </FormControl>

              <FormMessage />

            </FormItem>
          )}
        />


        <FormField
          control={form.control}
          name="branch"
          render={({ field }) => (
            <FormItem>

              <FormLabel>
                Branch
              </FormLabel>

              <FormControl>
                <Input
                  placeholder="Electrical Engineering"
                  {...field}
                />
              </FormControl>

              <FormMessage />

            </FormItem>
          )}
        />


        <FormField
          control={form.control}
          name="year"
          render={({ field }) => (
            <FormItem>

              <FormLabel>
                Year
              </FormLabel>

              <FormControl>
                <Input
                  placeholder="4th Year"
                  {...field}
                />
              </FormControl>

              <FormMessage />

            </FormItem>
          )}
        />


        <FormField
          control={form.control}
          name="anonymous"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between rounded-lg border p-4">

              <div>
                <FormLabel>
                  Post anonymously
                </FormLabel>

                <p className="text-sm text-muted-foreground">
                  Hide your identity from other students
                </p>
              </div>


              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>

            </FormItem>
          )}
        />


        <Button
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting
            ? "Publishing..."
            : "Publish Story"}
        </Button>

      </form>
    </Form>
  );
}