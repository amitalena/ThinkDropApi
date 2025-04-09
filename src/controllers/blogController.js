const Blog = require("../models/Blog");

// create blog
exports.createBlog = async (req, res) => {
    const userId = req.user?.id;
    try {
        const { title, description } = req.body;
        const newBlog = new Blog({ userId: userId, title, description });
        if (req.file) {
            newBlog.blogImage = req.file.filename;
        }
        await newBlog.save();
        res.status(201).json({ message: "Blog created successfully", data: newBlog });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// all blog
exports.allBlog = async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.json({ message: "All blogs retrieved", data: blogs });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// blog by id
exports.singleBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ message: "Blog not found" });
        res.json({ message: "Single blog retrieved", status: true, data: blog });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// update blog
exports.updatedBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;

        const updateBlog = {};

        if (title) updateBlog.title = title;
        if (description) updateBlog.description = description;

        if (req.file) {
            updateBlog.blogImage = req.file.filename;
        }

        const updatedBlog = await Blog.findByIdAndUpdate(id, updateBlog, { new: true });

        if (!updatedBlog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        res.status(200).json({ message: "Blog updated", data: updatedBlog });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// delete blog
exports.deleteBlog = async (req, res) => {
    const { id } = req.params;
    try {
        const blog = await Blog.findByIdAndDelete(id);
        res.json({ message: "Blog deleted successfully", data: blog });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

