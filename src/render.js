//TODO: add support for event listeners and proxy props

/**
 * virtual node
 * @param {string} tag 
 * @returns {function} Function taking props and children to create vnode.
 */
const vnode = tag => props => children =>
  ({ tag, props: props || {}, children });


const vsnode = tag => style => props => children =>
  ({ tag, props: { style: style, ...props }, children });

/**
 * Creates a DOM node from a vnode.
 * @param {string | vnode} vnode 
 * @returns {HTMLElement} DOM node
 */
const createNode = vnode => {
// rendering a string (text node)
  if (typeof vnode === 'string')
    return document.createTextNode(vnode);

  const node = document.createElement(vnode.tag);

  for (const k in vnode.props)
    node[k] = vnode.props[k];

  if(typeof(vnode.children.map) !== 'function') console.error("Can't render vnode due to invalid children", vnode);

  vnode.children
    .map(createNode)
    .forEach(c => node.appendChild(c));

  return node;
};

/**
 * Renders a vnode into a root DOM element.
 * @param {HTMLElement} root 
 * @returns {function} Function taking a vnode and rendering it into root.
 * @example
 *  const div = vnode('div')
    const h1 = vnode('h1')

    render(document.body)(
        div({ className: 'app' })([
        h1({})(['Hello']),
        'Tiny renderer'
        ])
    )
 */
const render = root => vnode => {
  const active = document.activeElement;
  const snapshot = active ? {
    id: active.id,
    start: active.selectionStart,
    end: active.selectionEnd,
  } : null;

  root.replaceChildren(createNode(vnode));

  // restore focus and selection
  if (snapshot) {
    const next = document.getElementById(snapshot.id);
    if (next) {
      next.focus();
      next.setSelectionRange(snapshot.start, snapshot.end);
    }
  }
};

/**
 * Turns a style object into a CSS string.
 * @param {Object} style 
 * @returns {string} css string
 * @example resolveStyle({ color: 'red', 'font-size': '12px' }) // ' color:red; font-size:12px;'
 */
const resolveStyle = style => Object.keys(style)
  .reduce((acc, k) => `${acc} ${k}:${style[k]};`, '');

export { vnode, vsnode, createNode, render, resolveStyle };