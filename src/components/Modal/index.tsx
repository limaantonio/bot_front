import React, { useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import { AiOutlineClose } from 'react-icons/ai';

interface IActionPlate {
  id: number;
  name: string;
  image: string;
  price: string;
  description: string;
  available: boolean;
}

interface IModalProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any;
  isOpen: boolean;
  setIsOpen: () => void;
  title: string;
  submit: string;
}

const Modal: React.FC<IModalProps> = ({
  children,
  isOpen,
  setIsOpen,
  title,
  submit,
}) => {
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

          <div className="w-full flex flex-row justify-end space-x-2 border-t px-6 py-2">
            <button
              className="px-8 p-2 bg-gray-200 hover:bg-gray-300 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 rounded-md text-white"
              type="submit"
              onClick={() => setIsOpen()}
            >
              <p className="text-gray-600">Cancelar</p>
            </button>
            <button
              className="px-8 p-2 bg-blue-500 hover:bg-blue-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 rounded-md text-white"
              type="submit"
              data-testid={submit}
            >
              <p className="text">Salvar</p>
            </button>
          </div>
        </div>
      </ReactModal>
    </div>
  );
};

export default Modal;
