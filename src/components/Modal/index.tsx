import React, { useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import { AiOutlineClose } from 'react-icons/ai';
import { relative } from 'path';

interface IActionPlate {
  id: number;
  name: string;
  image: string;
  price: string;
  description: string;
  active: boolean;
}

interface IModalProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any;
  isOpen: boolean;
  setIsOpen: () => void;
  title: string;
  submit: string;
}

function Modal({
  children,
  isOpen,
  setIsOpen,
  title,
  submit,
}: IModalProps): JSX.Element {
  const [modalStatus, setModalStatus] = useState(isOpen);

  useEffect(() => {
    setModalStatus(isOpen);
  }, [isOpen]);

  return (
    <div>
      <ReactModal
        shouldCloseOnOverlayClick={!false}
        onRequestClose={setIsOpen}
        isOpen={modalStatus}
        ariaHideApp={false}
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            background: '#fff',
            color: '#000000',
            borderRadius: '8px',
            width: '750px',
            border: 'none',
            padding: 0,
          },
          overlay: {
            backgroundColor: '#121214e6',
          },
        }}
      >
        <div className="space-y-4">
          <div className="w-full relative  flex flex-row items-center px-6 py-4 border-b">
            <h1 className="text-xl font-bold ">{title}</h1>
            <button type="button" onClick={() => setIsOpen()}>
              <AiOutlineClose className="absolute right-6 top-5 text-gray-500 h-5 w-5" />
            </button>
          </div>

          {children}
        </div>
      </ReactModal>
    </div>
  );
}

export default Modal;
