function setCurrentVersion(v: any) {
    if (v instanceof String) {
        return v;
    } else {
        throw new Error("Invalid data type passed for function: (setCurrentVersion), param: v");
    }
}

export const getCurrentVersion = (): string|number => {
    const version = setCurrentVersion("1.0.0");

    if (version) {
        return version.toString();
    } else {
        return 1;
    }
};
