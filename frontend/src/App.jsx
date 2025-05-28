import React, { useState } from 'react';
import Productos from './components/Productos';
import Usuarios from './components/Usuarios';
import { Container, Nav, Tab } from 'react-bootstrap';

const App = () => {
  return (
    <Container className="mt-4">
      <Tab.Container defaultActiveKey="productos">
        <Nav variant="tabs">
          <Nav.Item>
            <Nav.Link eventKey="productos">Productos</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="usuarios">Usuarios</Nav.Link>
          </Nav.Item>
        </Nav>

        <Tab.Content className="mt-4">
          <Tab.Pane eventKey="productos">
            <Productos />
          </Tab.Pane>
          <Tab.Pane eventKey="usuarios">
            <Usuarios />
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </Container>
  );
};

export default App;

