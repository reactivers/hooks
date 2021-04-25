import TRLocales from "./tr-TR";
import ENLocales from "./en-US";

let AllLocales = {
    tr: { ...TRLocales },
    en: { ...ENLocales },
    "en-us": { ...ENLocales },
    "en-en": { ...ENLocales },
}

export default AllLocales
