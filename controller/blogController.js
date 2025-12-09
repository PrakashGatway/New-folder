const Blog = require('../model/Blog.js');
const catchAsync = require('../util/catchAsync.js');
const AppError = require('../util/appError');
const { default: mongoose } = require('mongoose');



// create Blog 

exports.addblog = catchAsync(async (req, res, next) => {
  if (req.file) req.body.image = req.file.filename;

  if (req.file2) req.body.image = req.file.filename;


  const blog = await Blog.create(req.body)

  res.status(201).json({
    status: 'success',
    data: {
      blog,
      message: "Blog Added"
    }
  })
});

// Get All blog

exports.getAllblog = catchAsync(async (req, res, next) => {
  const { page = 1, limit = 10, category, search, all } = req.query;
  const skip = (page - 1) * limit;
  const filter = {};
  if (category && category !== 'All') filter.category = category;
  if (search) filter.blogTitle = { $regex: search, $options: 'i' };

  const total = await Blog.countDocuments(filter);
  if (total === 0) {
    return res.status(200).json({
      status: 'success',
      results: 0,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      data: {
        blog: [],
      }
    });
  }
  let query = Blog.find(filter).sort({ createdAt: -1 });

  if (!all) {
    query = query.skip(skip).limit(limit);
  }
  const blog = await query;

  return res.status(200).json({
    status: 'success',
    results: blog.length,
    total,
    currentPage: page,
    totalPages: Math.ceil(total / limit),
    data: {
      blog
    }
  });
});

// for get single blog - controller

exports.getSigleblog = catchAsync(async (req, res, next) => {

  const id = req.params.id;

  const blog = await Blog.findOne({
    Slug: id
  });
  if (!blog || !Object.keys(blog).length) {
    return res.status(200).json({
      status: 'success',
      data: {
        blog: {},
        message: "blog not found"
      }
    })
  }
  res.status(200).json({
    status: 'success',
    data: {
      blog,
      message: "blog Fatch"
    }
  })
});

exports.GetSigleBlogForEdit = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  if (!id) { return res.status(402).json({ status: 'false' }) }
  const blog = await Blog.findOne({
    $or: [
      { _id: new mongoose.Types.ObjectId(id) },
      { id: id }
    ]
  });
  if (!blog || !Object.keys(blog).length) {
    return res.status(200).json({
      status: 'success',
      data: {
        blog: {},
        message: "blog not found"
      }
    })
  }
  res.status(200).json({
    status: 'success',
    data: {
      blog,
      message: "blog Fatch"
    }
  })
});

// for updat video or Photo info - controller

exports.updateblog = catchAsync(async (req, res, next) => {

  const id = req.params.id;

  if (req.file) req.body.image = req.file.filename;

  const blog = await Blog.findOneAndUpdate(
    {
      $or: [
        { _id: new mongoose.Types.ObjectId(id) },
        { id: id }
      ]
    },
    req.body,
    { new: true }
  );

  if (!blog) {
    return next(new AppError("blog not found", 404))
  }

  res.status(201).json({
    status: 'success',
    data: {
      blog,
      message: "blog updated"
    }
  })
});

exports.deleteById = catchAsync(async (req, res, next) => {

  const id = req.params.id;

  const blog = await Blog.findByIdAndDelete(id, { new: true });

  if (!blog) {
    return next(new AppError("data not found", 404))
  }

  res.status(201).json({
    status: 'success',
    data: {
      blog,
      message: "blog deleted"
    }
  })
});

const getNextBlog = async (req, res) => {
  try {
    const currentBlogId = ObjectId(req.params.id);


    const nextBlog = await Blog.findOne({ _id: { $gt: currentBlogId } }, { projection: { _id: 1 } });

    res.json(nextBlog);
  } catch (error) {
    console.error('Error getting next blog:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Function to get previous blog
const getPreviousBlog = async (req, res) => {
  try {
    const currentBlogId = ObjectId(req.params.id);


    const previousBlog = await Blog.findOne({ _id: { $lt: currentBlogId } }, { projection: { _id: 1 } });

    res.json(previousBlog);
  } catch (error) {
    console.error('Error getting previous blog:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getLatestBlogs = async (req, res) => {
  try {
    const latestBlogs = await db.collection('blogs')
      .find()
      .sort({ createdAt: -1 }) // Sort by createdAt field in descending order to get the latest blogs first
      .limit(3) // Limit to 3 blogs
      .toArray();

    res.json(latestBlogs);
  } catch (error) {
    console.error('Error getting latest blogs:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getAllblogPaginated = catchAsync(async (req, res, next) => {
  // Get page and limit from query params or set default values
  const page = parseInt(req.query.page) || 1; // default to page 1
  const limit = parseInt(req.query.limit) || 3; // default to 10 items per page
  const skip = (page - 1) * limit;

  const totalBlogs = await Blog.countDocuments(); // Total number of blogs
  const blogs = await Blog.find().sort({ createdAt: -1 }).skip(skip).limit(limit);

  res.status(200).json({
    status: 'success',
    totalBlogs,
    currentPage: page,
    totalPages: Math.ceil(totalBlogs / limit),
    data: {
      blogs
    }
  });
});