const Blog = require('../models/Blog');
const { multipleMongooseToObject } = require('../../utils/mongoose');

class MeController {

    // [GET] /me/store/blogs
    storedBlog(req, res, next) {
        Promise.all([
            Blog.find({}).sortable(req),
            Blog.countDocumentsDeleted()
        ])
            .then(([blogs, deletedCount]) =>
                res.render('me/store-blogs', {
                    deletedCount,
                    blogs : multipleMongooseToObject(blogs),
                    
                },
                console.log(blogs._id)),
            )
            .catch(next);
    };

    // [GET] /me/store/blogs
    trashBlog(req, res, next) {
        Blog.findDeleted({}).sortable(req)
            .then((blogs) => 
                res.render('me/trash-blogs', {
                    blogs: multipleMongooseToObject(blogs),
                }),
            )
            .catch(next);
    };
}

module.exports = new MeController();