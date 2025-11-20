/* eslint-disable no-undef */

function isDuplicateInForm(value) {
    let isValid = true;
    let feedbackMessage = "";

    let count = 0;
    const container = document.getElementById("copyIdInputsContainer");
    const allInputs = container.querySelectorAll("input[name='copyId[]']");
    allInputs.forEach(otherInput => {
        if (otherInput.value.trim().toUpperCase() === value) {
            count++;
        }
    });

    if (count > 1) {
        isValid = false;
        feedbackMessage = "This Copy ID is duplicated in the form above.";

        return [isValid, feedbackMessage];
    }
    return [isValid, feedbackMessage];
}


function showFeedback(input, message) {
    let feedback = input.closest(".form-floating").querySelector(".invalid-feedback");
    if (!feedback) {
        feedback = document.createElement("div");
        feedback.classList.add("invalid-feedback");
        input.closest(".form-floating").appendChild(feedback);
    }
    feedback.textContent = message;
}


function removeFeedback(input) {
    let feedback = input.closest(".form-floating").querySelector(".invalid-feedback");
    if (feedback) {
        feedback.remove();
    }
}


function debounce(func, delay) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}


const checkCopyIdUniqueness = debounce(async (input, copyId) => {

    try {
        const response = await fetch(`/api/copies/exists/${copyId}`);
        
        if (!response.ok) {
            throw new Error(`Server status: ${response.status}`);
        }
        
        const data = await response.json();

        if (data.exists) {
            input.classList.remove("is-valid");
            input.classList.add("is-invalid");
            showFeedback(input, `Copy ID '${copyId}' is already in use by another book.`);
        } else {
            input.classList.remove("is-invalid");
            input.classList.add("is-valid");
            removeFeedback(input);
        }
    } catch (error) {
        console.error("Error checking copy ID uniqueness:", error);
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        showFeedback(input, "Could not verify ID. Please check connection or try again.");
    }
}, 500);

function validateCopyId(input) {
    
    let isValid = true;
    let feedbackMessage = "";
    
    const value = input.value.trim().toUpperCase();
    [isValid, feedbackMessage] = isDuplicateInForm(value);

    if (!isValid) {
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        showFeedback(input, feedbackMessage);
    } else {
        input.classList.remove("is-invalid");
        input.classList.add("is-valid");
        removeFeedback(input);

        checkCopyIdUniqueness(input, value);
    }
}

export function initializeCopyIdValidation() {

    const callback = (mutationsList) => {
        for (const mutation of mutationsList) {
            
                const input = mutation.addedNodes[0].querySelector("input[name='copyId[]']")
                if (input) {
                    input.addEventListener("input", () => {
                        validateCopyId(input);
                    });
                }
        }
    };

    const container = document.getElementById("copyIdInputsContainer");
    const config = { childList: true, subtree: true };

    const observer = new MutationObserver(callback);
    observer.observe(container, config);
}