import { useDeletePost } from "../hooks/mutations/useDeletePost";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function PostTable({ posts }) {
  const { mutate: deletePost, isPending } = useDeletePost();

  const handleDelete = (postId) => {
    deletePost({
      postId,
    });
  };

  return (
    <div className="rounded-md border w-full overflow-hidden">
      <Table className="table-fixed w-full">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[60px]">S.No.</TableHead>

            <TableHead className="w-[25%]">Title</TableHead>

            <TableHead className="w-[25%]">Author</TableHead>

            <TableHead className="hidden lg:table-cell w-[18%]">
              Department
            </TableHead>

            <TableHead className="w-[80px]">Year</TableHead>

            <TableHead className="w-[110px]">Engagement</TableHead>

            <TableHead className="hidden xl:table-cell w-[150px]">
              Tags
            </TableHead>

            <TableHead className="w-[100px]">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts?.map((post, index) => (
            <TableRow key={post._id}>
              <TableCell>{index + 1}</TableCell>

              <TableCell className="max-w-[180px]">
                <div className="font-medium truncate">{post.title}</div>
              </TableCell>

              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage
                      src={post.isAnonymous ? undefined : post.author?.avatar}
                    />

                    <AvatarFallback>
                      {post.isAnonymous ? "A" : post.author?.name?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>

                  <span className="truncate max-w-[140px]">
                    {post.isAnonymous ? "Anonymous" : post.author?.name}
                  </span>
                </div>
              </TableCell>

              <TableCell className="hidden lg:table-cell truncate">
                {post.department}
              </TableCell>

              <TableCell>{post.academicYear}</TableCell>

              <TableCell>
                <div className="text-sm">
                  <div>❤️ {post.likesCount}</div>

                  <div>💬 {post.commentsCount}</div>
                </div>
              </TableCell>

              <TableCell className="hidden xl:table-cell">
                <div className="flex flex-wrap gap-1">
                  {post.tags?.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </TableCell>

              <TableCell>
                <Button
                  variant="destructive"
                  size="sm"
                  disabled={isPending}
                  onClick={() => handleDelete(post._id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
