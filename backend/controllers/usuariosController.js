const fs = require('fs');
const path = require('path');

const usuariosFile = path.join(__dirname, '../data/usuarios.json');

function leerUsuarios() {
  const data = fs.readFileSync(usuariosFile, 'utf-8');
  return JSON.parse(data);
}

function guardarUsuarios(usuarios) {
  fs.writeFileSync(usuariosFile, JSON.stringify(usuarios, null, 2));
}

exports.getAll = (req, res) => {
  const usuarios = leerUsuarios();
  res.json(usuarios);
};

exports.getById = (req, res) => {
  const usuarios = leerUsuarios();
  const usuario = usuarios.find(u => u.id === parseInt(req.params.id));
  if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
  res.json(usuario);
};

exports.create = (req, res) => {
  const usuarios = leerUsuarios();
  const nuevoUsuario = { id: Date.now(), ...req.body };
  usuarios.push(nuevoUsuario);
  guardarUsuarios(usuarios);
  res.status(201).json(nuevoUsuario);
};

exports.update = (req, res) => {
  const usuarios = leerUsuarios();
  const index = usuarios.findIndex(u => u.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Usuario no encontrado' });
  usuarios[index] = { id: usuarios[index].id, ...req.body };
  guardarUsuarios(usuarios);
  res.json(usuarios[index]);
};

exports.delete = (req, res) => {
  let usuarios = leerUsuarios();
  usuarios = usuarios.filter(u => u.id !== parseInt(req.params.id));
  guardarUsuarios(usuarios);
  res.json({ mensaje: 'Usuario eliminado' });
};
