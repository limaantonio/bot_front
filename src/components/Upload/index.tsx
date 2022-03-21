/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-shadow */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useCallback, useState } from 'react';
import Dropzone, { useDropzone } from 'react-dropzone';
import { FaCloudUploadAlt } from 'react-icons/fa';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function Upload({ onFileUploaded }): JSX.Element {
  const [fileNames, setFileNames] = useState([]);
  const [selectedFileURL, setSelectedFileURL] = useState('');

  const handleDrop = acceptedFiles =>
    setFileNames(acceptedFiles.map(file => file.name));

  const onDrop = useCallback(
    acceptedFiles => {
      const file = acceptedFiles[0];

      const fileUrl = URL.createObjectURL(file);
      setSelectedFileURL(fileUrl);
      onFileUploaded(file);
    },
    [onFileUploaded],
  );
  // const { getRootProps, getInputProps } = useDropzone({
  //   onDrop,
  //   accept: 'image/*',
  // });

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center justify-center border-2 border-dashed border-indigo-300 rounded-lg w-full h-18">
        <Dropzone onDrop={handleDrop}>
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps({ className: 'dropzone' })}>
              <input {...getInputProps()} />
              <div className="flex flex-col items-center ">
                <FaCloudUploadAlt className="w-10 h-10 text-blue-300" />
                <p>Selecione o arquivo</p>
              </div>
            </div>
          )}
        </Dropzone>
      </div>
      <div>
        <strong>Arquivos:</strong>
        <ul>
          {fileNames.map(fileName => (
            <li key={fileName}>{fileName}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// import './styles.css';

// interface Props{
//   onFileUploaded: (file: File) => void;
// }

// const Dropzone : React.FC<Props> = ({onFileUploaded}) => {

//   const [selectedFileURL, setSelectedFileURL] = useState('');
//   const [fileNames, setFileNames] = useState([]);

//   const onDrop = useCallback(acceptedFiles => {
//     const file = acceptedFiles[0];

//     const fileUrl = URL.createObjectURL(file);
//     setSelectedFileURL(fileUrl);
//     onFileUploaded(file);

//   }, [onFileUploaded])
//   const {getRootProps, getInputProps} = useDropzone({
//     onDrop,
//     accept: 'image/*'
//   })

//   return (
//     <div className="flex flex-row items-center justify-center h-24
// 		rounded-lg border-dashed border-2 border-blue-400" {...getRootProps()}>
//       <input {...getInputProps()} accept="image/*"/>

//       {selectedFileURL
//         ? <img className=" h-24" src={selectedFileURL} alt="Point thumbmail"/>
//         : (
//           <div className="flex flex-col items-center">
//             <FaCloudUploadAlt className="w-10 h-10"/>
//             <span className="text-center">
//               Selecione o conteúdo
//             </span>

//          </div>
//         )
//         }
//       <p>{selectedFileURL.substring}</p>
//     </div>
//   )
// }

// export default Dropzone;
