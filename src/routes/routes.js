import bookController from '../controller/book-controller.js';

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: bookController.create,
  },
  {
    method: 'GET',
    path: '/books',
    handler: bookController.find,
  },
  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: bookController.findById,
  },
  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: bookController.updateById,
  },
  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: bookController.deleteById,
  },
];

export default routes;
