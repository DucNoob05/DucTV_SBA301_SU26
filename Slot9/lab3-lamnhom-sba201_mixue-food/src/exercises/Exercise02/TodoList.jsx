import { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, ListGroup, Badge, InputGroup, Alert } from 'react-bootstrap';

export default function TodoList() {
  // TODO 1: Khai báo state `todos` là mảng rỗng []
  //         Mỗi todo có cấu trúc: { id: number, text: string, completed: boolean }
  const [todos, setTodos] = useState([]);
  // TODO 2: Khai báo state `inputValue` là chuỗi rỗng ''
  const [inputValue, setInputValue] = useState('');
  // TODO 3: Khai báo hàm `addTodo`:
  //         - Nếu inputValue rỗng (sau trim) thì return sớm
  //         - Thêm todo mới vào mảng: { id: Date.now(), text: inputValue.trim(), completed: false }
  //         - Reset inputValue về ''
  const addTodo = () => {
    if (inputValue.trim()) {
      setTodos([...todos, { id: Date.now(), text: inputValue.trim(), completed: false }]);
      setInputValue('');
    }
  };
  // TODO 4: Khai báo hàm `toggleTodo(id)`:
  //         - Tìm todo có id tương ứng và đảo ngược trạng thái completed của nó
  //         - Cập nhật lại state todos
  const toggleTodo = (id) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
  };
  // TODO 5: Khai báo hàm `deleteTodo(id)`:
  //         - Lọc bỏ todo có id khỏi mảng todos
  //         - Cập nhật lại state todos
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };
  // TODO 6: Tính biến `completedCount` = số todo có completed === true
  const completedCount = todos.filter(todo => todo.completed).length;
  // TODO 7: Tính biến `pendingCount` = số todo có completed === false
  const pendingCount = todos.filter(todo => !todo.completed).length;
  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="shadow-sm">
            <Card.Header className="bg-primary text-white">
              <h5 className="mb-0">📝 Danh Sách Công Việc</h5>
            </Card.Header>

            <Card.Body>
              <InputGroup className="mb-3">
                {/* TODO 8: Form.Control với:
                            - placeholder="Nhập công việc mới..."
                            - value bind với inputValue
                            - onChange cập nhật inputValue
                            - onKeyDown: gọi addTodo khi nhấn phím Enter (e.key === 'Enter')
                            - data-testid="todo-input" */}
                <Form.Control
                  type="text"
                  placeholder="Nhập công việc mới..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      addTodo();
                    }
                  }}
                  data-testid="todo-input"
                />

                {/* TODO 9: Button variant="primary", onClick gọi addTodo, data-testid="add-btn", label "Thêm" */}
                <Button variant="primary" onClick={addTodo} data-testid="add-btn">
                  Thêm
                </Button>
              </InputGroup>

              <div className="d-flex gap-2 mb-3 flex-wrap">
                <Badge bg="primary" data-testid="total-count">
                  {/* TODO 10: Hiển thị tổng số todo */}
                  Tổng: {todos.length}
                </Badge>
                <Badge bg="success" data-testid="completed-count">
                  {/* TODO 10: Hiển thị số todo đã hoàn thành */}
                  Hoàn thành: {completedCount}
                </Badge>
                <Badge bg="warning" text="dark" data-testid="pending-count">
                  {/* TODO 10: Hiển thị số todo chưa xong */}
                  Chưa xong: {pendingCount}
                </Badge>
              </div>

              {/* TODO 11: Nếu todos rỗng, hiển thị:
                          <Alert variant="info" data-testid="empty-message">
                            Chưa có công việc nào! Hãy thêm việc mới.
                          </Alert> */}
              {todos.length === 0 && (
                <Alert variant="info" data-testid="empty-message">
                  Chưa có công việc nào! Hãy thêm việc mới.
                </Alert>
              )}

              <ListGroup as="ul">
                {/* TODO 12: Render danh sách todos, mỗi phần tử là một ListGroup.Item:
                            <ListGroup.Item
                              key={todo.id}
                              data-testid={`todo-item-${todo.id}`}
                              className="d-flex align-items-center gap-2"
                            >
                              - Form.Check (checkbox) checked={todo.completed}
                                onChange gọi toggleTodo(todo.id)
                                data-testid={`toggle-${todo.id}`}
                              - <span> hiển thị todo.text
                                nếu todo.completed thêm style={{ textDecoration: 'line-through', color: '#aaa' }}
                              - Button variant="outline-danger" size="sm" ms-auto
                                onClick gọi deleteTodo(todo.id)
                                data-testid={`delete-btn-${todo.id}`}
                                label "Xóa"
                            </ListGroup.Item> */}
                {todos.map(todo => (
                  <ListGroup.Item
                    as="li"
                    key={todo.id}
                    data-testid={`todo-item-${todo.id}`}
                    className="d-flex align-items-center gap-2"
                  >
                    <Form.Check
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => toggleTodo(todo.id)}
                      data-testid={`toggle-${todo.id}`}
                    />
                    <span
                      style={{ textDecoration: todo.completed ? 'line-through' : 'none', color: todo.completed ? '#aaa' : 'inherit' }}
                    >
                      {todo.text}
                    </span>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      className="ms-auto"
                      onClick={() => deleteTodo(todo.id)}
                      data-testid={`delete-btn-${todo.id}`}
                    >
                      Xóa
                    </Button>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
