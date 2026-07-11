export const DOMAINS = {
  KEYFORAGENTS_COM: 'keyforagents.com',
  KEYFORAGENTS_TECH: 'keyforagents.technology',
  NOTION_LOCKER: 'notion.locker',
} as const;

export type Domain = keyof typeof DOMAINS;