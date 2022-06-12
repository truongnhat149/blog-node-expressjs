const Blog = require('../models/Blog');
const { mongooseToObject } = require('../../utils/mongoose');
class BlogController {

    // [GET] /blogs/:slug
    detail(req, res, next) {
         Blog.findOne({ slug: req.params.slug})
            .then((blogs) => 
                res.render('blogs/detail', {
                    blogs: mongooseToObject(blogs),
                })
            )
            .catch(next)
    };

    // [GET] /blogs/create
    create(req, res, next) {
        res.render('blogs/create');
    };

    // [GET] /blogs/store
    store(req, res, next) {
        const formData = {...req.body};
        const blog = new Blog(formData);
        blog
            .save()
            .then(() => res.redirect('/me/store/blogs'))
            .catch(next);
    };

    // [GET] /blogs/:id/edit
    edit(req, res, next) {
        Blog.findById(req.params.id)
            .then((blogs) => res.render('blogs/edit', {
                blogs : mongooseToObject(blogs),
            }))
            .catch(next);
    };

    // [PUT] /blogs/:id
    update(req, res, next) {
        Blog.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/me/store/blogs'))
            .catch(next);
    };

    // [PATCH] /blogs/:id/restore
    restore(req, res, next) {
        Blog.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    };

    // [DELETE] /blogs/:id
    delete(req, res, next) {
        Blog.delete({ _id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next);
    };

    // [DELETE] /blogs/:id/force
    forceDelete(req, res, next) {
        Blog.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    };

    // [POST] /blogs/handle-form-action-store
    handleFormAction(req, res, next) {
        switch(req.body.action) {
            case 'delete': 
                Blog.delete({ _id : { $in : req.body.blogIds } }) // $in select array
                    .then(() => res.redirect('back'))
                    .catch(next);
             break;
            default:
                res.json({ message: 'message is valid' });
            break;
        }
    };

    // [POST] /blogs/handle-form-action-trash
    handleFormActionTrash(req, res, next) {
        switch(req.body.action) {
            case 'restore': 
                Blog.restore({ _id: { $in : req.body.blogIds } })
                    .then(() => res.redirect('back'))
                    .catch(next);
            break;
            case 'forceDelete':
                Blog.deleteOne({ _id: { $in : req.body.blogIds } })
                    .then(() => res.redirect('back'))
                    .catch(next);
            break;
            default:
                res.json({ message: 'message is valid' });
            break;
        }
    };
}

module.exports = new BlogController();