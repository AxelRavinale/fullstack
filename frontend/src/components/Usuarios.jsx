import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Form, Table } from 'react-bootstrap';
import jsPDF from 'jspdf';
import autoTable from "jspdf-autotable";

const API_URL = 'http://localhost:3001/usuarios';

const Usuarios = () => {
const [usuarios, setUsuarios] = useState([]);
const [form, setForm] = useState({ nombre: '', email: '', edad: '' });
const [editId, setEditId] = useState(null);

useEffect(() => {
    fetchUsuarios();
}, []);

const fetchUsuarios = async () => {
    const res = await axios.get(API_URL);
    setUsuarios(res.data);
};

const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
    await axios.put(`${API_URL}/${editId}`, form);
    } else {
    await axios.post(API_URL, form);
    }
    setForm({ nombre: '', email: '', edad: '' });
    setEditId(null);
    fetchUsuarios();
};

const handleEdit = (usuario) => {
    setForm({ nombre: usuario.nombre, email: usuario.email, edad: usuario.edad });
    setEditId(usuario.id);
};

const handleDelete = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchUsuarios();
};

    const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Listado de Usuarios", 14, 10);

    const encabezado = [["Nombre", "Email", "Edad"]];
    const datos = usuarios.map((usuario) => [
        usuario.nombre,
        usuario.email,
        usuario.edad,
    ]);

    autoTable(doc, {
        head: encabezado,
        body: datos,
        startY: 20,
    });

    doc.save("usuarios.pdf");
    };


return (
    <div
        style={{
            backgroundImage: 'url("/images/Usuarios.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '100vh',
            padding: '2rem',
    }}>
    <h2>Usuarios</h2>
    <Form onSubmit={handleSubmit} className="mb-3">
        <Form.Control
        placeholder="Nombre"
        value={form.nombre}
        onChange={(e) => setForm({ ...form, nombre: e.target.value })}
        required
        />
        <Form.Control
        className="mt-2"
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        required
        />
        <Form.Control
        className="mt-2"
        type="number"
        placeholder="Edad"
        value={form.edad}
        onChange={(e) => setForm({ ...form, edad: e.target.value })}
        required
        />
        <Button className="mt-2" type="submit">
        {editId ? 'Actualizar' : 'Crear'}
        </Button>
    </Form>

    <Table striped bordered>
        <thead>
        <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Edad</th>
            <th>Acciones</th>
        </tr>
        </thead>
        <tbody>
        {usuarios.map(u => (
            <tr key={u.id}>
            <td>{u.nombre}</td>
            <td>{u.email}</td>
            <td>{u.edad}</td>
            <td>
                <Button variant="warning" size="sm" onClick={() => handleEdit(u)}>
                Editar
                </Button>{' '}
                <Button variant="danger" size="sm" onClick={() => handleDelete(u.id)}>
                Eliminar
                </Button>
            </td>
            </tr>
        ))}
        </tbody>
    </Table>

    <Button onClick={exportPDF}>Exportar a PDF</Button>
    </div>
);
};

export default Usuarios;
