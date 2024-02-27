import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      // required: true, 
    },
    imageUrl: {
      type: String,
      // required: true,
    },
    description: {
      type: String,
      // required: true,
    },
    moviesName: {
      type: String,
      // required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;
