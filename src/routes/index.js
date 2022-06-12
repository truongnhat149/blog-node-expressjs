const siteRouter = require('./site');
const blogRouter = require('./blogs');
const meRouter = require('./me');

function route(app) {
    app.use('/blogs', blogRouter);
    
    app.use('/me', meRouter);
    
    app.use('/', siteRouter);
}

module.exports = route;