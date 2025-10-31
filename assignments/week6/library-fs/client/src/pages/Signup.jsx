import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../redux/features/authSlice';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);

  const handleSignup = async (e) => {
    e.preventDefault();
    const userData = { name, email, password };

    const result = await dispatch(registerUser(userData));
    if (registerUser.fulfilled.match(result)) {
      setName('');
      setEmail('');
      setPassword('');
      navigate('/login');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-primary">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 mx-4">
        <h2 className="text-3xl font-semibold text-center mb-6 text-primary">
          Create an Account
        </h2>

        <form onSubmit={handleSignup} className="space-y-5">
          <Input
            label="Full Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            required
          />

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
            placeholder="Enter password"
            required
          />

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Signing up...' : 'Sign up'}
          </Button>
        </form>

        <p className="text-sm text-center mt-6 text-light">
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-medium hover:underline text-primary"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
