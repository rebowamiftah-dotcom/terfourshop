export type Language = 'ID' | 'EN';

export type LanguageKey = Lowercase<Language>;

export function getLangKey(language: Language): LanguageKey {
  return language.toLowerCase() as LanguageKey;
}