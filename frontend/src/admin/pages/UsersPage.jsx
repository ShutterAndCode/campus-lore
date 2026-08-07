import { useUsers } from "../hooks/queries/useUsers";
import UserTable from "../components/UserTable";


export default function UsersPage() {
  const {
    data,
    isLoading,
    isError,
  } = useUsers();


  if (isLoading) {
    return (
      <div>
        Loading users...
      </div>
    );
  }


  if (isError) {
    return (
      <div>
        Failed to load users.
      </div>
    );
  }


  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-2xl font-bold">
          Users
        </h1>

        <p className="text-muted-foreground">
          Manage user accounts and permissions.
        </p>
      </div>


      <UserTable users={data} />

    </div>
  );
}