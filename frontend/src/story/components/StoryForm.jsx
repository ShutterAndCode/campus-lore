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

export default function StoryForm({ form, onSubmit, onInvalid, isSubmitting }) {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, onInvalid)}
        className="space-y-6"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>

              <FormControl>
                <Input placeholder="Give your story a title" {...field} />
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
              <FormLabel>Story</FormLabel>

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
              <FormLabel>Tags</FormLabel>

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
              <FormLabel>Branch</FormLabel>

              <FormControl>
                <Input placeholder="Electrical Engineering" {...field} />
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
              <FormLabel>Academic Year</FormLabel>

              <FormControl>
                <select
                  {...field}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="">Select Year</option>
                  <option value="1st">1st Year</option>
                  <option value="2nd">2nd Year</option>
                  <option value="3rd">3rd Year</option>
                  <option value="4th">4th Year</option>
                </select>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="anonymous"
          render={({ field }) => (
            <FormItem className="space-y-3 rounded-xl border bg-muted/30 p-4">
              <div>
                <FormLabel>Posting Mode</FormLabel>

                <p className="text-sm text-muted-foreground">
                  Choose whether your identity is visible to other students.
                </p>
              </div>

              <div className="flex gap-2">
                <Button
                  type="button"
                  variant={!field.value ? "default" : "outline"}
                  className="flex-1"
                  onClick={() => field.onChange(false)}
                >
                  👤 Show Name
                </Button>

                <Button
                  type="button"
                  variant={field.value ? "default" : "outline"}
                  className="flex-1"
                  onClick={() => field.onChange(true)}
                >
                  🕶 Anonymous
                </Button>
              </div>
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Publishing..." : "Publish Story"}
        </Button>
      </form>
    </Form>
  );
}
