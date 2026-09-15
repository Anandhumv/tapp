// Common typo domains to block
const TYPO_DOMAINS = [
    "gmali.com",
    "gamil.com",
    "gmai.com",
    "gmaill.com",
    "gmil.com",
    "yaho.com",
    "hotmial.com",
    "outlok.com",
];

export function validateEmail(email) {
    const cleanEmail = email.trim().toLowerCase();

    // Standard email format validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(cleanEmail)) {
        return {
            isValid: false,
            error: "Please enter a valid email address.",
        };
    }

    // Extract domain
    const domain = cleanEmail.split("@")[1];

    // Check for common typo domains
    if (TYPO_DOMAINS.includes(domain)) {
        return {
            isValid: false,
            error: `Invalid email domain "@${domain}". Did you mean "@gmail.com"?`,
        };
    }

    return { isValid: true, error: null, cleanEmail };
}