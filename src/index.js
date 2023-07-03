import React, { Component, useRef } from 'react';
import ReactDOM from 'react-dom';
import styled, { createGlobalStyle } from 'styled-components';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import EmailEditor from 'react-email-editor'
import template from './template.json';

const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
    height: 100%;
    font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
  }

  #root {
    height: 100%;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;
`;

const Bar = styled.div`
  flex: 1;
  background-color: #61dafb;
  color: #000;
  padding: 10px;
  display: flex;
  max-height: 40px;
  h1 {
    flex: 1;
    font-size: 16px;
    text-align: left;
  }
  button {
    flex: 1;
    padding: 10px;
    margin-left: 10px;
    font-size: 14px;
    font-weight: bold;
    background-color: #000;
    color: #fff;
    border: 0px;
    max-width: 150px;
    cursor: pointer;
  }
  a {
    flex: 1;
    padding: 10px;
    margin-left: 10px;
    font-size: 14px;
    font-weight: bold;
    color: #fff;
    border: 0px;
    cursor: pointer;
    text-align: right;
    text-decoration: none;
    line-height: 160%;
  }
`;

class App extends Component {

  render() {
    return (
      <Router>
        <GlobalStyle />

        <Container>
          <Bar>
            <h1>HTML Email Creator</h1>

            <label htmlFor="load">Cargar Plantilla: </label>
            <input type="file" onChange={(e) => this.loadFile(e)} name="load" id="load"/>
            
            <button onClick={this.saveDesign}>Descargar Plantilla</button>
            <button onClick={this.exportHtml}>Exportar HTML</button>
          </Bar>

          <EmailEditor ref={editor => this.editor = editor} onLoad={this.onLoad} locale="es-ES"/>
        </Container>
      </Router>
    );
  }

  onLoad = () => {
    this.editor.loadDesign(template)
  }

  exportHtml = () => {
    this.editor.exportHtml(data => {
      const { design, html } = data
      const element = document.createElement("a");
      const file = new Blob([html], {type: 'html/plain'});
      element.href = URL.createObjectURL(file);
      element.download = "boletin_" + new Date().toISOString() + ".html";
      document.body.appendChild(element); // Required for this to work in FireFox
      element.click();
    })
  }

  loadFile = async (e) => {
    e.preventDefault()
    const reader = new FileReader()
    reader.onload = async (e) => { 
      const text = (e.target.result)
      this.editor.loadDesign(JSON.parse(text));
    };
    reader.readAsText(e.target.files[0])
  }

  saveDesign = () => {
    this.editor.saveDesign(design => {
      const element = document.createElement("a");
      const file = new Blob([JSON.stringify(design)], {type: 'json/plain'});
      element.href = URL.createObjectURL(file);
      element.download = "boletin_design_" + new Date().toISOString() + ".json";
      document.body.appendChild(element); // Required for this to work in FireFox
      element.click();
    })
  }

}

ReactDOM.render(<App />, document.querySelector('#root'));
