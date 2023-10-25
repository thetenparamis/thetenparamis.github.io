import { encode } from 'html-entities';
import { crush } from "html-crush";
import juice from "juice";

const htmlPostProcessing = (html) => {
  html = convertCustomTagsToHTMLTags(html);
  html = generateTOC(html);
  html = inlineCSSClasses(html);
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

const convertCustomTagsToHTMLTags = (html) => {
  const mapping = {
    '[resaltado#]': '<div class="highlight">',
    '[#resaltado]': '</div>'
  };

  Object.entries(mapping).forEach(entry => {
    const from = entry[0];
    const to = entry[1];
    const fromScaped = escapeRegExp(from);
    const fromRegExCaseInsensitive = new RegExp(fromScaped, "ig");
    html = html.replace(fromRegExCaseInsensitive, to);
  })

  return html;
}

const inlineCSSClasses = (html) => {
  return juice.inlineContent(html, customCss);
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
      let href = header.innerText.replaceAll(/\s/g, '-').toLowerCase();
      let text = (i) + '. ' + header.innerHTML;
      i++;
      menu.appendChild(createAnchorEl(href, text));
      header.setAttribute('id', href);
    }
  });

  return div.innerHTML;
}

const createAnchorEl = (href, text) => {
  let a = document.createElement('a');
  a.href = `#${href}`;
  a.innerHTML = text;
  console.log(a);
  a.firstElementChild && inlineChildren(a.firstElementChild);
  a.className = 'toc';
  return a;
}

/**
 * Adds `display: inline` to all children of a given node recursively
 * @param node HTMLelement
 */
const inlineChildren = (node) => {
  if (node.children.length) {
      Array.from(node.children).forEach(child => {
        inlineChildren(child);
      })
  }
  
  node.style.display = 'inline';
}

const escapeRegExp = (string) => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

const customCss = `
.highlight {
  background-color: #ee1;
  padding: .25rem;
  border-radius: 6px;
  border: 1px solid #dd0;
  display: inline-block;
}

.toc {
  padding: 3px 15px;
  display: block;
  color: #0068A5;
  font-size: 14px;
  text-decoration: none;
}`;

export { htmlPostProcessing };
