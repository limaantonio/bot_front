import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { AiOutlineCheck, AiOutlineFile } from 'react-icons/ai';
import { BsCheckCircle } from 'react-icons/bs';
import { FaCloudUploadAlt } from 'react-icons/fa';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const Upload = ({ onFileUploaded }) => {
  const [fileNames, setFileNames] = useState([]);
  const [selectedFileURL, setSelectedFileURL] = useState('');

  const onDrop = useCallback(
    acceptedFiles => {
      const file = acceptedFiles[0];

      const fileUrl = URL.createObjectURL(file);
      setSelectedFileURL(fileUrl);
      setFileNames(file.name);
      onFileUploaded(file);
    },
    [onFileUploaded],
  );
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*, .pdf',
  });

  return (
    <div>
      <div
        className="flex flex-col items-center justify-center h-20 border-2 border-dashed border-indigo-300  rounded-lg w-full h-18 "
        {...getRootProps()}
      >
        <span> Fazer upload de arquivo</span>
        <input {...getInputProps()} accept="image/*" />
        <FaCloudUploadAlt className="w-10 h-10 text-blue-300" />
      </div>
      <ul>
        {selectedFileURL ? (
          <li className="mt-4 flex flex-row items-center space-x-2">
            <AiOutlineFile className="w-8 h-8 text-gray-700" />
            <span>{fileNames}</span>
            <BsCheckCircle className="text-green-500 h-6 w-6" />
          </li>
        ) : (
          <></>
        )}
      </ul>
    </div>
  );
};

export default Upload;
