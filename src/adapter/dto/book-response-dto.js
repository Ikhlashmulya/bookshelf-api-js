import { Book } from '../../domain/entity/book.js';

export class BookResponseDto {
  /**
   * @param {Book} book
   */
  constructor({ id, name, publisher }) {
    this.id = id;
    this.name = name;
    this.publisher = publisher;
  }
}
