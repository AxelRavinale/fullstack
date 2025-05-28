const fs = require('fs');
const path = require('path');

const productosFile = path.join(__dirname, '../data/productos.json');

function leerProductos() {
  const data = fs.readFileSync(productosFile, 'utf-8');
  return JSON.parse(data);
}

function guardarProductos(productos) {
  fs.writeFileSync(productosFile, JSON.stringify(productos, null, 2));
}

exports.getAll = (req, res) => {
  const productos = leerProductos();
  res.json(productos);
};

exports.getById = (req, res) => {
  const productos = leerProductos();
  const producto = productos.find(p => p.id === parseInt(req.params.id));
  if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });
  res.json(producto);
};

exports.create = (req, res) => {
  const productos = leerProductos();
  const nuevoProducto = { id: Date.now(), ...req.body };
  productos.push(nuevoProducto);
  guardarProductos(productos);
  res.status(201).json(nuevoProducto);
};

exports.update = (req, res) => {
  const productos = leerProductos();
  const index = productos.findIndex(p => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Producto no encontrado' });
  productos[index] = { id: productos[index].id, ...req.body };
  guardarProductos(productos);
  res.json(productos[index]);
};

exports.delete = (req, res) => {
  let productos = leerProductos();
  productos = productos.filter(p => p.id !== parseInt(req.params.id));
  guardarProductos(productos);
  res.json({ mensaje: 'Producto eliminado' });
};
