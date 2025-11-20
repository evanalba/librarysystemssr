/* eslint-disable no-undef */
// import { initializeEditModal } from "./book-data.js"; // ⬅️ Import the named function

document.addEventListener("DOMContentLoaded", () => {
    const copiesInput = document.getElementById("copies");
    const container = document.getElementById("copyIdInputsContainer");

    function generateCopyIdInputs() {
        container.innerHTML = ""; 
        
        const numCopies = parseInt(copiesInput.value);
        if (isNaN(numCopies) || numCopies <= 0) {
            return;
        }

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

            const label = document.createElement("label");
            label.htmlFor = `copyId-${i}`;
            label.textContent = `Copy ID ${i}:`;

            copyDiv.appendChild(input);            
            copyDiv.appendChild(label);
            container.appendChild(copyDiv);
        }
    }

    copiesInput.addEventListener("input", generateCopyIdInputs);
    // initializeEditModal();
});