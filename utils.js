/**
 * Capitalizes the first letter of a string.
 * @param {string} string - The string to capitalize.
 * @returns {string} The string with the first letter capitalized.
 */
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
export { capitalizeFirstLetter };

/**
 * Truncates text to a maximum length and adds ellipsis if needed.
 * @param {string} text - The text to truncate.
 * @param {number} maxLength - The maximum allowed length.
 * @returns {string} The truncated text with ellipsis if it was too long.
 */
function truncateText(text, maxLength) {
    if (text.length <= maxLength) {
        return text;
    }
    return text.slice(0, maxLength) + "...";
}
export { truncateText };

