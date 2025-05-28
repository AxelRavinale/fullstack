const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const productosPath = "./data/productos.json";
const usuariosPath = "./data/usuarios.json";

function leerArchivo(path) {
  return JSON.parse(fs.readFileSync(path));
}

function escribirArchivo(path, data) {
  fs.writeFileSync(path, JSON.stringify(data, null, 2));
}

// --- RUTAS PRODUCTOS ---
app.get("/productos", (req, res) => {
  res.json(leerArchivo(productosPath));
});

app.post("/productos", (req, res) => {
  const productos = leerArchivo(productosPath);
  const nuevo = { id: Date.now(), ...req.body };
  productos.push(nuevo);
  escribirArchivo(productosPath, productos);
  res.json(nuevo);
});

app.put("/productos/:id", (req, res) => {
  const productos = leerArchivo(productosPath);
  const id = parseInt(req.params.id);
  const index = productos.findIndex((p) => p.id === id);
  productos[index] = { id, ...req.body };
  escribirArchivo(productosPath, productos);
  res.json(productos[index]);
});

app.delete("/productos/:id", (req, res) => {
  let productos = leerArchivo(productosPath);
  productos = productos.filter((p) => p.id !== parseInt(req.params.id));
  escribirArchivo(productosPath, productos);
  res.json({ mensaje: "Producto eliminado" });
});

// --- RUTAS USUARIOS ---
app.get("/usuarios", (req, res) => {
  res.json(leerArchivo(usuariosPath));
});

app.post("/usuarios", (req, res) => {
  const usuarios = leerArchivo(usuariosPath);
  const nuevo = { id: Date.now(), ...req.body };
  usuarios.push(nuevo);
  escribirArchivo(usuariosPath, usuarios);
  res.json(nuevo);
});

app.put("/usuarios/:id", (req, res) => {
  const usuarios = leerArchivo(usuariosPath);
  const id = parseInt(req.params.id);
  const index = usuarios.findIndex((u) => u.id === id);
  usuarios[index] = { id, ...req.body };
  escribirArchivo(usuariosPath, usuarios);
  res.json(usuarios[index]);
});

app.delete("/usuarios/:id", (req, res) => {
  let usuarios = leerArchivo(usuariosPath);
  usuarios = usuarios.filter((u) => u.id !== parseInt(req.params.id));
  escribirArchivo(usuariosPath, usuarios);
  res.json({ mensaje: "Usuario eliminado" });
});

app.listen(3001, () => console.log("Servidor corriendo en puerto 3001"));
