import React from 'react'
import Image from 'next/image';

const Modal = ({ header=<></>, content=<></>, footer=<></> }) => {
  return (
    <div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
  
  <div class="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>

  <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
    <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
  
      <div class="relative transform overflow-hidden rounded-lg text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
        <div class="bg-decorativeSubdued px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
          <div class="sm:flex sm:items-start">
            
            <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
              <h3 class="text-base font-semibold text-gray-900" id="modal-title">
                    {header}
              </h3>
              <div class="mt-2">
                <p class="text-sm text-gray-500">
                    {content}
                </p>
              </div>
            </div>
            <button className='hover:bg-tintedBase grid place-items-center rounded-full p-1.5'>
                <Image 
                    src="/assets/close.svg"
                    alt="Close"
                    width={16}
                    height={16}
                />
            </button>
          </div>
        </div>
        <div class="bg-decorativeSubdued px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            {
                footer
            }
        </div>
      </div>
    </div>
  </div>
</div>
  )
}

export default Modal