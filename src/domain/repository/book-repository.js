import { Book } from '../entity/book.js';

export class BookRepository {
  /**
   *
   * @param {Book} book
   */
  create(book) {
    throw new Error('Method not implemented.');
  }

  /**
   *
   * @param {string} bookId
   * @returns {Book}
   */
  findById(bookId) {
    throw new Error('Method not implemented.');
  }

  /**
   * @returns {Book[]}
   */
  find(filter = {}) {
    throw new Error('Method not implemented.');
  }

  /**
   *
   * @param {Book} book
   */
  update(book) {
    throw new Error('Method not implemented.');
  }

  /**
   *
   * @param {string} bookId
   */
  delete(bookId) {
    throw new Error('Method not implemented.');
  }
}
