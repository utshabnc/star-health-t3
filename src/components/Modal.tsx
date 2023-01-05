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
  onClose,
}: {
  open: boolean;
  message: string;
  onClose: () => void;
}) {
  return (
    <>
      {open ? (
        <>
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
            <div className="relative my-6 mx-auto w-auto max-w-3xl">
              {/*content*/}
              <div className="relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none">
                {/*header*/}
                {/* <div className='flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t'>
                  <h3 className='text-3xl font-semibold'>Modal Title</h3>
                  <button
                    className='p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none'
                    onClick={() => setShowModal(false)}
                  >
                    <span className='bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none'>
                      ×
                    </span>
                  </button>
                </div> */}
                {/*body*/}
                <div className="relative flex-auto p-8">
                  <p className="text-lg font-bold leading-relaxed text-slate-500">
                    {message}
                  </p>
                </div>
                {/*footer*/}
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
