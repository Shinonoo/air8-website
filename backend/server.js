require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const contactRoutes = require('./routes/contactRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../frontend')));

app.use('/api/contact', contactRoutes);
app.use('/api/products', productRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Air8 server running on port ${PORT}`);
});
