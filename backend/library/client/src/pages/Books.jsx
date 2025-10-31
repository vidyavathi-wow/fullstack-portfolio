import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchBooks,
  addBook,
  deleteBook,
  updateBook,
} from '../redux/features/booksSlice';
import { logout } from '../redux/features/authSlice';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import Loader from '../components/Loader';
import EmptyState from '../components/EmptyState';
import { useNavigate } from 'react-router-dom';

export default function Books() {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.books);

  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishedYear, setPublishedYear] = useState('');
  const [genre, setGenre] = useState('');
  const [editingBook, setEditingBook] = useState(null);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !author || !publishedYear || !genre) return;

    const bookData = {
      title,
      author,
      published_year: Number(publishedYear),
      genre,
    };

    if (editingBook) {
      dispatch(updateBook({ id: editingBook.id, updatedData: bookData }));
      setEditingBook(null);
    } else {
      dispatch(addBook(bookData));
    }

    setTitle('');
    setAuthor('');
    setPublishedYear('');
    setGenre('');
  };

  const handleEdit = (book) => {
    setEditingBook(book);
    setTitle(book.title);
    setAuthor(book.author);
    setPublishedYear(book.published_year);
    setGenre(book.genre);
  };

  return (
    <div className="min-h-screen bg-primary flex flex-col items-center p-6">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-semibold text-primary">My Books</h2>
          <Button
            onClick={() => navigate('/preferences')}
            variant="primary"
            className="text-sm px-4 py-2"
          >
            Preferences
          </Button>
          <Button
            onClick={() => dispatch(logout())}
            variant="danger"
            className="text-sm px-4 py-2"
          >
            Logout
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 mb-6">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Book Title"
            className="col-span-2"
          />
          <Input
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Author"
          />
          <Input
            type="number"
            value={publishedYear}
            onChange={(e) => setPublishedYear(e.target.value)}
            placeholder="Published Year"
          />
          <Input
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            placeholder="Genre"
            className="col-span-2"
          />
          <Button
            type="submit"
            variant={editingBook ? 'warning' : 'primary'}
            className="col-span-2 py-2.5"
          >
            {editingBook ? 'Update Book' : 'Add Book'}
          </Button>
        </form>

        {loading ? (
          <Loader />
        ) : items.length > 0 ? (
          <ul className="space-y-3">
            {items.map((book) => (
              <li
                key={book.id}
                className="flex justify-between items-center bg-gray-100 px-4 py-3 rounded-lg hover:shadow-md transition"
              >
                <div>
                  <p className="font-semibold text-dark">{book.title}</p>
                  <p className="text-sm text-gray-600">
                    {book.author} • {book.published_year} • {book.genre}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() => handleEdit(book)}
                    variant="warning"
                    className="text-sm px-3 py-1"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => dispatch(deleteBook(book.id))}
                    variant="danger"
                    className="text-sm px-3 py-1"
                  >
                    Delete
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
}
