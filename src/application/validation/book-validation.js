import { badRequest } from '@hapi/boom';
import { CreateBookDto } from '../dto/create-book-dto.js';
import { UpdateBookDto } from '../dto/update-book-dto.js';

export class BookValidation {
  /**
   *
   * @param {CreateBookDto} createBookDto
   */
  validateCreateRequest(createBookDto) {
    if (!createBookDto.name) {
      throw badRequest('Gagal menambahkan buku. Mohon isi nama buku');
    }

    if (createBookDto.readPage > createBookDto.pageCount) {
      throw badRequest(
        'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
      );
    }
  }

  /**
   *
   * @param {UpdateBookDto} updateBookDto
   */
  validateUpdateRequest(updateBookDto) {
    if (!updateBookDto.id) {
      throw badRequest('Gagal memperbarui buku. Id kosong');
    }

    if (!updateBookDto.name) {
      throw badRequest('Gagal memperbarui buku. Mohon isi nama buku');
    }

    if (updateBookDto.readPage > updateBookDto.pageCount) {
      throw badRequest(
        'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'
      );
    }
  }
}
