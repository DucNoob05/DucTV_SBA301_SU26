import { useState } from 'react';
import { Row, Col, Card, Button, Badge } from 'react-bootstrap';

export default function Counter() {
  // TODO 1: Khai báo state `count` với giá trị khởi tạo là 0
  const [count, setCount] = useState(0);

  // TODO 2: Khai báo hàm `increment` — tăng count lên 1
  const increment = () => {
    setCount(prev => prev + 1);
  };

  // TODO 3: Khai báo hàm `decrement` — giảm count xuống 1, không cho phép count < 0
  const decrement = () => {
    if (count > 0) {
      setCount(prev => prev - 1);
    }
  };

  // TODO 4: Khai báo hàm `reset` — đặt count về 0
  const reset = () => {
    setCount(0);
  };

  // Badge logic
  let badgeBg = 'secondary';
  let badgeText = 'Bắt đầu';
  if (count >= 10) {
    badgeBg = 'danger';
    badgeText = 'Cao';
  } else if (count > 0) {
    badgeBg = 'success';
    badgeText = 'Đang chạy';
  }

  return (
    <Row className="justify-content-center mt-5">
      <Col xs={12} md={6} lg={4}>
        <Card className="text-center shadow-sm">
          <Card.Header as="h4" className="bg-primary text-white">
            Bộ Đếm
          </Card.Header>

          <Card.Body>
            {/* TODO 5: Hiển thị giá trị count bên trong thẻ <h1> có className="display-1 fw-bold"
                        Thêm data-testid="counter-value" vào thẻ <h1> */}
            <h1 className="display-1 fw-bold" data-testid="counter-value">
              {count}
            </h1>

            <div className="d-flex justify-content-center gap-3 mt-4">
              {/* TODO 6: Nút giảm — variant="danger", size="lg", data-testid="decrement-btn"
                          onClick gọi hàm decrement, label "−" */}
              <Button
                variant="danger"
                size="lg"
                data-testid="decrement-btn"
                onClick={decrement}
              >
                −
              </Button>

              {/* TODO 7: Nút reset — variant="secondary", size="lg", data-testid="reset-btn"
                          onClick gọi hàm reset, label "Reset" */}
              <Button
                variant="secondary"
                size="lg"
                data-testid="reset-btn"
                onClick={reset}
              >
                Reset
              </Button>

              {/* TODO 8: Nút tăng — variant="success", size="lg", data-testid="increment-btn"
                          onClick gọi hàm increment, label "+" */}
              <Button
                variant="success"
                size="lg"
                data-testid="increment-btn"
                onClick={increment}
              >
                +
              </Button>
            </div>
          </Card.Body>

          <Card.Footer>
            {/* TODO 9: Hiển thị <Badge> có data-testid="counter-status":
                        - Nếu count === 0: variant="secondary", text "Bắt đầu"
                        - Nếu count > 0: variant="success", text "Đang chạy"
                        - Nếu count >= 10: variant="danger", text "Cao" */}
            <Badge bg={badgeBg} data-testid="counter-status">
              {badgeText}
            </Badge>
          </Card.Footer>
        </Card>
      </Col>
    </Row>
  );
}

