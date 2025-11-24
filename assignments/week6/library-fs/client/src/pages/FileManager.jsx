import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

export default function FileManager() {
  const [notifications, setNotifications] = useState([]);
  const [files, setFiles] = useState([]);
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
      if (['file.uploaded', 'file.deleted'].includes(data.type)) fetchFiles();
    });

    return () => socket.disconnect();
  }, [token, userId]);

  const fetchFiles = async () => {
    try {
      const res = await axios.get('http://localhost:4000/api/v1/files', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFiles(res.data.files);
    } catch (err) {
      toast.error(err.message)
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return toast.error('Select a file first');

    const formData = new FormData();
    formData.append('file', file);

    try {
      await axios.post('http://localhost:4000/api/v1/files', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success('File uploaded successfully!');
      setFile(null);
      fetchFiles();
    } catch (err) {
      toast.error(err.response?.data?.error || 'Upload failed');
    }
  };

  const handleDelete = async (fileId) => {
    if (!window.confirm('Are you sure you want to delete this file?')) return;

    try {
      await axios.delete(`http://localhost:4000/api/v1/files/${fileId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('File deleted successfully!');
      fetchFiles();
    } catch (err) {
      toast.error(err.response?.data?.error || 'Delete failed');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 text-gray-800 font-sans">
      <Toaster position="top-right" />
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-6 border border-teal-100">
        <h1 className="text-3xl font-semibold text-teal-600 mb-6 flex items-center gap-2">
          📂 File Manager <span className="text-gray-500 text-lg">(Real-Time)</span>
        </h1>

        {/* Upload Form */}
        <form
          onSubmit={handleUpload}
          className="flex flex-col sm:flex-row items-center gap-3 mb-6"
        >
          <input
            type="file"
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

        {/* File List */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-teal-700 mb-2">📋 Uploaded Files</h2>
          {files.length > 0 ? (
            <ul className="space-y-2">
              {files.map((f) => (
                <li
                  key={f._id}
                  className="flex justify-between items-center bg-teal-50 border border-teal-100 rounded-lg px-4 py-2 text-sm"
                >
                  <div>
                    <span className="font-medium text-gray-700">{f.originalName}</span>{' '}
                    <span className="text-gray-500">
                      ({(f.size / 1024).toFixed(1)} KB)
                    </span>
                  </div>

                  <div className="flex gap-3 items-center">
                    <button
                      onClick={async () => {
                        try {
                          const res = await axios.get(
                            `http://localhost:4000/api/v1/files/${f._id}/download-link`,
                            { headers: { Authorization: `Bearer ${token}` } }
                          );
                          window.open(res.data.link, '_blank');
                        } catch (err) {
                          toast.error('Failed to get download link');
                        }
                      }}
                      className="text-teal-600 hover:text-teal-800 font-medium"
                    >
                      Download
                    </button>

                    <button
                      onClick={() => handleDelete(f._id)}
                      className="text-red-500 hover:text-red-700 font-medium"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-sm italic">No files uploaded yet.</p>
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
            <p className="text-gray-500 text-sm italic">
              No notifications yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
