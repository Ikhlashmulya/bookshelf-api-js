import bookService from '../service/book-service.js';

const create = (request, h) => {
  const payload = request.payload;

  const result = bookService.create(payload);

  return h
    .response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: result.id,
      },
    })
    .code(201);
};

const find = (request, h) => {
  const result = bookService.find(request.query);

  return h.response({
    status: 'success',
    data: {
      books: result,
    },
  });
};

const findById = (request, h) => {
  const { bookId } = request.params;

  const result = bookService.findById(bookId);

  return h.response({
    status: 'success',
    data: {
      book: result,
    },
  });
};

const updateById = (request, h) => {
  const payload = request.payload;
  payload.id = request.params.bookId;

  bookService.updateById(payload);

  return h.response({
    status: 'success',
    message: 'Buku berhasil diperbarui',
  });
};

const deleteById = (request, h) => {
  const { bookId } = request.params;

  bookService.deleteById(bookId);

  return h
    .response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    })
    .code(200);
};

export default {
  create,
  find,
  findById,
  updateById,
  deleteById,
};
