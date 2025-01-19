document.getElementById('contactForm').addEventListener('submit', async function (e) {
    e.preventDefault(); // Prevent the default form submission

    const form = e.target;
    const formData = new FormData(form);

    // Detect the current language (you can dynamically set this based on user preference)
    const currentLanguage = document.documentElement.lang || 'en'; // Default to English

    try {
        // Send the form data to Web3Forms
        const response = await fetch(form.action, {
            method: form.method,
            body: formData
        });

        const successMessage = document.getElementById('formResponse');
        if (response.ok) {
            const result = await response.json();

            // Show a success message based on the selected language
            successMessage.textContent = getLocalizedMessage('success', currentLanguage);
            successMessage.style.color = "green";
            successMessage.style.display = "block";

            // Optionally, clear the form fields
            form.reset();
        } else {
            // Handle server errors
            successMessage.textContent = getLocalizedMessage('error', currentLanguage);
            successMessage.style.color = "red";
            successMessage.style.display = "block";
        }
    } catch (error) {
        // Handle network errors
        const errorMessage = getLocalizedMessage('networkError', currentLanguage);
        document.getElementById('formResponse').textContent = errorMessage;
        document.getElementById('formResponse').style.color = "red";
        document.getElementById('formResponse').style.display = "block";
    }
});

/**
 * Retrieves a localized message based on the message type and language.
 * @param {string} messageType - The type of the message (e.g., 'success', 'error', 'networkError').
 * @param {string} language - The current language ('en', 'ar', 'de').
 * @returns {string} The localized message.
 */
function getLocalizedMessage(messageType, language) {
    const messages = {
        success: {
            en: "Thank you! Your message has been sent successfully.",
            ar: "شكراً لك! تم إرسال رسالتك بنجاح.",
            de: "Vielen Dank! Ihre Nachricht wurde erfolgreich gesendet."
        },
        error: {
            en: "Oops! Something went wrong. Please try again.",
            ar: "عذرًا! حدث خطأ ما. حاول مرة أخرى.",
            de: "Hoppla! Etwas ist schief gelaufen. Bitte versuchen Sie es erneut."
        },
        networkError: {
            en: "Network error. Please check your connection and try again.",
            ar: "خطأ في الشبكة. يرجى التحقق من الاتصال الخاص بك والمحاولة مرة أخرى.",
            de: "Netzwerkfehler. Bitte überprüfen Sie Ihre Verbindung und versuchen Sie es erneut."
        }
    };

    return messages[messageType][language] || messages[messageType].en; // Default to English
}
