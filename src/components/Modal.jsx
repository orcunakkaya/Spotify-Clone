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
        className="fixed inset-0 bg-gray-500/75 transition-opacity bg-opacityBacground"
        aria-hidden="true"
      ></div>

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-decorativeSubdued px-4 pt-5">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:text-left">
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
            </div>
            <div className="bg-decorativeSubdued px-4 py-4 flex flex-row-reverse">
              {footer}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
