const express = require('express');
const compression = require('compression');
const pageRouter = require('./routes/pageRoutes')
const errorHandler = require('./controller/errorController')
const adminRouter = require('./routes/adminRoutes');
const preferenceRoutes = require('./routes/preferences');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');
const path = require('path');
const Mailer = require('./mailer');
const genrateSiteMap = require('./create-build/CreateBuild-route');

const app = express();
app.use(cors());
app.use(compression());
app.set("trust proxy");
app.use('/api/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, 'public')));

app.get('api/sitemap.xml', function (req, res) {
    res.sendFile(path.resolve(__dirname, "../frontend/public", "sitemap.xml"));
});

app.use(express.json());

app.use('/api/v1', genrateSiteMap)
app.use('/api/v1', pageRouter);
app.use('/api/v1/auth', adminRouter);
app.use('/api/v1/preferences', preferenceRoutes);
app.use('/api/v1/users', userRoutes);


app.use(errorHandler);

Mailer.initialize();
module.exports = app;