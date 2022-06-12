const handlebars = require('express-handlebars');
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const methodOverride = require('method-override');

const handlebarCustom = require('./helpers/handlebars');
const sortMiddleware = require('./app/middleware/sortMiddleware');
const route = require('./routes');
const db = require('./config/db');

const app = express();
const port = 3000;

// Connect to DB
db.connect();

// read files public
app.use(express.static(path.join(__dirname, 'public')));

// parse => req.body
app.use(express.urlencoded({
    extended : true
}));

// middleware custom
app.use(sortMiddleware);

// override method express
app.use(methodOverride('_method'));

// Http logger
app.use(morgan('combined'));

// Template engine
app.engine('hbs', handlebars.engine(
    {
        defaultLayout: 'main',
        extname: '.hbs',
        helpers: handlebarCustom,
    }
));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

// Routes init
route(app);

app.listen(port, () => console.log(`App listening at http://localhost:${port}`));