export function generatePaymentID(
  length: number = 10,
  numDigits: number = 4
): string {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const digits = "0123456789";

  if (numDigits > length) {
    throw new Error(
      "Number of digits cannot be greater than the total length."
    );
  }

  const codeParts: string[] = [];

  for (let i = 0; i < numDigits; i++) {
    const randomDigit = digits[Math.floor(Math.random() * digits.length)];
    codeParts.push(randomDigit);
  }

  for (let i = 0; i < length - numDigits; i++) {
    const randomLetter = letters[Math.floor(Math.random() * letters.length)];
    codeParts.push(randomLetter);
  }

  for (let i = codeParts.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [codeParts[i], codeParts[j]] = [codeParts[j], codeParts[i]];
  }

  return codeParts.join("");
}
