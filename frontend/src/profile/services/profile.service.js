import {
  getMyProfile as fetchMyProfile,
  getPublicProfile as fetchPublicProfile,
  updateMyProfile as updateProfileApi,
} from "../api/profile.api";

function mapProfile(user) {
  return {
    id: user._id,
    name: user.name,
    avatar: user.avatar,
    bio: user.bio,
    branch: user.branch,
    batch: user.batch,
    graduationYear: user.graduationYear,
    createdAt: user.createdAt,
  };
}

export async function getProfile() {
  const user = await fetchMyProfile();
  return mapProfile(user);
}

export async function getPublicProfile(userId) {
  const user = await fetchPublicProfile(userId);
  return mapProfile(user);
}

export async function updateProfile(data) {
  const user = await updateProfileApi(data);
  return mapProfile(user);
}