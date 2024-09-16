import { nanoid } from 'nanoid';
import books from '../data/books.js';
import { badRequest, internal, notFound } from '@hapi/boom';

const create = (payload) => {
  validateCreateRequest(payload);

  payload.id = nanoid(16);
  payload.insertedAt = new Date().toISOString();
  payload.updatedAt = payload.insertedAt;
  payload.finished = payload.pageCount === payload.readPage;

  const newBook = {
    ...payload,
  };

  books.push(newBook);

  if (books.filter((book) => book.id === payload.id).length > 0) {
    return newBook;
  } else {
    throw internal('buku gagal ditambahkan');
  }
};

const find = (filter = {}) => {
  return books
    .filter((book) => {
      if (
        filter.name &&
        !book.name.toLowerCase().includes(filter.name.toLowerCase())
      ) {
        return false;
      }

      if (filter.reading && book.reading != filter.reading) {
        return false;
      }

      if (filter.finished && book.finished != filter.finished) {
        return false;
      }

      return true;
    })
    .map((book) => ({
      id: book.id,
      name: book.name,
      publisher: book.publisher,
    }));
};

const findById = (bookId) => {
  const book = books.filter((book) => book.id == bookId)[0];

  if (!book) {
    throw notFound('Buku tidak ditemukan');
  }

  return book;
};

const updateById = (payload) => {
  validateUpdateRequest(payload);

  const finished = payload.pageCount === payload.readPage;
  const updatedAt = new Date().toISOString();

  const bookIndex = books.findIndex((book) => book.id == payload.id);

  if (bookIndex === -1) {
    throw notFound('Gagal memperbarui buku. Id tidak ditemukan');
  }

  books[bookIndex] = {
    ...books[bookIndex],
    ...payload,
    finished,
    updatedAt,
  };
};

const deleteById = (bookId) => {
  const bookIndex = books.findIndex((book) => book.id == bookId);

  if (bookIndex === -1) {
    throw notFound('Buku gagal dihapus. Id tidak ditemukan');
  }

  books.splice(bookIndex, 1);
};

const validateCreateRequest = (payload) => {
  if (!payload.name) {
    throw badRequest('Gagal menambahkan buku. Mohon isi nama buku');
  }

  if (payload.readPage > payload.pageCount) {
    throw badRequest(
      'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
    );
  }
};

const validateUpdateRequest = (payload) => {
  if (!payload.id) {
    throw badRequest('Gagal memperbarui buku. Id kosong');
  }

  if (!payload.name) {
    throw badRequest('Gagal memperbarui buku. Mohon isi nama buku');
  }

  if (payload.readPage > payload.pageCount) {
    throw badRequest(
      'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'
    );
  }
};

export default {
  create,
  find,
  findById,
  updateById,
  deleteById,
};
