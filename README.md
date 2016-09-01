# hype.js
> Minimalist hyperscript implementation. 

`hype.js` is a minimalist Hyperscript implementation based on [Hyperscript](https://github.com/dominictarr/hyperscript) by [Dominic Tarr](https://github.com/dominictarr).
It is not intended for use in production but rahter a test case for ES2015/ES6. I was especially interested in the use of [`...args`](https://github.com/kevingimbel/hype.js/blob/10222b630a5c0055bce44736c375fdcc9d147b0b/src/hype.js#L50) which I find quite enjoyable so far. 

You can try it on [CodePen](http://codepen.io/kevingimbel/pen/QKWNyk/)

### USAGE

Here's a basic example of how to use `hype.js` to create a div with text inside.

```js
const h = new Hype();
const content = [];

content.push(
  h.hy('div', {class: 'my-css-class'}, [
    h.hy('p', {style: 'font-size: .75rem'}, 'Hello World!')
  ])
);
// Append the new Nodes.
h.append(content, document.body);
```

These lines result in the following markup.
```html
<div class="my-css-class" is-hy="true">
  <p style="font-size: .75rem" is-hy="true">Hello World!</p>
</div>
```

Furthermore, there is a `createTags` function which takes an array of strings and returns a `Hype` instance for each of these.

```js
const h = new Hype();
const content = [];
const tags = ['div', 'p', 'ul', 'li'];
// Create the "tags"
h.createTags(tags); 
// Now each tag is a function.

content.push(
  div('Hello World!', [
    ul('Todo:', [
      li('Create README.md'),
      li('Add examples'),
      li('Document functions')
    ])
  ])
);
h.append(content, document.body);
```

Output: 
```html
<div is-hy="true">
  Hello World!
  <ul is-hy="true">
  Todo:
    <li is-hy="true">Create README.md</li>
    <li is-hy="true">Add examples</li>
    <li is-hy="true">Document functions</li>
  </ul>
</div>
```

### API
#### `Hype`
`Hype` is the exposed constructor. Invoke it like `const my_var = new Hype()` to create a Hype instance. It takes no arguments.

#### `Hype.typeOf(target, desired)` [code](https://github.com/kevingimbel/hype.js/blob/10222b630a5c0055bce44736c375fdcc9d147b0b/src/hype.js#L15-L18)
An internal `typeof` alternative to check types more relyable. Can be used from outside yet it is not recommended!

#### `Hype.createTags(array)` [code](https://github.com/kevingimbel/hype.js/blob/10222b630a5c0055bce44736c375fdcc9d147b0b/src/hype.js#L38-L48)
Takes an array of strings and creates a Hype instance and function for each of them. This way you can use `div()` instead of `h.hy('div')`.

#### `Hype.hy(tagName, [attributes] [text])` [code](https://github.com/kevingimbel/hype.js/blob/10222b630a5c0055bce44736c375fdcc9d147b0b/src/hype.js#L50-L111)
`Hype.hy` is the main function which creates the actual DOM elements. It takes a `tagName` as first parameter which represents the Node Name.
For example `Hype.hy('div')` creates a div element. The other optional arguments are `attributes` and `text`. `attributes` is an object representing the Node Attributes you want to set (`style` for example), `text` is simply a string added as `textContent` to the new node.

Example `div` Node:
```js
const h = new Hype();
h.hy('div', {
  'data-thing': 'value',
  style: 'color: red;',
  'tabindex': 0,
  'aria-labelledby': 'spec'
}, 'Hello World!');
```
Output: 
```html
<div data-thing="value" style="color: red;" tabindex="0" aria-labelledby="spec" is-hy="true">Hello World!</div>
```
