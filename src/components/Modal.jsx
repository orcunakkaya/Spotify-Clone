import React from "react";

const Modal = ({ header = <></>, content = <></>, footer = <></> }) => {
  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="fixed inset-0 transition-opacity bg-gray-500/75 bg-opacityBacground"
        aria-hidden="true"
      ></div>

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex items-center justify-center min-h-full p-4 text-center sm:items-center sm:p-0">
          <div className="relative overflow-hidden text-left transition-all transform rounded-lg shadow-xl sm:my-8 sm:w-full sm:max-w-lg">
            <div className="px-4 pt-5 bg-decorativeSubdued">
                <div className="mt-3 text-center sm:mt-0 ">
                  <h3
                    className="text-base font-semibold text-gray-900"
                    id="modal-title"
                  >
                    {header}
                  </h3>
                  <div className="mt-4">
                    <div className="text-sm text-gray-500">{content}</div>
                  </div>
              </div>
            </div>
            <div className="flex flex-row-reverse px-4 py-4 bg-decorativeSubdued">
              {footer}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
