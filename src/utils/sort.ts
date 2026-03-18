const collator = new Intl.Collator('es', { numeric: true, sensitivity: 'base' });

export const sortKeysNatural = (a: string, b: string): number => {
  return collator.compare(a, b);
};
