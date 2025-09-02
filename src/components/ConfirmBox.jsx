import React, { useState } from 'react'

export const ConfirmBox = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleConfirm = () => {
    console.log("✅ Confirmed!");
    setIsOpen(false);
  };

  const handleCancel = () => {
    console.log("❌ Cancelled!");
    setIsOpen(false);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      {/* Trigger button */}
      {/* <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
      >
        Delete Item
      </button> */}

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-96">
            <h2 className="text-lg font-semibold mb-2">Are you sure?</h2>
            <p className="text-gray-600 mb-4">
              This action cannot be undone. Do you really want to delete this
              item?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={handleCancel}
                className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
