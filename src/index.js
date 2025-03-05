import { BookController } from './application/controller/book-controller.js';
import { BookValidation } from './application/validation/book-validation.js';
import { BookUsecase } from './domain/usecase/book-usecase.js';
import { InMemoryBookRepositoryImpl } from './infrastructure/repository/in-memory-book-repository-impl.js';
import { HapiServer } from './infrastructure/server/hapi-server.js';

async function main() {
  const bookRepository = new InMemoryBookRepositoryImpl();
  const bookValidation = new BookValidation();
  const bookUsecase = new BookUsecase(bookRepository, bookValidation);
  const bookController = new BookController(bookUsecase);
  const hapiServer = new HapiServer(bookController);

  await hapiServer.run();
}

main();
