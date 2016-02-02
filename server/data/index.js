const requireDir = require('require-dir');

requireDir('./models');
require('./dev').populate();

mongoUrl = 'mongodb://localhost/coloc';
mongoose = require('mongoose');
mongoose.connect(mongoUrl);
