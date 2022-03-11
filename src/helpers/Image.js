import React from 'react';

const Image = ({ name }) => {
    try {
      // Import image on demand
      const image = require(`../assets/${name}`);
        
      // If the image doesn't exist. return null
      if (!image) return null;
      return <img src={`.${image}`} style={{width: "4rem"}} alt="..."/>;
    } catch (error) {
      console.log(`Image with name "${name}" does not exist`);
      return null;
    }
  };
  
  export default Image;