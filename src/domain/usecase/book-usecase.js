import { nanoid } from 'nanoid';
import { BookDetailResponseDto } from '../../application/dto/book-detail-response-dto.js';
import { BookResponseDto } from '../../application/dto/book-response-dto.js';
import { CreateBookDto } from '../../application/dto/create-book-dto.js';
import { UpdateBookDto } from '../../application/dto/update-book-dto.js';
import { BookValidation } from '../../application/validation/book-validation.js';
import { Book } from '../entity/book.js';
import { BookRepository } from '../interface/book-repository.js';

export class BookUsecase {
  /** @type {BookRepository} */
  _bookRepository;

  /** @type {BookValidation} */
  _bookValidation;

  /**
   *
   * @param {BookRepository} bookRepository
   * @param {BookValidation} bookValidation
   */
  constructor(bookRepository, bookValidation) {
    this._bookRepository = bookRepository;
    this._bookValidation = bookValidation;
  }

  /**
   *
   * @param {CreateBookDto} createBookDto
   * @returns {BookDetailResponseDto}
   */
  create(createBookDto) {
    this._bookValidation.validateCreateRequest(createBookDto);

    const book = new Book({
      ...createBookDto,
    });

    book.id = nanoid(16);
    book.finished = book.pageCount === book.readPage;
    book.insertedAt = new Date().toISOString();
    book.updatedAt = new Date().toISOString();

    this._bookRepository.create(book);

    return new BookDetailResponseDto(book);
  }

  find(filter = {}) {
    const books = this._bookRepository.find(filter);

    return books.map((book) => new BookResponseDto(book));
  }

  /**
   *
   * @param {string} bookId
   * @returns {BookDetailResponseDto}
   */
  findById(bookId) {
    const book = this._bookRepository.findById(bookId);

    return new BookDetailResponseDto(book);
  }

  /**
   *
   * @param {UpdateBookDto} updateBookDto
   */
  update(updateBookDto) {
    this._bookValidation.validateUpdateRequest(updateBookDto);

    const book = new Book({
      ...updateBookDto,
    });

    book.finished = book.pageCount === book.readPage;
    book.updatedAt = new Date().toISOString();

    this._bookRepository.update(book);
  }

  /**
   *
   * @param {string} bookId
   */
  delete(bookId) {
    this._bookRepository.delete(bookId);
  }
}
