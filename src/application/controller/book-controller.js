import { BookUsecase } from '../../domain/usecase/book-usecase.js';
import { CreateBookDto } from '../dto/create-book-dto.js';
import { UpdateBookDto } from '../dto/update-book-dto.js';

export class BookController {
  /** @type {BookUsecase} */
  _bookUsecase;

  /**
   *
   * @param {BookUsecase} bookUsecase
   */
  constructor(bookUsecase) {
    this._bookUsecase = bookUsecase;
  }

  /**
   *
   * @param {import('@hapi/hapi').Request} request
   * @param {import('@hapi/hapi').ResponseToolkit} h
   * @returns {import('@hapi/hapi').ResponseObject}
   */
  create(request, h) {
    const bookRequest = new CreateBookDto({ ...request.payload });
    const result = this._bookUsecase.create(bookRequest);

    return h
      .response({
        status: 'success',
        message: 'Buku berhasil ditambahkan',
        data: {
          bookId: result.id,
        },
      })
      .code(201);
  }

  /**
   *
   * @param {import('@hapi/hapi').Request} request
   * @param {import('@hapi/hapi').ResponseToolkit} h
   * @returns {import('@hapi/hapi').ResponseObject}
   */
  find(request, h) {
    const result = this._bookUsecase.find(request.query);

    return h.response({
      status: 'success',
      data: {
        books: result,
      },
    });
  }

  /**
   *
   * @param {import('@hapi/hapi').Request} request
   * @param {import('@hapi/hapi').ResponseToolkit} h
   * @returns {import('@hapi/hapi').ResponseObject}
   */
  findById(request, h) {
    const result = this._bookUsecase.findById(request.params.bookId);
    return h.response({
      status: 'success',
      data: {
        book: result,
      },
    });
  }

  /**
   *
   * @param {import('@hapi/hapi').Request} request
   * @param {import('@hapi/hapi').ResponseToolkit} h
   * @returns {import('@hapi/hapi').ResponseObject}
   */
  update(request, h) {
    const payload = request.payload;
    const bookId = request.params.bookId;

    const updateRequest = new UpdateBookDto({ id: bookId, ...payload });
    this._bookUsecase.update(updateRequest);

    return h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    });
  }

  /**
   *
   * @param {import('@hapi/hapi').Request} request
   * @param {import('@hapi/hapi').ResponseToolkit} h
   * @returns {import('@hapi/hapi').ResponseObject}
   */
  delete(request, h) {
    const bookId = request.params.bookId;

    this._bookUsecase.delete(bookId);

    return h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
  }
}
