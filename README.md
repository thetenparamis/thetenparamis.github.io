# Editor de boletines
Este proyecto está basado en el proyecto [react-email-editor](https://github.com/unlayer/react-email-editor)
## Flujo de desarrollo básico

### Precondiciones

- npm version: 9.7
- node version: 16.20
- git

### Instalación local

- Clonar el proyecto localmente:
```
git clone git@github.com:thetenparamis/thetenparamis.github.io.git 
```
- Instalar los paquetes de Node.JS:
```
cd thetenparamis.github.io
nvm install 16
npm install --package-lock 
```

### Correr un servidor HTML local
Durante el desarrollo, correr el servidor HTML localmente
```
npm run start
```

### Publicar la app en GitHub Pages
Los últimos cambios (en el repo de github) se publican en https://thetenparamis.github.io/. Al correr el comando, se autoincrementa en 1 la versión menor.
```
npm run deploy
```

## Documentación
### Minificar (minify) el HTML
EmailEditor tiene la funcionalidad de [minificar](https://docs.unlayer.com/docs/export-html#minify) el HTML. Pero basado en [este articulo](https://www.emailonacid.com/blog/article/email-development/), se decidió utilizar la librería html-crush porque mantiene lineas de texto en 500 caracteres como máximo.

### Tabla de Contenidos
La tabla de contenidos es generada a partir de los &lt;h1&gt; presentes en el documento y es insertada en el componente "Menú". Asegurarse de que el componente exista en la página, de lo contrario la tabla no será generada.

Para evitar que un encabezado vaya a parar a la tabla de contenidos, darle un nombre de `ignorar*` (el editor permite darle un nombre a los elementos en "Nombre de seccion"). Como no puede haber elementos con el mismo nombre, usar `ignorar1`, `ignorar2`, etc.


## Artículos útiles

- [Deploying React apps to GitHub Pages](https://blog.logrocket.com/deploying-react-apps-github-pages/#what-is-github-pages)
- [Guía para usar Github-Pages](https://platzi.com/tutoriales/1548-react-2019/4065-guia-para-usar-github-pages-en-tus-proyectos-de-reactjs/)
- [How to install Node.js and npm on macOS](https://www.newline.co/@Adele/how-to-install-nodejs-and-npm-on-macos--22782681)
- [App's favicon and logo](https://icons8.com/icons/set/newsletter)

## ToDo
- [ ] Enlinear la clase css 'highlight'
- [x] Crear la tabla de contenido dinámicamente basado en el tag H1
- [ ] Guardar plantilla en la nube
- [ ] Al exportar el HTML, preguntar el nombre del archivo en un pop-up.
- [ ] Al descargar la plantilla, preguntar el nombre del archivo en un pop-up.
- [ ] Mostrar un alerta cuando el html supere los 100kb [(email clipping)](https://www.linkedin.com/pulse/maximize-effectiveness-through-email-file-size-mastery-m%C3%BCcahit-m%C4%B1hc%C4%B1/)
- [x] [Minify](https://www.emailonacid.com/blog/article/email-development/how-to-minify-email-html/) el html al exportarlo
- [ ] Modo oscuro: ver que se puede mejorar. [(emailonacid)](https://www.emailonacid.com/blog/article/email-development/dark-mode-for-email/)  [(litmus)](https://www.litmus.com/blog/the-ultimate-guide-to-dark-mode-for-email-marketers)