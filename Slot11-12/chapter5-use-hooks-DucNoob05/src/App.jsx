import { useState } from 'react'
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import { Navbar, Nav, Container, Button } from 'react-bootstrap'
import Ex01_BasicCounter    from './pages/Ex01_BasicCounter'
import Ex02_CounterWithStep from './pages/Ex02_CounterWithStep'
import Ex03_TodoList        from './pages/Ex03_TodoList'
import Ex04_ShoppingCart    from './pages/Ex04_ShoppingCart'
import Ex05_FormValidation  from './pages/Ex05_FormValidation'
import Ex06_Login           from './pages/Ex06_Login'

function Home() {
  return (
    <Container className="py-5 text-center">
      <h1>useReducer – Bài tập thực hành</h1>
      <p className="text-muted">Chọn bài tập từ thanh điều hướng phía trên</p>
    </Container>
  )
}

export default function App() {
  const [user, setUser] = useState(null)

  // Auth Guard
  if (!user) {
    return <Ex06_Login onLoginSuccess={(u) => setUser(u)} />
  }

  return (
    <BrowserRouter>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={NavLink} to="/">useReducer</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav className="me-auto">
              <Nav.Link as={NavLink} to="/ex01">Bài 1 – Counter</Nav.Link>
              <Nav.Link as={NavLink} to="/ex02">Bài 2 – Step</Nav.Link>
              <Nav.Link as={NavLink} to="/ex03">Bài 3 – Todo</Nav.Link>
              <Nav.Link as={NavLink} to="/ex04">Bài 4 – Cart</Nav.Link>
              <Nav.Link as={NavLink} to="/ex05">Bài 5 – Form</Nav.Link>
            </Nav>
            <Nav className="ms-auto align-items-center gap-3">
              <Navbar.Text className="text-light small">
                Xin chào, <strong className="text-info">{user.fullName}</strong>
              </Navbar.Text>
              <Button variant="outline-danger" size="sm" onClick={() => setUser(null)}>
                Đăng xuất
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="py-4">
        <Routes>
          <Route path="/"     element={<Home />} />
          <Route path="/ex01" element={<Ex01_BasicCounter />} />
          <Route path="/ex02" element={<Ex02_CounterWithStep />} />
          <Route path="/ex03" element={<Ex03_TodoList />} />
          <Route path="/ex04" element={<Ex04_ShoppingCart />} />
          <Route path="/ex05" element={<Ex05_FormValidation />} />
        </Routes>
      </Container>
    </BrowserRouter>
  )
}
