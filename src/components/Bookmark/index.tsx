import React, { useState } from 'react';
import { TrashIcon } from '@heroicons/react/solid';
import { trpc } from "../../utils/trpc";

interface BookmarkProps {
  id: number;
  title: string;
  url: string;
  notes: string | undefined;
  createdAt: Date;
  onDelete: (id: number) => void;
}

const Bookmarks: React.FC<BookmarkProps> = ({ id, title, url, notes, createdAt, onDelete }) => {
  const [editableNotes, setEditableNotes] = useState(notes);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [editing, setEditing] = useState(false);

  const updateBookmark = trpc.db.updateBookmark.useMutation();

  const handleSave = () => {
    console.log('saving');
    console.log(editableNotes);
    updateBookmark
      .mutateAsync({
        bookmarkId: id,
        notes: editableNotes,
      })
      .then(() => {
        setEditing(false);
      })
  };

  const handleNotesChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditableNotes(event.target.value);
  };

  const handleDeleteClick = () => {
    setShowConfirmationModal(true);
  };

  const handleConfirmDelete = () => {
    onDelete(id);
    setShowConfirmationModal(false);
  };

  const handleCancelDelete = () => {
    setShowConfirmationModal(false);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-4">
      <div className="flex items-center justify-between mb-1">
        <a href={url} target="_blank" rel="noopener noreferrer" className="text-xl font-bold">
          {title}
        </a>
        <button onClick={handleDeleteClick} className="text-red-500">
          <TrashIcon className="w-6 h-6" />
        </button>
      </div>
      <h4 className="text-lg text-gray-500 mb-2">{`Bookmarked on ${createdAt.toLocaleDateString()}`}</h4>
      <h3 className="text-lg font-medium mb-2">Notes</h3>
      <textarea
        value={editableNotes}
        onChange={handleNotesChange}
        placeholder="Enter notes..."
        rows={4}
        className="w-full resize-none border rounded-md mb-4"
        disabled={!editing}
      />
      {editing ? (
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2"
          onClick={handleSave}
        >
          Save
        </button>
      ) : (
        <button
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md mt-2"
          onClick={() => setEditing(true)}
        >
          Edit
        </button>
      )}
      {showConfirmationModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-4 rounded-md">
            <p>Are you sure you want to delete this bookmark?</p>
            <div className="flex justify-end mt-4">
              <button onClick={handleCancelDelete} className="mr-2">
                Cancel
              </button>
              <button onClick={handleConfirmDelete} className="bg-red-500 text-white rounded p-2">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bookmarks;
