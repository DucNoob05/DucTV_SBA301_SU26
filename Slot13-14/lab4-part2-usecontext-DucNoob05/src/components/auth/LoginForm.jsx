import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

export default function LoginForm() {
  const { login, loading, error } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      login(email, password);
    }
  };

  return (
    <div className="card shadow-sm border-0 rounded-3 p-4 bg-white">
      <h3 className="card-title text-center mb-4 fw-bold text-secondary">Đăng nhập hệ thống</h3>
      
      {error && (
        <div className="alert alert-danger text-sm py-2 rounded-2 mb-4" role="alert">
          ⚠️ {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label fw-semibold text-muted text-xs uppercase mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="form-control form-control-lg rounded-3 fs-6"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="form-label fw-semibold text-muted text-xs uppercase mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="form-control form-control-lg rounded-3 fs-6"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary btn-lg w-100 rounded-3 shadow-sm py-2 fw-semibold"
          disabled={loading}
        >
          {loading ? 'Đang xử lý...' : 'Đăng nhập'}
        </button>
      </form>
    </div>
  );
}
