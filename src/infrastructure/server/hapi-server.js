import { BookController } from '../../adapter/controller/book-controller.js';
import Hapi from '@hapi/hapi';

export class HapiServer {
  /** @type {import("@hapi/hapi").Server} */
  _server = null;

  /** @type {import("@hapi/hapi").ServerRoute[]} */
  _routes = [];

  /** @type {BookController} */
  _bookController = null;

  /**
   *
   * @param {BookController} bookController
   */
  constructor(bookController) {
    this._bookController = bookController;
    this._routes = [];
  }

  _router() {
    this._routes = [
      {
        method: 'POST',
        path: '/books',
        handler: this._bookController.create.bind(this._bookController),
      },
      {
        method: 'GET',
        path: '/books',
        handler: this._bookController.find.bind(this._bookController),
      },
      {
        method: 'GET',
        path: '/books/{bookId}',
        handler: this._bookController.findById.bind(this._bookController),
      },
      {
        method: 'PUT',
        path: '/books/{bookId}',
        handler: this._bookController.update.bind(this._bookController),
      },
      {
        method: 'DELETE',
        path: '/books/{bookId}',
        handler: this._bookController.delete.bind(this._bookController),
      },
    ];
  }

  async run() {
    this._router();

    this._server = Hapi.server({
      port: 9000,
      host: 'localhost',
    });

    this._server.route(this._routes);

    this._server.ext('onPreResponse', (request, h) => {
      if (request.response.isBoom) {
        return h
          .response({
            status: 'fail',
            message: request.response.output.payload.message,
          })
          .code(request.response.output.statusCode);
      }

      return h.continue;
    });

    await this._server.start();
    console.log(`server running on ${this._server.info.uri}`);
  }
}
