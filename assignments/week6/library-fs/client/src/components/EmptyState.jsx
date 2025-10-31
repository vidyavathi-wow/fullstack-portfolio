import { BookOpen } from 'lucide-react';

export default function EmptyState({
  message = 'No items found.',
  onAddClick,
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center text-gray-500 py-20">
      <BookOpen className="w-12 h-12 text-gray-400 mb-4" />
      <p className="text-lg font-medium">{message}</p>
      {onAddClick && (
        <button
          onClick={onAddClick}
          className="mt-4 bg-primary text-white px-5 py-2 rounded-lg hover:bg-primary-hover transition"
        >
          Add New
        </button>
      )}
    </div>
  );
}
