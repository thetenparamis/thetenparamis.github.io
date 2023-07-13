import React, { Component, useRef } from 'react';
import ReactDOM from 'react-dom';
import styled, { createGlobalStyle } from 'styled-components';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import EmailEditor from 'react-email-editor';
import template from './template.json';
import * as util from './util';
import packageJson from '../package.json';
import FileUloader from './fileUploader';
import moment from 'moment';

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
    max-width: 160px;
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

const options = {
  features: {
    textEditor: {
      tables: true,
      emojis: false,
    },
    pageAnchors: true
  },
  appearance: {
    theme: 'light',
    panels: {
      tools: {
        dock: 'right'
      }
    }
  },
  tabs: {
    content: {
      enabled: true,
    },
    blocks: {
      enabled: true,
    },
    body: {
      enabled: true,
    }
  },
  tools: {
    heading: {
      properties: {
        textAlign: {
          value: 'right'
        },
        color: {
          value: '#F39999'
        }
      }
    },
    text: {
      properties: {
        text: {
          value: 'Texto'
        }
      }
    },
    button: {
      properties: {
        fontWeight: {
          value: 700 //700 equivale a 'Fuerte'
        },
        buttonColors: {
          value: {
            color: '#FFFFFF',
            backgroundColor: '#348eda'
          }
        },
        text: {
          value: 'Texto'
        }
      }
    },
    divider: {
      properties: {
        border: {
          value: {
            borderTopWidth: '1px',
            borderTopColor: '#EEC727'
          }
        }
      }
    },
    heading: {
      properties: {
        headingType: {
          value: 'h1',
        },
        fontSize: {
          value: '24px'
        },
        fontWeight: {
          value: 700 //700 equivale a 'Fuerte'
        },
        color: {
          value: '#666600'
        },
        text: {
          value: 'Texto'
        }
      }
    }
  }
};

class App extends Component {

  render() {
    return (
      <Router>
        <GlobalStyle />

        <Container>
          <Bar>
            <h1>Editor de Boletines v{packageJson.version}</h1>
            
            <FileUloader handleFile={file => this.loadFile(file)} label="Cargar Plantilla"/>

            <button onClick={this.saveDesign}>Descargar Plantilla</button>
            <button onClick={this.exportHtml}>Exportar HTML</button>
          </Bar>

          <EmailEditor
            ref={editor => this.editor = editor}
            onReady={this.onReady}
            locale="es-ES"
            options={options} />
        </Container>
      </Router>
    );
  }

  onReady = () => {
    this.editor.addEventListener('previewHtml', function (params, done) {
      done({
        html: util.htmlPostProcessing(params.html)
      });
    });

    this.editor.loadDesign(template);
  }

  exportHtml = () => {
    this.editor.exportHtml(data => {
      let { design, html } = data;

      html = util.htmlPostProcessing(html);

      const element = document.createElement("a");
      const file = new Blob([html], { type: 'html/plain' });
      element.href = URL.createObjectURL(file);
      element.download = "boletin_" + moment().format('YYYY-MM-DD_HH-mm-ss') + ".html";

      document.body.appendChild(element); // Required for this to work in FireFox
      element.click();
    })
  }

  loadFile = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = (e.target.result);
      this.editor.loadDesign(JSON.parse(text));
    };
    reader.readAsText(file);
  }

  saveDesign = () => {
    this.editor.saveDesign(design => {
      const element = document.createElement("a");
      const file = new Blob([JSON.stringify(design)], { type: 'json/plain' });
      element.href = URL.createObjectURL(file);
      element.download = "boletin_plantilla_" + new Date().toISOString() + ".json";
      document.body.appendChild(element); // Required for this to work in FireFox
      element.click();
    })
  }

}

ReactDOM.render(<App />, document.querySelector('#root'));
