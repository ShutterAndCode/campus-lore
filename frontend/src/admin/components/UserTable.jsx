import { useUpdateUserRole } from "../hooks/mutations/useUpdateUserRole";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function UserTable({ users }) {
  const { mutate: updateRole, isPending } = useUpdateUserRole();

  const handleRoleChange = (userId, role) => {
    updateRole({
      userId,
      role,
    });
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Organization</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Joined</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {users?.map((user) => (
            <TableRow key={user._id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={user.avatar} />

                    <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
                  </Avatar>

                  <span className="font-medium">{user.name}</span>
                </div>
              </TableCell>

              <TableCell>{user.email}</TableCell>

              <TableCell>{user.organization}</TableCell>

              <TableCell>
                <Badge variant="outline">{user.role}</Badge>
              </TableCell>

              <TableCell>
                {new Date(user.createdAt).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </TableCell>

              <TableCell>
                <Select
                  value={user.role}
                  disabled={isPending}
                  onValueChange={(value) => handleRoleChange(user._id, value)}
                >
                  <SelectTrigger className="w-[120px]">
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="student">Student</SelectItem>

                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
