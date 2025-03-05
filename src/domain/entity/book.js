/**
 * @type {{id: string, name: string, year: number, author: string, summary: string, publisher: string, pageCount: number, readPage: number, finished: boolean, reading: boolean, insertedAt: Date, updatedAt: Date}}
 */
export class Book {
  constructor({
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
    finished,
    insertedAt,
    updatedAt
  }) {
    this.id = id;
    this.name = name;
    this.year = year;
    this.author = author;
    this.summary = summary;
    this.publisher = publisher;
    this.pageCount = pageCount;
    this.readPage = readPage;
    this.finished = finished;
    this.reading = reading;
    this.insertedAt = insertedAt;
    this.updatedAt = updatedAt;
  }
}
