import { readFile } from "fs/promises";
import path from "path";

export default async function getEmailTemplate(
  description: string,
  amount: number,
  last4Digits: string,
  locale: "en" | "es" | "it",
  name: string,
  paymentID: string
): Promise<string> {
  const safeLocale = ["en", "es", "it"].includes(locale) ? locale : "en";
  const fileTemplate = `src/templates/email-template-${safeLocale}.html`;
  const filePath = path.resolve(process.cwd(), fileTemplate);
  let template = await readFile(filePath, "utf-8");

  template = template.replace("{{description}}", description);
  template = template.replace("{{amount}}", (amount / 100).toFixed(2));
  template = template.replace("{{last4Digits}}", last4Digits);
  template = template.replace("{{name}}", name);
  template = template.replace("{{paymentID}}", paymentID);

  return template;
}
