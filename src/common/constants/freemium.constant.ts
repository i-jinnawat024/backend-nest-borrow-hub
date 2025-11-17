const toNumber = (value: string | undefined, fallback: number): number => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

export const FREEMIUM_LIMITS = {
  MAX_USERS: toNumber(process.env.FREEMIUM_MAX_USERS, 20),
  MAX_MONTHLY_BORROW_TRANSACTIONS: toNumber(
    process.env.FREEMIUM_MAX_MONTHLY_BORROW_TRANSACTIONS,
    1000,
  ),
  MAX_DOCUMENT_RECORDS: toNumber(
    process.env.FREEMIUM_MAX_DOCUMENT_RECORDS,
    8000,
  ),
} as const;

export const FREEMIUM_CONTACT_MESSAGE =
  '\u0E43\u0E2B\u0E49\u0E15\u0E34\u0E14\u0E15\u0E48\u0E2D\u0E1C\u0E39\u0E49\u0E1E\u0E31\u0E12\u0E19\u0E32\u0E23\u0E30\u0E1A\u0E1A';

