import { AuthProvider, useAuth } from '../context/AuthContext';
import AuthNavbar from '../components/auth/AuthNavbar';
import LoginForm from '../components/auth/LoginForm';
import Dashboard from '../components/auth/Dashboard';

function PageContent() {
  const { user } = useAuth();

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <AuthNavbar />
          {user ? <Dashboard /> : <LoginForm />}
        </div>
      </div>
    </div>
  );
}

export default function Ex02LoginPage() {
  return (
    <AuthProvider>
      <PageContent />
    </AuthProvider>
  );
}
