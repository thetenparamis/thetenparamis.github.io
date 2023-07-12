import { encode } from 'html-entities';
import { crush } from "html-crush";

const htmlPostProcessing = (html) => {
  html = encodeHTMLEntities(html);
  html = minifyHTML(html);
  return html;
}

const encodeHTMLEntities = (html) => {
  return encode(html, { mode: 'nonAsciiPrintableOnly', level: 'html4' });
};

const minifyHTML = (html) => {
  return crush(html).result;
}

export { htmlPostProcessing };
