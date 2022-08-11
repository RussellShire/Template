import Model from './mvc/model.js';
import View from './mvc/view.js';
import Controller from './mvc/controller.js';

function main() {
  const m = new Model();
  const v = new View();
  const c = new Controller(m, v);

  c.sayHelloFromEveryone(); // prove to ourselves the wiring all works

  // testing
  c.renderView();
}

main();
