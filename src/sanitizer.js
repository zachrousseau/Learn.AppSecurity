// sanitizer.js
module.exports = {
    sanitizeInput: (input) => {
        if (typeof input === 'string') {
            return input
                .replace(/'/g, "&#39;")       // Escape single quotes
                .replace(/;/g, '&#59;')         // Remove semicolons
                .replace(/-/g, '&#45;')        // Remove double dashes
        }
        return input; // Return as-is for non-string types
    },

    sanitizeObject: (obj) => {
        const sanitizedObj = {};
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                sanitizedObj[key] = module.exports.sanitizeInput(obj[key]);
            }
        }
        return sanitizedObj;
    }
};
