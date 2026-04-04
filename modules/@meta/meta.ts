import { AppError } from "@exception/errors";

let versionCache: string = "1.0.0";
let authorCache: string = "Matija";

/**
 * Validates and sets the version string.
 */
function setCurrentVersion(v: string): string {
    if (typeof v === 'string') {
        versionCache = v;
        return v;
    } else {
        throw new Error(`[cfxjs] Invalid data type passed to setCurrentVersion. Expected string, got ${typeof v}`);
    }
}

/**
 * Returns the current library version.
 */
export const getCurrentVersion = (): string => {
    const version = setCurrentVersion(versionCache);

    if (version) {
        return version;
    }
    return "0.0.1-alpha";
};

/**
 * Validates and sets the author.
 */
function setCurrentAuthor(author: string): string {
    if (typeof author === 'string') {
        authorCache = author;
        return author;
    } else {
        throw new AppError(`[cfxjs] Invalid data type passed to setCurrentAuthor. Expected string, got ${typeof author}`)
    }
}

/**
 * Returns the current library author.
 */
export const getCurrentAuthor = (): string => {
    const author = setCurrentAuthor(authorCache);

    if (author) {
        return author;
    }

    return "n11kol11c";
}
