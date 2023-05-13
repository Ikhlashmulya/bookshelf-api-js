const {nanoid} = require("nanoid");
const books = require("../books/books");

const addBookHandler = (request, h) => {
    const {
        name, 
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
    } = request.payload;
    const id = nanoid(16);
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;
    const finished = pageCount === readPage;

    if(name === '' || name === undefined) {
        return h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. Mohon isi nama buku',
        }).code(400);
    }

    if(readPage > pageCount) {
        return h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
        }).code(400);
    }

    const newBook = {
        name, 
        year, 
        author, 
        summary, 
        publisher, 
        pageCount, 
        readPage, 
        reading,
        id,
        insertedAt,
        updatedAt,
        finished,
    };

    books.push(newBook);

    if(books.filter((b) => b.id === id).length > 0) {
        return h.response({
            status: 'success',
            message: 'Buku berhasil ditambahkan',
            data: {
                bookId: id,
            },
        }).code(201);
    } else {
        return h.response({
            status: "error",
            message: "catatan gagal ditambahkan",
        }).code(500);
    }
};

const getAllBooksHandler = (request, h) => {
    return h.response({
        status: 'success',
        data: {
            books: books.map(obj => {
                return {id: obj.id, name: obj.name, publisher: obj.publisher};
            }),
        },
    }).code(200);
}

const getBookByIdHandler = (request, h) => {
    const {bookId} = request.params;
    const book = books.filter((b) => b.id == bookId)[0];

    if(book === undefined) {
        return h.response({
            status: 'fail',
            message: 'Buku tidak ditemukan',
        }).code(404);
    } else {
        return h.response({
            status: 'success',
            data: {
                book,
            },
        }).code(200);
    }
};

const editBookByIdHandler = (request, h) => {
    const {
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
    } = request.payload;
    const {bookId} = request.params;
    const finished = pageCount === readPage;
    const updatedAt = new Date().toISOString();

    if(name === '' || name === undefined) {
        return h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Mohon isi nama buku',
        }).code(400);
    }

    if(readPage > pageCount) {
        return h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
        }).code(400);
    }

    const index = books.findIndex((b) => b.id === bookId);

    if(index === -1) {
        return h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Id tidak ditemukan',
        }).code(404);
    } else {
        books[index] = {
            ...books[index],
            name,
            year,
            author,
            summary,
            publisher,
            pageCount,
            readPage,
            reading,
            finished,
            updatedAt,
        };

        return h.response({
            status: 'success',
            message: 'Buku berhasil diperbarui',
        }).code(200);
    }
};

const deleteBookHandler = (request, h) => {
    const {bookId} = request.params;
    const index = books.findIndex((b) => b.id === bookId);

    if(index === -1) {
        return h.response({
            status: 'fail',
            message: 'Buku gagal dihapus. Id tidak ditemukan',
        }).code(404);
    } else {
        books.splice(index, 1);
        return h.response({
            status: 'success',
            message: 'Buku berhasil dihapus',
        }).code(200);
    }
}

module.exports = {addBookHandler, getAllBooksHandler, getBookByIdHandler, editBookByIdHandler, deleteBookHandler};