let versionCache: string = "1.0.0";

/**
 * Validates and sets the version string.
 * Using 'typeof' is the safe way to check for primitive strings.
 */
function setCurrentVersion(v: any): string {
    if (typeof v === 'string') {
        versionCache = v;
        return v;
    } else {
        throw new Error(`[cfxjs] Invalid data type passed to setCurrentVersion. Expected string, got ${typeof v}`);
    }
}

/**
 * Returns the current library version.
 * Since you're building cfxjs, we want this to be a reliable string.
 */
export const getCurrentVersion = (): string => {
    const version = setCurrentVersion(versionCache);

    if (version) {
        return version;
    }
    return "0.0.1-alpha";
};