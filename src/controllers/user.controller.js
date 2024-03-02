import User from '../models/user.model.js';
import {asyncHandler} from '../utils/asyncHandler.js';
import { uploadOncloudinary } from '../utils/uploadOncloudinary.js';

const uploadData = asyncHandler(async (req, res) => {
  const { movieTitle, description, movieName , adminKey} = req.body;
// console.log('Received data:', { movieTitle, description, movieName });


if (adminKey !== process.env.DEFAULT_USER_PASSWORD) {
  console.log("admin key wrong ")
  return res.status(400).json({ message: 'Please provide correct password' });
}

  if ([movieTitle, description, movieName].some((field) => field.trim() === '')) {
    return res.status(400).json({ message: 'Please provide all fields' });
  }
  const movieImageLocalPath = req.file?.path;
if(!movieImageLocalPath){
  // console.log("local path image not provided : " + movieImageLocalPath);
  return res.status(400).json({ message: "local path image not provided : " + movieImageLocalPath});
}
  const avatar = await uploadOncloudinary(movieImageLocalPath);
  

  const user = await User.create({
    title: movieTitle,
    moviesName: movieName,
    imageUrl: avatar.url,
    description,
  });
  
  if (!user) {
    console.error("Error creating user");
    return res.status(500).json({ message: 'Internal Server Error' });
  }
  console.log("data uploaded successfully"); 
  res.status(201).json({ message: 'Data uploaded successfully', user });
  return;
});


const fetchData = asyncHandler(async (req, res) => {
  const { page = 1, pageSize = 5 } = req.query;
  
  console.log('Received request for fetching users:', { page, pageSize });
  
  const users = await User.find()
  .sort({ createdAt: -1 })
  .skip((page - 1) * [pageSize])
  .limit(parseInt(pageSize));
  res.status(200).json(users);
});

const getPostById = asyncHandler(async (req, res) => {
const postId = req.params.postId; // Match the route parameter name
console.log("postId: " + postId);
  const post = await User.findById(postId);
  console.log("post: " + post);

  if (!post) {
    return res.status(404).json({ message: "Movie Not Found" });
  } else {
    return res.status(200).json(post);
  }
});



const deletePost = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const adminKey = req.headers.authorization;

  if (adminKey !== process.env.DEFAULT_USER_PASSWORD) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // Check if the post exists
  const existingPost = await User.findById(postId);

  if (!existingPost) {
    return res.status(404).json({ message: 'Post not found' });
  }

  // If the post exists, delete it
  const deletedPost = await User.findByIdAndDelete(postId);

  res.status(200).json({ message: 'Post deleted successfully', deletedPost });
});

// for developmode only 
// const updateImageUrlForAllUsers = asyncHandler(async (req, res) => {
//   const newImageUrl = 'https://s3-prod-ue1-images.s3.amazonaws.com/image_studio/generated/402ea25ef5d745168b08cab02031936d.webp?AWSAccessKeyId=AKIAQDJRGGOPGCRKJ35P&Signature=W9fDa8TodjGnaubtiMPqznlO1Uk%3D&Expires=1795261004';

//   // Update all documents in the user collection with the newImageUrl
//   const result = await User.updateMany({}, { $set: { imageUrl: newImageUrl } });

//   res.status(200).json({ message: `Updated ${result.nModified} documents` });
// });

// const deleteAllUsers = asyncHandler(async (req, res) => {
//   try {
//     // Use the deleteMany method to delete all users
//     const result = await User.deleteMany({});

//     // Check the result to see how many documents were deleted
//     console.log(`${result.deletedCount} user(s) deleted.`);

//     // Send a response indicating success
//     res.status(200).json({ message: 'All users deleted successfully.' });
//   } catch (error) {
//     console.error('Error deleting users:', error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// });

export { uploadData, fetchData ,getPostById,deletePost};
