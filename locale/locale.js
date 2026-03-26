const LocaleObject = {
    ["welcome"]: "Welcome to the NovaMP",
    ["player_joined"]: "%name% has entered the city."
};

class Locale {
    #staticTable = LocaleObject;

    constructor(customTable = {}) {
        this.table = { ...this.#staticTable, ...customTable };
    }

    set staticTableSet(table) {
        console.log("^1[NovaMP]^7 Cant change default value of table.");
    }

    translate(key) {
        if (this.table[key]) {
            return this.table[key];
        } else {
            return `Translation missing: ${key}`;
        }
    }

    format(key, vars = {}) {
        let phrase = this.table[key] || `Missing [${key}]`;

        for (const [varName, value] of Object.entries(vars)) {
            phrase = phrase.replaceAll(`%${varName}%`, value);
        }

        return phrase;
    }
}
