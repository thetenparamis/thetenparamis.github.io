import { encode } from 'html-entities';
import { crush } from "html-crush";

const htmlPostProcessing = (html) => {
  html = generateTOC(html);
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

// Generate table of contents
const generateTOC = (html) => {
    let div = document.createElement('div');
    div.innerHTML = html;

    let menu = div.querySelector('.menu');

    if (! menu) {
        alert('No se encontró un menú donde insertar la tabla de contenidos.');
        return html;
    }
    menu.style.textAlign = 'left';
    let headers = div.querySelectorAll('h1');

    let i = 1;
    headers.forEach(header => {
        // For elements with a "name" attr, the builder places an <a> with that
        // name just above the element. Here, if we find an anchor element
        // named "ignorar*" to the left of the header, we delete it and ignore
        // the header.
        let ignore = div.querySelector('a[name^="ignorar"]');
        if (ignore && header.compareDocumentPosition(ignore) === 2) {
            ignore.remove();
        } else {
            let href = header.innerText.replaceAll(' ', '-').toLowerCase();
            let text = (i) + '. ' + header.innerHTML;
            i++;
            menu.appendChild(createAnnchorEl(href, text));
            header.setAttribute('id', href);
        }
    });

    return div.innerHTML;
}

const createAnnchorEl = (href, text) => {
    let a = document.createElement('a');
    a.href = `#${href}`;
    a.innerHTML = text;
    a.style.padding = '3px 15px';
    a.style.display = 'block';
    a.style.color = '#0068A5';
    a.style.fontSize = '14px';
    a.style.textDecoration = 'none';
    return a;
}

export { htmlPostProcessing };
