# HTML Email Creator
This project is based on the [react-email-editor project](https://github.com/unlayer/react-email-editor)
## Basic workflows

### Preconditions

- npm version: 9.7
- node version: 16.20

### Local instalation

- Checkout the project:
```
git clone git@github.com:thetenparamis/thetenparamis.github.io.git 
```
- Install Node.JS packages:
```
cd thetenparamis.github.io
npm install --package-lock 
```

### Start a local html server
For local development, run a local html server as follow:
```
npm run start
```

### Publish app to GitHub Pages
Latest chages will be published on https://thetenparamis.github.io/. Commit and push all changes before running the following command
```
npm run deploy
```

## Useful articles

- [Deploying React apps to GitHub Pages](https://blog.logrocket.com/deploying-react-apps-github-pages/#what-is-github-pages)
- [Guía para usar Github-Pages](https://platzi.com/tutoriales/1548-react-2019/4065-guia-para-usar-github-pages-en-tus-proyectos-de-reactjs/)
- [How to install Node.js and npm on macOS](https://www.newline.co/@Adele/how-to-install-nodejs-and-npm-on-macos--22782681)
- [App's favicon and logo](https://icons8.com/icons/set/newsletter)

## ToDo
- [ ] Enlinear la clase css 'highlight'
- [ ] Crear la tabla de contenido dinámicamente basado en el tag H1
- [ ] Guardar plantilla en la nube
- [ ] Al exportar el HTML, preguntar el nombre del archivo en un pop-up.
- [ ] Al descargar la plantilla, preguntar el nombre del archivo en un pop-up.
- [ ] Mostrar un alerta cuando el html supere los 100kb [(email clipping)](https://www.linkedin.com/pulse/maximize-effectiveness-through-email-file-size-mastery-m%C3%BCcahit-m%C4%B1hc%C4%B1/)
- [x] [Minify](https://www.emailonacid.com/blog/article/email-development/how-to-minify-email-html/) el html al exportarlo
- [ ] Modo oscuro: ver que se puede mejorar. [(emailonacid)](https://www.emailonacid.com/blog/article/email-development/dark-mode-for-email/)  [(litmus)](https://www.litmus.com/blog/the-ultimate-guide-to-dark-mode-for-email-marketers)