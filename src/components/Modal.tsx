import React from 'react';

/**
 * Simple modal that can be used to display a message to the user.
 * 
 * @param open Whether the modal should be open or not
 * @param message The message to display to the user
 * @param onClose The function to call when the user closes the modal
 */
export default function Modal({
  open,
  message,
  children,
  onClose,
}: {
  open: boolean;
  message: string;
  onClose: () => void;
  children?: React.ReactNode;
}) {
  return (
    <>
      {open ? (
        <>
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
            <div className="relative my-6 mx-auto w-auto max-w-3xl">
              <div className="relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none">
                <div className="flex justify-end">
                  <button
                    className="p-2 text-red-500 hover:text-red-700 focus:outline-none"
                    onClick={onClose}
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <div className="relative flex-auto p-8 pt-0">
                  <p className="text-lg font-bold leading-relaxed text-slate-500">
                    {message}
                  </p>
                  <div>{children}</div>
                </div>
                <div className="flex justify-center rounded-b p-2">
                  <button
                    className="background-transparent mr-1 mb-1 px-6 py-2 text-sm font-bold uppercase text-red-500 outline-none transition-all duration-150 ease-linear focus:outline-none"
                    type="button"
                    onClick={onClose}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
        </>
      ) : null}
    </>
  );
}
