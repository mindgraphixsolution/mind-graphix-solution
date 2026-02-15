// Validation utilities
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const validateEmail = (email) => {
    return EMAIL_REGEX.test(email);
};
export const generateSlug = (text) => {
    return text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
};
export const formatDate = (date) => {
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};
export const truncate = (text, length = 100) => {
    return text.length > length ? text.substring(0, length) + '...' : text;
};
//# sourceMappingURL=index.js.map