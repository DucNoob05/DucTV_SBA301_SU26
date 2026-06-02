import { useReducer, useState } from 'react'
import { Card, Form, Button, Alert, Modal, Container } from 'react-bootstrap'
import { listOfUser } from '../data/userData'

// ─────────────────────────────────────────────
// INITIAL STATE
// ─────────────────────────────────────────────
const initialState = {
  values: { username: '', password: '' },
  errors: {},
  touched: {},
  submitted: false,
  isSuccess: false
}

// ─────────────────────────────────────────────
// VALIDATE FUNCTION
// ─────────────────────────────────────────────
function validate(values) {
  const errors = {}
  if (!values.username || !values.username.trim()) {
    errors.username = 'Tên đăng nhập không được để trống'
  }
  if (!values.password) {
    errors.password = 'Mật khẩu không được để trống'
  } else if (values.password.length < 3) {
    errors.password = 'Mật khẩu phải tối thiểu 3 ký tự'
  }
  return errors
}

// ─────────────────────────────────────────────
// REDUCER FUNCTION
// ─────────────────────────────────────────────
function reducer(state, action) {
  switch (action.type) {
    case 'SET_FIELD': {
      const newValues = {
        ...state.values,
        [action.payload.field]: action.payload.value
      }
      return {
        ...state,
        values: newValues,
        touched: {
          ...state.touched,
          [action.payload.field]: true
        },
        errors: validate(newValues)
      }
    }
    case 'SUBMIT': {
      const errors = validate(state.values)
      const touched = { username: true, password: true }
      const isValid = Object.keys(errors).length === 0
      
      let loginError = ''
      let isSuccess = false
      let loggedInUser = null

      if (isValid) {
        // Authenticate against database
        const user = listOfUser.find(
          u => u.username.toLowerCase() === state.values.username.toLowerCase().trim() &&
               u.password === state.values.password
        )
        if (user) {
          isSuccess = true
          loggedInUser = user
        } else {
          loginError = 'Tên đăng nhập hoặc mật khẩu không chính xác'
        }
      }

      return {
        ...state,
        errors: loginError ? { ...errors, login: loginError } : errors,
        touched,
        submitted: true,
        isSuccess,
        loggedInUser
      }
    }
    case 'RESET':
      return initialState
    default:
      return state
  }
}

export default function Ex06_Login({ onLoginSuccess }) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [showModal, setShowModal] = useState(false)

  function getError(field) {
    return state.touched[field] ? state.errors[field] : undefined
  }

  function handleChange(e) {
    const { name, value } = e.target
    dispatch({ type: 'SET_FIELD', payload: { field: name, value } })
  }

  function handleSubmit(e) {
    e.preventDefault()
    dispatch({ type: 'SUBMIT' })

    // Check if reducer computed success state
    const errors = validate(state.values)
    const isValid = Object.keys(errors).length === 0
    if (isValid) {
      const user = listOfUser.find(
        u => u.username.toLowerCase() === state.values.username.toLowerCase().trim() &&
             u.password === state.values.password
      )
      if (user) {
        setShowModal(true)
      }
    }
  }

  const handleModalClose = () => {
    setShowModal(false)
    if (onLoginSuccess && state.loggedInUser) {
      onLoginSuccess(state.loggedInUser)
    } else if (onLoginSuccess) {
      // Fallback
      const user = listOfUser.find(
        u => u.username.toLowerCase() === state.values.username.toLowerCase().trim() &&
             u.password === state.values.password
      )
      onLoginSuccess(user || { username: 'admin', fullName: 'System Administrator' })
    }
  }

  return (
    <Container className="d-flex justify-content-center align-items-center login-container">
      <div className="w-100" style={{ maxWidth: '440px' }}>
        
        {/* Premium Light mode card design matching the light theme of the site */}
        <Card className="shadow-lg login-card">
          
          {/* Vibrant Top Accent line with gradient */}
          <div className="login-accent-line" />

          <Card.Body className="p-5">
            <div className="text-center mb-4">
              <h2 className="fw-bold login-title">
                Hệ Thống Đăng Nhập
              </h2>
              <p className="text-muted small mt-2">Vui lòng đăng nhập để truy cập kho bài tập</p>
            </div>

            {/* Error alerts */}
            {state.submitted && state.errors.login && (
              <Alert variant="danger" className="border-0 text-center py-2 animate-fade-in login-alert">
                ⚠️ {state.errors.login}
              </Alert>
            )}

            <Form onSubmit={handleSubmit} noValidate>
              
              {/* Username Input */}
              <Form.Group className="mb-4">
                <Form.Label className="fw-semibold text-secondary small mb-2">Tên đăng nhập</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  value={state.values.username}
                  onChange={handleChange}
                  placeholder="Nhập tên đăng nhập (vd: admin)"
                  isInvalid={!!getError('username')}
                  className="login-input"
                />
                <Form.Control.Feedback type="invalid" style={{ fontSize: '0.85rem' }}>
                  {getError('username')}
                </Form.Control.Feedback>
              </Form.Group>

              {/* Password Input */}
              <Form.Group className="mb-4">
                <Form.Label className="fw-semibold text-secondary small mb-2">Mật khẩu</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={state.values.password}
                  onChange={handleChange}
                  placeholder="Nhập mật khẩu (vd: 123456)"
                  isInvalid={!!getError('password')}
                  className="login-input"
                />
                <Form.Control.Feedback type="invalid" style={{ fontSize: '0.85rem' }}>
                  {getError('password')}
                </Form.Control.Feedback>
              </Form.Group>

              {/* Action Buttons */}
              <div className="d-grid gap-3 mt-4">
                <Button 
                  type="submit" 
                  className="py-2.5 fw-bold border-0 login-btn-submit"
                >
                  Đăng Nhập
                </Button>
                
                <Button 
                  type="button" 
                  variant="outline-secondary" 
                  onClick={() => dispatch({ type: 'RESET' })}
                  className="py-2.5 small fw-semibold login-btn-reset"
                >
                  Xóa Trống Form
                </Button>
              </div>

            </Form>
          </Card.Body>
        </Card>
      </div>

      {/* Success Redirection Modal */}
      <Modal 
        show={showModal} 
        onHide={handleModalClose}
        centered
        backdrop="static"
      >
        <Modal.Header className="border-0 bg-white text-dark pt-4 pb-0 text-center d-block">
          <div style={{
            fontSize: '4rem',
            color: '#10b981',
            lineHeight: '1',
            marginBottom: '15px'
          }}>
            🎉
          </div>
          <Modal.Title className="fw-bold h3" style={{
            color: '#059669'
          }}>
            Đăng Nhập Thành Công!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-white text-dark text-center px-4 py-3">
          <h5>Xin chào, <strong>{state.loggedInUser?.fullName || 'Người dùng'}</strong>!</h5>
          <p className="text-muted small mt-2">Hệ thống đã xác thực thành công tài khoản của bạn. Nhấn nút bên dưới để chuyển tiếp đến trang danh sách bài tập.</p>
        </Modal.Body>
        <Modal.Footer className="border-0 bg-white justify-content-center pb-4">
          <Button 
            variant="success" 
            onClick={handleModalClose}
            className="px-5 py-2.5 fw-bold"
            style={{
              borderRadius: '8px',
              background: '#10b981',
              borderColor: '#10b981',
              boxShadow: '0 4px 10px rgba(16, 185, 129, 0.3)'
            }}
          >
            Vào Trang Chủ
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  )
}
