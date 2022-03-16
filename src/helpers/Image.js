import React from 'react';

export const fileUpload = (file) => {

  const token = localStorage.getItem('token') || '';

  const cloudUrl = `${process.env.REACT_APP_API_URL}/productos/upload`;

  const formData = new FormData();
  // formData.append('upload_preset','react-journal');
  formData.append('file', file);

  // try {
      fetch(cloudUrl, {
          method: 'GET',
          body: formData,
          headers: {
              'x-token': token
          }
      });
      
}

const Image = ({ name }) => {
  console.log(`http://localhost:4000/upload/${name}`);
    try {
      // Import image on demand
      const image = require(`http://localhost:4000/upload/${name}`);
      // const image = require(`${process.env.REACT_APP_API_URL}/upload/${name}`);
      // console.log(image);
      
        
      // If the image doesn't exist. return null
      if (!image) return null;
      return <img src={`${image}`} style={{width: "4rem"}} alt="..."/>;
    } catch (error) {
      console.log(`Image with name "${name}" does not exist`);
      return null;
    }
  };
  
  export default Image;