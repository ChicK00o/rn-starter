// not needed as mentioned in babel env options to include as per usage
// import 'core-js/stable'; // Loads all language features

import React from 'react';
import ReactDOM from 'react-dom';
import sum from './sum';

function Root() {
  return <h1>Hello, world.</h1>;
}

// Render the Root element into the DOM
ReactDOM.render(
  <Root />,
  document.getElementById('root'),
);

const greet = (name) => console.log(`Hello, ${name}`);
greet('Jon Snow');
console.log(sum(2, 4));
