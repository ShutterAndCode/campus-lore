import Notification from "../models/notification.model.js";
import ApiError from "../utils/ApiError.js";
import { getIO } from "../socket/socket.js";
export const getUserNotifications = async (userId, page, limit) => {
  const skip = (page - 1) * limit;

  const [notifications, total] = await Promise.all([
    Notification.find({ recipient: userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    Notification.countDocuments({ recipient: userId }),
  ]);

  return {
    notifications,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const markNotificationAsRead = async (notificationId, userId) => {
  const notification = await Notification.findById(notificationId);

  if (!notification) {
    throw new ApiError(404, "Notification not found");
  }

  if (notification.recipient.toString() !== userId.toString()) {
    throw new ApiError(
      403,
      "You are not authorized to update this notification",
    );
  }

  if (notification.isRead) {
    return notification;
  }

  notification.isRead = true;
  await notification.save();

  return notification;
};

export const markAllNotificationsAsRead = async (userId) => {
  const result = await Notification.updateMany(
    { recipient: userId, isRead: false },
    { $set: { isRead: true } },
  );

  return result.modifiedCount;
};


export const createNotification = async ({
  recipient,
  sender,
  type,
  title,
  message,
  relatedResource,
}) => {
  const notification = await Notification.create({
    recipient,
    sender: sender || null,
    type,
    title,
    message,
    relatedResource: relatedResource || null,
  });

  try {
    getIO().to(`user:${recipient}`).emit("notification:new", notification);
  } catch (err) {
    console.error("Socket emission failed:", err.message);
  }

  return notification;
};

//read this one carefully later
