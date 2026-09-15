export function validateEmail(email) {
    const cleanEmail = email.trim().toLowerCase();

    // Strict @gmail.com policy: username portion + literal @gmail.com
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

    if (!gmailRegex.test(cleanEmail)) {
        return {
            isValid: false,
            error: "Only @gmail.com accounts are permitted to access this portal.",
        };
    }

    return { isValid: true, error: null, cleanEmail };
}
