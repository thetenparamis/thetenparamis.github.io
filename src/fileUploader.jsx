import React from 'react';
import styled from 'styled-components'; const Button = styled.button``;

const FileUploader = props => {

  const hiddenFileInput = React.useRef(null);

  const handleClick = event => {
    hiddenFileInput.current.click();
  };

  const handleChange = event => {
    event.preventDefault();
    const fileUploaded = event.target.files[0];
    props.handleFile(fileUploaded);
  };

  return (
    <>
      <Button onClick={handleClick}>
        {props.label}
      </Button>
      <input type="file" ref={hiddenFileInput} onChange={handleChange} style={{ display: 'none' }}
      />
    </>
  );
};

export default FileUploader;