const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

const BlogsSchema = new Schema({
    _id: { type: Number },
    title: { type: String, maxlength: 255 },
    category: { type: String, maxlength: 100 },
    content: { type: String },
    author: { type: String },
    summary: { type: String },
    published: { type: String },
    slug: { type: String, slug: 'summary', unique: true },
}, {
    _id: false,
    timestamps: true,
});

// add plugin
mongoose.plugin(slug);
BlogsSchema.plugin(mongooseDelete, {
    deleteAt: true,
    overrideMethods: 'all',
});
BlogsSchema.plugin(AutoIncrement);

// custom query helpers
BlogsSchema.query.sortable = function (req) {

    if (req.query.hasOwnProperty('_sort')) {
        const isValidType = ['asc', 'desc'].includes(req.query.type);
        this.sort({
            [req.query.column] : isValidType ? req.query.type :'desc',
        });
    }
    return this;
};

module.exports = mongoose.model('Blog', BlogsSchema);