import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';
import {
  getUserNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
} from '../services/notification.service.js';

export const getNotificationsController = asyncHandler(async (req, res) => {
  const { page, limit } = req.query;
  const result = await getUserNotifications(req.user._id, page, limit);
  res.status(200).json(new ApiResponse(200, result, 'Notifications fetched successfully'));
});

export const markNotificationAsReadController = asyncHandler(async (req, res) => {
  const { notificationId } = req.params;
  const notification = await markNotificationAsRead(notificationId, req.user._id);
  res.status(200).json(new ApiResponse(200, notification, 'Notification marked as read'));
});

export const markAllNotificationsAsReadController = asyncHandler(async (req, res) => {
  const updatedCount = await markAllNotificationsAsRead(req.user._id);
  res.status(200).json(new ApiResponse(200, { updatedCount }, 'All notifications marked as read'));
});