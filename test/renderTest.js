import * as r from '../src/render.js';

const { createElement, resolveStyle, render, vnode, vsnode } = r;

const div = vnode('div');
const h1 = vnode('h1');
const button = vnode('button');
const input = vnode('input');
const p = vnode('p');

const psp = vsnode('p')(resolveStyle({ color: 'red', 'font-size': '0.75rem' }));

let state = {
  count: 0,
  text: '',
};

const setState = patch => {
  state = { ...state, ...patch };
  redraw();
};

// view should be memo
const view = state =>
  div({ className: 'app' })([
    h1({})(['Tiny functional renderer demo']),

    p({})([`Count: ${state.count}`]),

    button({
      onclick: () => setState({ count: state.count + 1 }),
    })(['+1']),

    button({
      onclick: () => setState({ count: state.count - 1 }),
      style: 'margin-left: 8px',
    })(['-1']),

    div({ style: 'margin-top: 16px' })([
      input({
        id: 'textInput',
        value: state.text,
        oninput: e => setState({ text: e.target.value }),
        placeholder: 'Type something...',
      })([]),

      button({
        onclick: (() => {
          setState({ text: '' });
          document.getElementById('textInput').value = '';
        }),
        style: 'margin-left: 8px' })(['Reset Input']),

      p({})([`You typed: ${state.text}`]),
      psp({})(['i\'m partially styled']),
      psp({ onclick: () => setState({ count: state.count + 1 }) })(['Click me']),
    ]),
  ]);


const root = document.body;
const redraw = () => render(root)(view(state));

redraw();
