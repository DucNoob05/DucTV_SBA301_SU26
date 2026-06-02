import { Card, Col, Container, Row } from 'react-bootstrap'
import RegisterForm from './component/RegisterForm'
import './App.css'

function App() {
  return (
    <main className="form-app">
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6} xl={5}>
            <Card className="form-card border-0 shadow-lg">
              <Card.Body className="p-4 p-md-5">
                <RegisterForm />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </main>
  )
}

export default App
