import { Book } from '../../domain/entity/book.js';

export class BookDetailResponseDto {
  /**
   * @param {Book} book
   */
  constructor({
    id,
    name,
    year,
    author,
    finished,
    insertedAt,
    pageCount,
    publisher,
    readPage,
    summary,
    reading,
    updatedAt,
  }) {
    this.id = id;
    this.name = name;
    this.year = year;
    this.author = author;
    this.finished = finished;
    this.insertedAt = insertedAt;
    this.pageCount = pageCount;
    this.publisher = publisher;
    this.readPage = readPage;
    this.summary = summary;
    this.reading = reading;
    this.updatedAt = updatedAt;
  }
}
