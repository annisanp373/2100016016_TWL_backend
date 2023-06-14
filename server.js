const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let products = [
  { id: 1, name: 'Product 1', price: 10.99 },
  { id: 2, name: 'Product 2', price: 19.99 },
];

app.get('/products', (req, res) => {
  res.json(products);
});

app.get('/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.find((p) => p.id === productId);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Produk tidak ditemukan' });
  }
});

app.post('/products', (req, res) => {
  const { name, price } = req.body;
  const newProduct = { id: products.length + 1, name, price };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

app.put('/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const { name, price } = req.body;
  const productIndex = products.findIndex((p) => p.id === productId);

  if (productIndex !== -1) {
    products[productIndex] = { ...products[productIndex], name, price };
    res.json(products[productIndex]);
  } else {
    res.status(404).json({ error: 'Produk tidak ditemukan' });
  }
});

app.delete('/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const productIndex = products.findIndex((p) => p.id === productId);

  if (productIndex !== -1) {
    const deletedProduct = products[productIndex];
    products.splice(productIndex, 1);
    res.json(deletedProduct);
  } else {
    res.status(404).json({ error: 'Produk tidak ditemukan' });
  }
});

app.listen(port, () => {
  console.log(`Server sedang berjalan pada port ${port}`);
});
