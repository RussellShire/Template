import Model from './mvc/model.js';
import View from './mvc/view.js';
import Controller from './mvc/controller.js';
import { convertSkypackImportMapToLockfile } from 'snowpack/lib/cjs/util.js';

function main() {
  const m = new Model();
  const v = new View();
  const c = new Controller(m, v);

  c.sayHelloFromEveryone(); // prove to ourselves the wiring all works

  c.renderView();

  // testing
  //console.log(m.uuidToTask)
}

main();
