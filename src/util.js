const convertAccentsToHTMLEntities = (text) => {
    text = text.replace(/(\u00E1)/g, '&aacute;');
    text = text.replace(/(\u00C1)/g, '&Aacute;');

    text = text.replace(/(\u00E9)/g, '&eacute;');
    text = text.replace(/(\u00C9)/g, '&Eacute;');

    text = text.replace(/(\u00ED)/g, '&iacute;');
    text = text.replace(/(\u00CD)/g, '&Iacute;');

    text = text.replace(/(\u00F3)/g, '&oacute;');
    text = text.replace(/(\u00D3)/g, '&Oacute;');

    text = text.replace(/(\u00FA)/g, '&uacute;');
    text = text.replace(/(\u00DA)/g, '&Uacute;');

    text = text.replace(/(\u00F1)/g, '&ntilde;');
    text = text.replace(/(\u00D1)/g, '&Ntilde;');

    return text;
  };
  
export {convertAccentsToHTMLEntities};
  