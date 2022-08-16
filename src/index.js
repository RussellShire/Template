import Model from './mvc/model.js';
import View from './mvc/view.js';
import Controller from './mvc/controller.js';

function main() {
  const m = new Model();
  const v = new View();
  const c = new Controller(m, v);

  c.renderView();

  // TESTING

  // console.log('index');

  // console.dir(m);
  //console.log(JSON.stringify(c, null, 4))
}

main();
