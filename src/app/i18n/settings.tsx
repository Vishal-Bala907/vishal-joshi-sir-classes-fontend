export const fallbackLng = "en";
export const languages = [fallbackLng, "ae", "fr", "es", "du", "pt", "cn"];
export const defaultNS = "translation";

export function getOptions(ns = defaultNS) {
  return {
    supportedLngs: languages,
    fallbackLng,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
  };
}
