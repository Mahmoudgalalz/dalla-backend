let nanoid: any, generateOtp: any;

import('nanoid')
  .then(({ customAlphabet }) => {
    nanoid = customAlphabet(
      '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz',
    );
    generateOtp = customAlphabet('0123456789', 4);
  })
  .catch((error) => {
    console.error('Error importing nanoid:', error);
  });

const prefixes = {
  auth: 'auth',
  wallet: 'wal',
  ticket: 'tic',
  ticketPurchase: 'tic_pay',
  event: 'ev',
  ref: 'ref',
  test: 'test',
  transaction: 'tr',
} as const;

export function newId(
  prefix: keyof typeof prefixes,
  length: number = 16,
): string {
  return [prefixes[prefix], nanoid(length)].join('_');
}

export function customUUID(length: number = 16): string {
  return nanoid(length);
}

export function generateUniqueOtp(): string {
  return generateOtp();
}
