// import React from 'react';
// import { UploadthingComponentProps } from '@uploadthing/react';
// import { OurFileRouter } from '../api/uploadthing/core';

// // Defina o componente InputImage como uma função que recebe as props do tipo UploadthingComponentProps<OurFileRouter>
// const InputImage: React.FC<UploadthingComponentProps<OurFileRouter>> = () => {
//     return (
//         <input
//             type='file'
//             endpoint="imageUploader"
//             onClientUploadComplete={(res) => {
//                 // Do something with the response
//                 console.log("Files: ", res);
//                 alert("Upload Completed");
//             }}
//             onUploadError={(error: Error) => {
//                 // Do something with the error.
//                 alert(`ERROR! ${error.message}`);
//             }}
//         />
//     );
// };

// export default InputImage;