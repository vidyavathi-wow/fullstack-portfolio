import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  fetchPreferences,
  updatePreferences,
} from '../redux/features/preferencesSlice';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Loader from '../components/Loader';
import toast from 'react-hot-toast';

export default function Preferences() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, loading } = useSelector((state) => state.preferences);

  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('en');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);

  useEffect(() => {
    dispatch(fetchPreferences());
  }, [dispatch]);

  useEffect(() => {
    if (data) {
      setTheme(data.theme || 'light');
      setLanguage(data.language || 'en');
      setEmailNotifications(data.notifications?.email ?? true);
      setPushNotifications(data.notifications?.push ?? false);
    }
  }, [data]);

  const handleSave = () => {
    dispatch(
      updatePreferences({
        theme,
        language,
        notifications: { email: emailNotifications, push: pushNotifications },
      })
    );
    toast.success('Preferences updated!');
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-primary flex flex-col items-center p-6">
      <div className="w-full max-w-xl bg-white p-8 rounded-2xl shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-center text-primary">
          User Preferences
        </h2>

        <div className="mb-4">
          <label className="block mb-1 font-medium text-gray-700">Theme</label>
          <Input
            as="select"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            styles="w-full"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </Input>
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium text-gray-700">
            Language
          </label>
          <Input
            as="select"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            styles="w-full"
          >
            <option value="en">English</option>
            <option value="hi">Hindi</option>
            <option value="te">Telugu</option>
          </Input>
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-medium text-gray-700">
            Notifications
          </label>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2">
              <Input
                type="checkbox"
                checked={emailNotifications}
                onChange={(e) => setEmailNotifications(e.target.checked)}
              />
              Email
            </label>
            <label className="flex items-center gap-2">
              <Input
                type="checkbox"
                checked={pushNotifications}
                onChange={(e) => setPushNotifications(e.target.checked)}
              />
              Push
            </label>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <Button onClick={handleSave} styles="w-full mt-4">
            Save Preferences
          </Button>
          <Button
            onClick={() => navigate(-1)}
            variant="danger"
            styles="w-full mt-2 bg-gray-300 text-gray-800 hover:bg-gray-400 mx"
          >
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
}
