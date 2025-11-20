/* eslint-disable no-undef */

document.addEventListener("DOMContentLoaded", function () {
    const editModal = document.getElementById("exampleModal");

    editModal.addEventListener("show.bs.modal", async function (event) {
        const button = event.relatedTarget;
        const bookId = button.getAttribute("data-book-id");
        const form = editModal.querySelector("form");

        if (!bookId) {
            return;
        }

        form.action = `/books/edit/${bookId}`;
        form.reset();

        try {
            const response = await fetch(`/api/books/${bookId}`);

            if (!response.ok) {
                throw new Error(`Failed to fetch book data. HTTP Status: ${response.status}`);
            }

            const book = await response.json();

            const fieldsMap = [
                { id: "title", dbKey: "title"},
                { id: "authors", dbKey: "authors"},
                { id: "publicationYear", dbKey: "publication_year"},
                { id: "isbn", dbKey: "isbn"},
                { id: "pageCount", dbKey: "page_count"},
                { id: "imageUrl", dbKey: "image_url"},
                { id: "copies", dbKey: "total_copies"},
                { id: "desc", dbKey: "description"}
            ];

            fieldsMap.forEach(field => {
                const input = editModal.querySelector(`#${field.id}`);
                if (input && book[field.dbKey] !== undefined) {
                    input.value = book[field.dbKey];
                }
            });

        } catch {
            alert('Could not load book data. Please try again.');
        }
    });

});