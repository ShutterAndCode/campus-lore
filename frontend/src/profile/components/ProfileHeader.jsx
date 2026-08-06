export default function ProfileHeader({ profile, isOwner }) {
  return (
    <section className="space-y-5">
      <img
        src={profile.avatar}
        alt={profile.name}
        className="h-24 w-24 rounded-full object-cover"
      />

      <div>
        <h1 className="text-3xl font-bold">{profile.name}</h1>

        <p className="mt-2 text-muted-foreground">
          {profile.bio || "No bio added yet."}
        </p>
      </div>

      <div className="space-y-1 text-sm text-muted-foreground">
        <p>Branch: {profile.branch || "-"}</p>

        <p>Batch: {profile.batch || "-"}</p>

        <p>Graduation: {profile.graduationYear || "-"}</p>
      </div>
    </section>
  );
}
