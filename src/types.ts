export enum ValidLanguageCode {
  ar = "ar",
  zh = "zh",
  cs = "cs",
  da = "da",
  nl = "nl",
  en = "en",
  fi = "fi",
  fr = "fr",
  de = "de",
  he = "he",
  id = "id",
  it = "it",
  ja = "ja",
  ko = "ko",
  pl = "pl",
  pt = "pt",
  ru = "ru",
  es = "es",
  sv = "sv",
  tr = "tr"
}

export const ValidLanguageNames: Record<ValidLanguageCode, string> = {
  ar: "Arabic",
  zh: "Chinese",
  cs: "Czech",
  da: "Danish",
  nl: "Dutch",
  en: "English",
  fi: "Finnish",
  fr: "French",
  de: "German",
  he: "Hebrew",
  id: "Indonesian",
  it: "Italian",
  ja: "Japanese",
  ko: "Korean",
  pl: "Polish",
  pt: "Portuguese",
  ru: "Russian",
  es: "Spanish",
  sv: "Swedish",
  tr: "Turkish"
}

export const ValidLanguageList = Object.keys(ValidLanguageCode).map(code => (
  {
    code,
    name: ValidLanguageNames[code as ValidLanguageCode]
  }
))