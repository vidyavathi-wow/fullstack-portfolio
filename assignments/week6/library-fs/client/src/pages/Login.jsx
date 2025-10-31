import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../redux/features/authSlice';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);

  const handleLogin = async (e) => {
    e.preventDefault();
    const result = await dispatch(loginUser({ email, password }));
    if (loginUser.fulfilled.match(result)) navigate('/books');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-primary">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 mx-4">
        <h2 className="text-3xl font-semibold text-center mb-6 text-primary">
          Login to Your Account
        </h2>

        <form onSubmit={handleLogin} className="space-y-5">
          <Input
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
          />

          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </form>

        <p className="text-sm text-center mt-6 text-light">
          Don’t have an account?{' '}
          <Link
            to="/register"
            className="font-medium hover:underline text-primary"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
