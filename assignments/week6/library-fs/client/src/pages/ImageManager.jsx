import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

export default function ImageManager() {
  const [notifications, setNotifications] = useState([]);
  const [images, setImages] = useState([]);
  const [file, setFile] = useState(null);
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');


  useEffect(() => {
    if (!token || !userId) return;

    const socket = io('http://localhost:4000', {
      transports: ['websocket'],
      auth: { token },
    });

    socket.on('connect', () => {
      console.log('✅ Connected to WebSocket');
      socket.emit('join', `user:${userId}`);
    });

    socket.on('notification', (data) => {
      console.log('📩 Notification:', data);
      setNotifications((prev) => [data, ...prev]);
      toast.success(data.message);
      if (['file.uploaded', 'file.deleted'].includes(data.type)) fetchImages();
    });

    return () => socket.disconnect();
  }, [token, userId]);


  const fetchImages = async () => {
    try {
      const res = await axios.get('http://localhost:4000/api/v1/files', {
        headers: { Authorization: `Bearer ${token}` },
      });

      // filter only images
      const imgs = res.data.files.filter((f) =>
        f.mimeType?.startsWith('image/')
      );
      setImages(imgs);
    } catch (err) {
      toast.error(err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return toast.error('Select an image first');

    const formData = new FormData();
    formData.append('file', file);

    try {
      await axios.post('http://localhost:4000/api/v1/files', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success('Image uploaded successfully!');
      setFile(null);
      fetchImages();
    } catch (err) {
      toast.error(err.response?.data?.error || 'Upload failed');
    }
  };


  const handleDelete = async (fileId) => {
    if (!window.confirm('Are you sure you want to delete this image?')) return;

    try {
      await axios.delete(`http://localhost:4000/api/v1/files/${fileId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Image deleted successfully!');
      fetchImages();
    } catch (err) {
      toast.error(err.response?.data?.error || 'Delete failed');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 text-gray-800 font-sans">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-6 border border-teal-100">
        <h1 className="text-3xl font-semibold text-teal-600 mb-6 flex items-center gap-2">
          🖼 Image Manager <span className="text-gray-500 text-lg">(Real-Time)</span>
        </h1>

        {/* Upload Form */}
        <form
          onSubmit={handleUpload}
          className="flex flex-col sm:flex-row items-center gap-3 mb-6"
        >
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full sm:w-auto flex-1 border border-teal-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
          <button
            type="submit"
            className="bg-teal-500 hover:bg-teal-600 text-white px-5 py-2 rounded-lg font-medium shadow-md transition-all"
          >
            Upload
          </button>
        </form>

        {/* Image Grid */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-teal-700 mb-2">🖼 Uploaded Images</h2>
          {images.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {images.map((img) => (
                <div
                  key={img._id}
                  className="relative group border border-teal-100 rounded-lg overflow-hidden shadow-sm"
                >
                  <img
                    src={`http://localhost:4000/${img.path}`}
                    alt={img.originalName}
                    className="w-full h-40 object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-3">
                    <button
                      onClick={async () => {
                        try {
                          const res = await axios.get(
                            `http://localhost:4000/api/v1/files/${img._id}/download-link`,
                            { headers: { Authorization: `Bearer ${token}` } }
                          );
                          window.open(res.data.link, '_blank');
                        } catch (err) {
                          toast.error('Failed to get download link');
                        }
                      }}
                      className="bg-teal-500 hover:bg-teal-600 text-white px-3 py-1 rounded"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleDelete(img._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm italic">No images uploaded yet.</p>
          )}
        </div>

        {/* Notifications */}
        <div>
          <h2 className="text-xl font-semibold text-teal-700 mb-2">🔔 Notifications</h2>
          {notifications.length > 0 ? (
            <ul className="space-y-2 max-h-64 overflow-y-auto">
              {notifications.map((n, i) => (
                <li
                  key={i}
                  className="bg-white border border-teal-100 rounded-lg shadow-sm px-4 py-2"
                >
                  <p className="text-gray-700 font-medium">{n.message}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(n.at).toLocaleTimeString()}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-sm italic">No notifications yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
