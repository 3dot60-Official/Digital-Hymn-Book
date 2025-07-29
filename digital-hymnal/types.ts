export enum Language {
  English = "en",
  Afrikaans = "af",
  Zulu = "zu",
  Xhosa = "xh",
}

export const LanguageLabels: Record<Language, string> = {
  [Language.English]: "English",
  [Language.Afrikaans]: "Afrikaans",
  [Language.Zulu]: "Zulu",
  [Language.Xhosa]: "Xhosa",
};

export enum Category {
  Praise = "Praise & Thanksgiving",
  Worship = "Worship & Consecration",
  Communion = "Communion",
  Advent = "Advent",
  Christmas = "Christmas",
  Epiphany = "Epiphany",
  LentAndCross = "Lent & Cross",
  EasterAndAscension = "Easter & Ascension",
  Pentecost = "Pentecost",
  Trinity = "Trinity",
  Life = "Christian Life",
  Guidance = "Guidance & Trust",
  Hope = "Hope & Heaven",
  Songs = "Opening & Closing",
  Special = "Special Occasions",
  Redeemer = "Redeemer",
}

export interface Hymn {
  id: number;
  number: number;
  title: { [key in Language]?: string };
  category: Category;
  lyrics: { [key in Language]?: string };
  audioUrl?: string;
  sheetMusicUrl?: string[];
  createdAt: string;
}

export interface GeneratedHymn {
    title: string;
    lyrics: string;
}

export interface Inspiration {
    inspirationalText: string;
    bibleVerse: string;
}