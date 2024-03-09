const { nanoid } = require("nanoid");
const books = require("../data/books");
const ResponseError = require("../error/response-error");

const create = (payload) => {
    validateCreateRequest(payload);

    payload.id = nanoid(16);
    payload.insertedAt = new Date().toISOString();
    payload.updatedAt = payload.insertedAt;
    payload.finished = payload.pageCount === payload.readPage;

    const newBook = {
        ...payload,
    };

    books.push(newBook);

    if(books.filter((book) => book.id === payload.id).length > 0) {
        return newBook;
    } else {
       throw new ResponseError(500, "buku gagal ditambahkan");
    }

}

const findAll = () => {
    const listBook = books.map((book) => {
        return {
            id: book.id, 
            name: book.name, 
            publisher: book.publisher
        };
    });

    return listBook;
}

const findById = (bookId) => {
    const book = books.filter((book) => book.id == bookId)[0];

    if (!book) {
        throw new ResponseError(404, "Buku tidak ditemukan");
    }

    return book;
}

const updateById = (payload) => {
    validateUpdateRequest(payload);
    
    const finished = payload.pageCount === payload.readPage;
    const updatedAt = new Date().toISOString();

    const bookIndex = books.findIndex((book) => book.id == payload.id);

    if (bookIndex === -1) {
        throw new ResponseError(404, "Gagal memperbarui buku. Id tidak ditemukan");
    }

    books[bookIndex] = {
        ...books[bookIndex],
        ...payload,
        finished,
        updatedAt,
    };
}

const deleteById = (bookId) => {
    const bookIndex = books.findIndex((book) => book.id == bookId);

    if (bookIndex === -1) {
        throw new ResponseError(404, "Buku gagal dihapus. Id tidak ditemukan");
    }

    delete books[bookIndex];
}

const validateCreateRequest = (payload) => {
    if (!payload.name) {
        throw new ResponseError(400, "Gagal menambahkan buku. Mohon isi nama buku");
    }

    if (payload.readPage > payload.pageCount) {
        throw new ResponseError(400, "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount");
    }
}

const validateUpdateRequest = (payload) => {
    if (!payload.id) {
        throw new ResponseError(400, "Gagal memperbarui buku. Id kosong")
    }

    if (!payload.name) {
        throw new ResponseError(400, "Gagal memperbarui buku. Mohon isi nama buku");
    }

    if (payload.readPage > payload.pageCount) {
        throw new ResponseError(400, "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount");
    }
}

module.exports = {
    create,
    findAll,
    findById,
    updateById,
    deleteById,
}
