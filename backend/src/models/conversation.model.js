import mongoose, { Schema } from 'mongoose';

const conversationSchema = new Schema(
  {
    participants: {
      type: [{ type: Schema.Types.ObjectId, ref: 'User' }],
      validate: {
        validator: (arr) => arr.length === 2,
        message: 'A conversation must have exactly two participants',
      },
      required: true,
    },
    mentorshipRequest: {
      type: Schema.Types.ObjectId,
      ref: 'MentorshipRequest',
      required: true,
      unique: true,
    },
    lastMessage: {
      type: Schema.Types.ObjectId,
      ref: 'Message',
      default: null,
    },
  },
  { timestamps: true }
);

conversationSchema.index({ participants: 1 });

const Conversation = mongoose.model('Conversation', conversationSchema);

export default Conversation;