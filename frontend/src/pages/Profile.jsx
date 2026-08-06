import { useNavigate } from "react-router-dom";

import { useProfile } from "@/profile";
import { getInitials } from "@/lib/user";

import Page from "@/components/layout/Page";
import Container from "@/components/layout/Container";
import Grid from "@/components/layout/Grid";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const PROFILE_STATS = [
  { label: "Stories Written", value: 0 },
  { label: "Helpful Marks", value: 0 },
  { label: "Mentorship Sessions", value: 0 },
];

function ProfileSkeleton() {
  return (
    <Page>
      <Container>
        <div className="space-y-8">
          <div className="flex items-center gap-4">
            <Skeleton className="h-16 w-16 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-64" />
            </div>
          </div>

          <Skeleton className="h-40 rounded-xl" />

          <Grid cols={3} gap={4}>
            {Array.from({ length: 3 }).map((_, index) => (
              <Skeleton key={index} className="h-28 rounded-xl" />
            ))}
          </Grid>
        </div>
      </Container>
    </Page>
  );
}

function ProfileError() {
  return (
    <Page>
      <Container>
        <Alert variant="destructive">
          <AlertTitle>Unable to load profile</AlertTitle>
          <AlertDescription>
            Something went wrong while fetching your profile. Please try again
            later.
          </AlertDescription>
        </Alert>
      </Container>
    </Page>
  );
}

export default function Profile() {
  const navigate = useNavigate();

  const { data: profile, isLoading, isError } = useProfile();

  if (isLoading) {
    return <ProfileSkeleton />;
  }

  if (isError) {
    return <ProfileError />;
  }

  return (
    <Page>
      <Container>
        <div className="space-y-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={profile?.avatar} alt={profile?.name ?? "Profile"} />
                <AvatarFallback>{getInitials(profile?.name)}</AvatarFallback>
              </Avatar>

              <div>
                <h1 className="text-2xl font-bold">
                  {profile?.name || "Unnamed Student"}
                </h1>

                <p className="text-sm text-muted-foreground">
                  {profile?.email}
                </p>
              </div>
            </div>

            <Button variant="outline" onClick={() => navigate("/profile/edit")}>
              Edit Profile
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>About</CardTitle>
            </CardHeader>

            <CardContent className="space-y-3">
              <p>{profile?.bio || "No bio added yet."}</p>

              <div className="space-y-1 text-sm text-muted-foreground">
                <p>
                  <strong>Role:</strong> {profile?.role}
                </p>

                <p>
                  <strong>Organization:</strong> {profile?.organization}
                </p>

                <p>
                  <strong>Email:</strong> {profile?.email}
                </p>
              </div>
            </CardContent>
          </Card>

          <Grid cols={3} gap={4}>
            {PROFILE_STATS.map((stat) => (
              <Card key={stat.label}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.label}
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </CardContent>
              </Card>
            ))}
          </Grid>
        </div>
      </Container>
    </Page>
  );
}
