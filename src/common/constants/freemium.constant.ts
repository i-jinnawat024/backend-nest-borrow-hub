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

export const FREEMIUM_CONTACT_MESSAGE = 'ให้ติดต่อผู้พัฒนาระบบ';
