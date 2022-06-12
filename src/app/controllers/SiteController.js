const Blog = require('../models/Blog');
class SiteController {

    // [GET] /
    index(req, res, next) {
        Blog.find({})
            .then((blogs) => 
                res.render('home', {
                    blogs: blogs.map((blogs) => blogs.toObject())
            }))
            .catch(next);
            
    }
}

module.exports = new SiteController();