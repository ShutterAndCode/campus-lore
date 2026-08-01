import mongoose, { Schema } from 'mongoose';

const experiencePostSchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    academicYear: {
      type: String,
      enum: ['1st', '2nd', '3rd', '4th','5th'],
      required: true,
    },
    department: {
      type: String,
      required: true,
      trim: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    isAnonymous: {
      type: Boolean,
      default: false,
    },
    likesCount: {
      type: Number,
      default: 0,
    },
    commentsCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

experiencePostSchema.index({ author: 1, createdAt: -1 });

const ExperiencePost = mongoose.model('ExperiencePost', experiencePostSchema);

export default ExperiencePost;