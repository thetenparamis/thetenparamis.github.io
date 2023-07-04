import { encode } from 'html-entities';

const htmlPostProcessing = (html) => {
  html = encodeHTMLEntities(html);
  return html;
}

const encodeHTMLEntities = (html) => {
  return encode(html, { mode: 'nonAsciiPrintableOnly', level: 'html4' });
};

export { htmlPostProcessing };
