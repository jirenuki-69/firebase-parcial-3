const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/users.js');
const authRoutes = require('./routes/auth.js');
const productRoutes = require('./routes/products.js');
const serviceRoutes = require('./routes/services.js');
require('./database.js');
require('dotenv').config();

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());

// Routes
app.use('/users', userRoutes);
app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/services', serviceRoutes);

app.listen(process.env.PORT || 3000);
console.log('Server is listenning on port', process.env.PORT);
