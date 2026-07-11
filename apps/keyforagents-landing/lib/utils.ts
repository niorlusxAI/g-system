export function formatPrice(price: number, period: string = 'mo'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price) + (period ? '/' + period : '');
}

export function getDomainFromRequest(request: Request): string {
  const host = request.headers.get('host') || '';
  return host.split(':')[0].toLowerCase();
}

export function isValidDomain(host: string): boolean {
  const validDomains = [
    'keyforagents.com',
    'www.keyforagents.com',
    'keyforagents.technology',
    'www.keyforagents.technology',
    'notion.locker',
    'www.notion.locker',
    'localhost',
    '127.0.0.1',
  ];
  return validDomains.includes(host.toLowerCase());
}

export function getDomainConfig(host: string) {
  const domainMap: Record<string, string> = {
    'keyforagents.com': 'KEYFORAGENTS_COM',
    'www.keyforagents.com': 'KEYFORAGENTS_COM',
    'keyforagents.technology': 'KEYFORAGENTS_TECH',
    'www.keyforagents.technology': 'KEYFORAGENTS_TECH',
    'notion.locker': 'NOTION_LOCKER',
    'www.notion.locker': 'NOTION_LOCKER',
  };
  return domainMap[host.toLowerCase()] || 'KEYFORAGENTS_COM';
}

export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

export function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(' ');
}
