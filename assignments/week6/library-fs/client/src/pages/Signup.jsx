import { useContext, useState } from 'react';
import axios from 'axios';
import AppContext from '../context/AppContext';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
export default function Signup() {
  const { baseurl } = useContext(AppContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post(`${baseurl}/auth/signup`, {
        name,
        email,
        password,
      });

      if (data.success) {
        toast.success(data.message || 'Account created successfully!');
        setName('');
        setEmail('');
        setPassword('');
      } else {
        toast.error(data.message || 'Signup failed');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-primary">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 mx-4">
        <h2 className="text-3xl font-semibold text-center mb-6 text-primary">
          Create an Account
        </h2>

        <form onSubmit={handleSignup} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-2 text-dark">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Your name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-dark">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-dark">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-primary-hover text-white py-2.5 rounded-lg transition duration-300 disabled:opacity-70"
          >
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>

        <p className="text-sm text-center mt-6 text-light">
          Already have an account?{' '}
          <Link
            href="/login"
            className="font-medium hover:underline text-primary"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
