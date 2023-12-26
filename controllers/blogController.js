const Blog = require("../models/blog");
const { success, failure } = require('../helpers/responseHelper.js');
const asyncHandler = require("express-async-handler");
const { ASC, DESC } = require('../constants');

exports.index = asyncHandler(async (req, res, next) => {
    try {

        const data = {
            'blogs': await Blog.find().sort({ 'createdAt': DESC })
        };

        return success(res, "", 200, data);

    } catch (error) {

        return failure(res, error.message, 422);
    }
});

exports.store = asyncHandler(async (req, res, next) => {
    try {

        const blog = new Blog({
            title: req.body.title,
            description: req.body.description,
            image: req.body.image
        });

        var data = {
            'blog': await blog.save()
        };

        return success(res, "Blog created.", 200, data);

    } catch (error) {

        return failure(res, error.message, 422);
    }
});

exports.show = asyncHandler(async (req, res, next) => {
    try {

        const data = {
            'blog': await Blog.findById(req.params.id),
        };

        if(!data.blog) {
            throw new Error('Blog details not found.');
        }

        return success(res, "", 200, data);

    } catch (error) {

        return failure(res, error.message, 422);
    }
});

exports.update = asyncHandler(async (req, res, next) => {
    try {

        const data = {
            'blog': await Blog.findByIdAndUpdate(req.params.id, req.body),
        };

        return success(res, "", 200, data);

    } catch (error) {

        return failure(res, error.message, 422);
    }
});

exports.delete = asyncHandler(async (req, res, next) => {
    try {

        const data = {
            'blog': await Blog.findByIdAndDelete(req.params.id),
        };

        return success(res, "", 200, data);

    } catch (error) {

        return failure(res, error.message, 422);
    }
});
