const bookController = require('../controller/book-controller');

const routes = [
    {
        method: 'POST',
        path: '/books',
        handler: bookController.create,
    },
    {
        method: 'GET',
        path: '/books',
        handler: bookController.findAll,
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

module.exports = routes;