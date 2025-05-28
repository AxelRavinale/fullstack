import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Form, Table } from 'react-bootstrap';
import jsPDF from 'jspdf';
import autoTable from "jspdf-autotable";

const API_URL = 'http://localhost:3001/productos';

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [form, setForm] = useState({ nombre: '', precio: '' });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchProductos();
  }, []);

  const fetchProductos = async () => {
    const res = await axios.get(API_URL);
    setProductos(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await axios.put(`${API_URL}/${editId}`, form);
    } else {
      await axios.post(API_URL, form);
    }
    setForm({ nombre: '', precio: '' });
    setEditId(null);
    fetchProductos();
  };

  const handleEdit = (producto) => {
    setForm({ nombre: producto.nombre, precio: producto.precio });
    setEditId(producto.id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchProductos();
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Listado de Productos", 14, 10);

    const encabezado = [["Nombre", "Precio"]];
    const datos = productos.map((prod) => [prod.nombre, `$${prod.precio}`]);

    autoTable(doc, {
      head: encabezado,
      body: datos,
      startY: 20,
    });

    doc.save("productos.pdf");
  };


  return (
    <div
        style={{
        backgroundImage: 'url("/images/Productos.webp")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        padding: '2rem',
    }}>
      <h2>Productos</h2>
      <Form onSubmit={handleSubmit} className="mb-3">
        <Form.Control
          placeholder="Nombre"
          value={form.nombre}
          onChange={(e) => setForm({ ...form, nombre: e.target.value })}
          required
        />
        <Form.Control
          className="mt-2"
          type="number"
          placeholder="Precio"
          value={form.precio}
          onChange={(e) => setForm({ ...form, precio: e.target.value })}
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
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map(p => (
            <tr key={p.id}>
              <td>{p.nombre}</td>
              <td>{p.precio}</td>
              <td>
                <Button variant="warning" size="sm" onClick={() => handleEdit(p)}>
                  Editar
                </Button>{' '}
                <Button variant="danger" size="sm" onClick={() => handleDelete(p.id)}>
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

export default Productos;

