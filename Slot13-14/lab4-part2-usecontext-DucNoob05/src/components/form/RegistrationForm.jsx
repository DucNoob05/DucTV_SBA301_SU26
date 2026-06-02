import { useFormContext } from '../../context/FormContext';
import { validateField } from '../../utils/validators';
import FormField from './FormField';

export default function RegistrationForm() {
  const { state, dispatch } = useFormContext();
  const { status, values } = state;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: 'VALIDATE_ALL' });

    // Validate fields synchronously based on current values
    // to check for early exit
    const errors = {
      fullName: validateField('fullName', values.fullName, values),
      email: validateField('email', values.email, values),
      password: validateField('password', values.password, values),
      confirmPassword: validateField('confirmPassword', values.confirmPassword, values),
    };

    const hasError = Object.values(errors).some((err) => err !== '');
    if (hasError) {
      return;
    }

    dispatch({ type: 'SET_STATUS', status: 'submitting' });

    setTimeout(() => {
      dispatch({ type: 'SET_STATUS', status: 'success' });
    }, 1000);
  };

  const handleReset = () => {
    dispatch({ type: 'RESET' });
  };

  if (status === 'success') {
    return (
      <div className="card shadow-lg border-0 rounded-4 p-5 text-center bg-white">
        <div className="avatar bg-success-subtle text-success rounded-circle d-inline-flex align-items-center justify-content-center mb-4 shadow-sm" style={{ width: '80px', height: '80px', fontSize: '36px' }}>
          ✓
        </div>
        <h3 className="fw-bold text-success mb-2">Đăng ký thành công!</h3>
        <p className="text-muted mb-4 fs-6 px-3">
          Tài khoản của bạn đã được khởi tạo hoàn tất trên hệ thống. Bạn có thể sử dụng tài khoản này ngay bây giờ.
        </p>
        <button
          onClick={handleReset}
          className="btn btn-primary btn-lg px-5 rounded-pill shadow-sm py-2 fw-semibold"
        >
          Đăng ký lại
        </button>
      </div>
    );
  }

  return (
    <div className="card shadow-lg border-0 rounded-4 overflow-hidden bg-white">
      <div className="card-header bg-gradient bg-primary text-white text-center py-4">
        <h2 className="mb-0 fw-bold fs-4">Đăng Ký Tài Khoản</h2>
        <p className="mb-0 text-white-50 small">Vui lòng điền đầy đủ các thông tin bên dưới</p>
      </div>

      <div className="card-body p-4">
        {status === 'error' && (
          <div className="alert alert-danger text-sm py-2 rounded-3 mb-4" role="alert">
            ⚠️ Form đăng ký có chứa thông tin không hợp lệ. Vui lòng kiểm tra lại.
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <FormField
            name="fullName"
            label="Họ và tên"
            placeholder="Nguyen Van A"
          />

          <FormField
            name="email"
            label="Email"
            type="email"
            placeholder="name@example.com"
          />

          <FormField
            name="password"
            label="Mật khẩu"
            type="password"
            placeholder="••••••••"
          />

          <FormField
            name="confirmPassword"
            label="Xác nhận mật khẩu"
            type="password"
            placeholder="••••••••"
          />

          <button
            type="submit"
            className="btn btn-primary btn-lg w-100 rounded-3 shadow-sm py-2 mt-3 fw-semibold"
            disabled={status === 'submitting'}
          >
            {status === 'submitting' ? 'Đang xử lý...' : 'Đăng ký'}
          </button>
        </form>
      </div>
    </div>
  );
}
