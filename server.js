const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Mock E-Commerce Relational Database Array
let databaseProducts = [
    { id: 1, title: "Premium Wireless Headphones", price: 2499 },
    { id: 2, title: "Ergonomic Optical Mouse", price: 899 },
    { id: 3, title: "Smart Fitness Tracker Band", price: 1999 }
];

// READ API: Fetch all catalog products
app.get('/api/products', (req, res) => {
    res.json(databaseProducts);
});

// CREATE API: Admin adds custom inventory items
app.post('/api/products', (req, res) => {
    const product = {
        id: Date.now(),
        title: req.body.title,
        price: req.body.price
    };
    databaseProducts.push(product);
    res.status(201).json(product);
});

// Serve Frontend Portal Interface
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`E-Commerce application operational on port ${PORT}`);
});
