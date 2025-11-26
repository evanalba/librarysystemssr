/* eslint-disable no-undef */

// Active validate Copy IDs
import { initializeCopyIdValidation } from "./validate-copy-ids.mjs"; 

// CRIT: Pick :id (i.e. book id) in order to perform a POST operation.

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
                { id: "title", dbKey: "title" },
                { id: "authors", dbKey: "authors" },
                { id: "publicationYear", dbKey: "publication_year" },
                { id: "isbn", dbKey: "isbn" },
                { id: "pageCount", dbKey: "page_count" },
                { id: "imageUrl", dbKey: "image_url" },
                { id: "copies", dbKey: "total_copies" },
                { id: "desc", dbKey: "description" }
            ];

            fieldsMap.forEach(field => {
                const input = editModal.querySelector(`#${field.id}`);
                if (input && book[field.dbKey] !== undefined) {
                    input.value = book[field.dbKey];
                }
            });

            console.log(book);

            const copiesInput = document.getElementById("copies");
            const container = document.getElementById("copyIdInputsContainer");

            function generateCopyIdInputs() {
                container.innerHTML = "";

                const numCopies = parseInt(copiesInput.value);
                if (isNaN(numCopies) || numCopies <= 0) {
                    return;
                }

                let copyIdIdx = 0;
                for (let i = 1; i <= numCopies; i++) {
                    const copyDiv = document.createElement("div");
                    copyDiv.classList.add("form-floating", "mb-3");

                    const input = document.createElement("input");
                    input.type = "text";
                    input.name = `copyId[]`;
                    input.id = `copyId-${i}`;
                    input.placeholder = `Copy ID (e.g. C12345) for Copy ${i}`;
                    input.required = true;
                    input.maxLength = 6;
                    input.classList.add("form-control");
                    input.value = book.copy_ids[copyIdIdx];
                    copyIdIdx++;

                    const label = document.createElement("label");
                    label.htmlFor = `copyId-${i}`;
                    label.textContent = `Copy ID ${i}:`;

                    copyDiv.appendChild(input);
                    copyDiv.appendChild(label);
                    container.appendChild(copyDiv);
                }

            }

            copiesInput.addEventListener("input", generateCopyIdInputs);
            initializeCopyIdValidation();
            generateCopyIdInputs();

        } catch {
            alert("Could not load book data. Please try again.");
        }
    });

    
    const delModal = document.getElementById("deleteConfirmModal");
    delModal.addEventListener("show.bs.modal", async function (event) {
        const button = event.relatedTarget;
        const bookId = button.getAttribute("data-book-id");
        const form = delModal.querySelector("form");

        if (!bookId) {
            return;
        }

        form.action = `/books/delete/${bookId}`;
    });

});