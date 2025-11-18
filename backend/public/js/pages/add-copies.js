/* eslint-disable no-undef */
document.addEventListener("DOMContentLoaded", function() {
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
            copyDiv.classList.add('mb-3');

            const label = document.createElement("label");
            label.textContent = `Copy ID ${i}:`;
            label.htmlFor = `copyId-${i}`;

            const input = document.createElement("input");
            input.type = "text";
            input.name = `copyId[]`;
            input.id = `copyId-${i}`;
            input.placeholder = `Copy ID (e.g. C12345) for Copy ${i}`;
            input.required = true;
            input.maxLength = 6;
            input.classList.add("p-2", "w-100");

            copyDiv.appendChild(label);
            copyDiv.appendChild(input);            
            container.appendChild(copyDiv);
        }
    }

    copiesInput.addEventListener("input", generateCopyIdInputs);
});