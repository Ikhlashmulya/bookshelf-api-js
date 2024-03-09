const bookService = require('../service/book-service');

const create = (request, h) => {
    const payload = request.payload;

    try {
        const result = bookService.create(payload);

        return h.response({
            status: 'success',
            message: 'Buku berhasil ditambahkan',
            data: {
                bookId: result.id,
            },
        }).code(201);
    } catch (error) {
        return h.response({
            status: 'fail',
            message: error.message,
        }).code(error.code);
    }
}

const findAll = (request, h) => {
    const result = bookService.findAll();

    return h.response({
        status: 'success',
        data: {
            books: result,
        },
    });
}

const findById = (request, h) => {
    const {bookId} = request.params;

    try {
        const result = bookService.findById(bookId);

        return h.response({
            status: 'success',
            data: {
                book: result,
            },
        });
    } catch (error) {
        return h.response({
            status: 'fail',
            message: error.message,
        }).code(error.code);
    }
}

const updateById = (request, h) => {
    const payload = request.payload;
    payload.id = request.params.bookId;

    try {
        bookService.updateById(payload);

        return h.response({
            status: 'success',
            message: 'Buku berhasil diperbarui',
        });
    } catch (error) {
        return h.response({
            status: 'fail',
            message: error.message,
        }).code(error.code);
    }
}

const deleteById = (request, h) => {
    const {bookId} = request.params;

    try {
        bookService.deleteById(bookId);

        return h.response({
            status: 'success',
            message: 'Buku berhasil dihapus',
        }).code(200);
    } catch (error) {
        return h.response({
            status: 'fail',
            message: error.message,
        }).code(error.code);
    }
}

module.exports = {
    create,
    findAll,
    findById,
    updateById,
    deleteById,
}