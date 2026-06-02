import { useAuth } from '../../context/AuthContext';

export default function AuthNavbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm px-4 rounded-3 mb-4">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <span className="navbar-brand fw-bold mb-0">🔒 SecureApp</span>
        <div className="d-flex align-items-center gap-3">
          {user ? (
            <>
              <span className="text-white-50">
                Xin chào, {user.name}
              </span>
              <button 
                onClick={logout} 
                className="btn btn-outline-light btn-sm px-3 rounded-pill shadow-sm"
              >
                Đăng xuất
              </button>
            </>
          ) : (
            <span className="badge bg-secondary px-3 py-2 rounded-pill fs-7">
              Chưa đăng nhập
            </span>
          )}
        </div>
      </div>
    </nav>
  );
}
