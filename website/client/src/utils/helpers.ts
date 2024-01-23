export function classNames(
  ...classes: (string | undefined | null | false)[]
): string {
  return classes.filter(Boolean).join(" ");
}

interface SizeOption {
  name: string;
  inStock: boolean;
}

export function checkModal(
  selectedSize: SizeOption | null | undefined,
  setIsSizeDialogOpen: (isOpen: boolean) => void
): void {
  if (!selectedSize) {
    setIsSizeDialogOpen(true);
  }
}
