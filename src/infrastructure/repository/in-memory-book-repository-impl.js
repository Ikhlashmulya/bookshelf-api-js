import { notFound } from '@hapi/boom';
import { Book } from '../../domain/entity/book.js';
import { BookRepository } from '../../domain/interface/book-repository.js';

export class InMemoryBookRepositoryImpl extends BookRepository {
  /** @type {Book[]} */
  _books;

  constructor() {
    super();

    this._books = [];
  }

  /**
   * @param {Book} book
   */
  create(book) {
    this._books.push(book);
  }

  /**
   * @param {string} bookId
   * @returns {Book}
   */
  findById(bookId) {
    const book = this._books.filter((book) => book.id == bookId)[0];

    if (!book) {
      throw notFound('Buku tidak ditemukan');
    }

    return book;
  }

  /**
   *
   * @returns {Book[]}
   */
  find(filter = {}) {
    return this._books.filter((book) => {
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
    });
  }

  /**
   * @param {Book} book
   */
  update(book) {
    const bookIndex = this._books.findIndex((item) => item.id === book.id);

    if (bookIndex === -1) {
      throw notFound('Gagal memperbarui buku. Id tidak ditemukan');
    }

    const existingBook = this._books[bookIndex];

    this._books[bookIndex] = {
      ...this._books[bookIndex],
      ...book,
      insertedAt: existingBook.insertedAt,
    };
  }

  /**
   * @param {string} bookId
   */
  delete(bookId) {
    const bookIndex = this._books.findIndex((book) => book.id == bookId);

    if (bookIndex === -1) {
      throw notFound('Buku gagal dihapus. Id tidak ditemukan');
    }

    this._books.splice(bookIndex, 1);
  }
}
