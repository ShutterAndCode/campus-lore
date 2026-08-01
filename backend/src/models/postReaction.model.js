import mongoose, { Schema } from 'mongoose';

const REACTION_TYPES = ['like'];//can add later

const postReactionSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    post: {
      type: Schema.Types.ObjectId,
      ref: 'ExperiencePost',
      required: true,
    },
    reactionType: {
      type: String,
      enum: REACTION_TYPES,
      required: true,
    },
  },
  { timestamps: true }
);

postReactionSchema.index({ user: 1, post: 1 }, { unique: true });

const PostReaction = mongoose.model('PostReaction', postReactionSchema);

export default PostReaction;