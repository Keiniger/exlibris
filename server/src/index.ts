import { initHttpServer } from './infraestructure/web';
import { initDatabase } from './infraestructure/db';

async function init() {
  initHttpServer();
  initDatabase();
}

init();
