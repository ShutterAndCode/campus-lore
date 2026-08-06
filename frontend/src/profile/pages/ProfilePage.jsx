import { useParams } from "react-router-dom";

import { usePublicProfile } from "../hooks/usePublicProfile";
import ProfileHeader from "../components/ProfileHeader";
import ProfileStories from "../components/ProfileStories";

import { useAuth } from "@/auth";

export default function ProfilePage() {
  const { userId } = useParams();

  const { user } = useAuth();

  const { data: profile, isLoading, isError } = usePublicProfile(userId);

  if (isLoading) {
    return <div>Loading profile...</div>;
  }

  if (isError) {
    return <div>Failed to load profile.</div>;
  }

  const isOwner = user?._id === profile?._id;

  return (
    <main className="mx-auto max-w-4xl space-y-8 p-6">
      <ProfileHeader profile={profile} isOwner={isOwner} />

      <ProfileStories authorId={profile._id} />
    </main>
  );
}
