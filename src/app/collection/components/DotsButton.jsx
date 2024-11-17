'use client'

import React, { useState, useEffect, useRef } from "react";
import Dots from '../../../../public/assets/Dots.jsx';
import Dropdown from './Dropdown';
import Modal from "@/components/Modal";

const DotsButton = () => {
    const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
  
    useEffect(() => {
        function handleClickOutside(event) {
          if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
          }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, []);

    const toggleDropdown = () => {
        setIsOpen((prev) => !prev);
      };

      const handleSelect = (option) => {
        if (option === 'edit') {
            setShowEditModal(true);
        }else {
            setShowDeleteModal(true);
        }
        toggleDropdown();
    };
      
  return (
    <div className="relative flex">

            <button className='text-subdued hover:text-white my-auto' id="menu-button"
                onClick={toggleDropdown}
                aria-expanded={isOpen}
                aria-haspopup="true">
                <Dots width='22' height='22' />
            </button>
   

        {isOpen && (
          <div className="absolute mt-16  bg-transparent border-none border rounded shadow-md z-10" ref={dropdownRef}>
            <Dropdown handleSelect={handleSelect} />
          </div>
        )}

    {showEditModal && (
        <Modal
            title="Düzenle"
            content="Bu öğeyi düzenlemek üzeresiniz."
            onClose={() => setShowEditModal(false)}
        />
        )}

    </div>
  )
}

export default DotsButton