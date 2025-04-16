// Dirty code, improving it would require passing identifiers to Stripe, which isn’t worth it right now. It's for tooling so its okey
export function translatePass(option: string) {
  switch (option) {
    case "Full Pass | Complete access from Friday 4th, Sunday 6th":
    case "Pase Completo | Acceso completo desde el viernes 4 al domingo 6":
    case "Pass Completo | Accesso completo da Venerdì 4 a Domenica 6":
      return "Full Pass | Complete access from Friday 4th, Sunday 6th";

    case "Friday Pass | Complete access from Friday 4th, Saturday 5th":
    case "Pase Viernes | Acceso completo desde el viernes 4 al sábado 5":
    case "Pass Venerdì | Accesso completo da Venerdì 4 a Sabato 5":
      return "Friday Pass | Complete access from Friday 4th, Saturday 5th";

    case "Saturday Pass | Complete access from Saturday 5th, Sunday 6th":
    case "Pase Sábado | Acceso completo desde el sábado 5 al domingo 6":
    case "Pass Sabato | Accesso completo da Sabato 5 a Domenica 6":
      return "Saturday Pass | Complete access from Saturday 5th, Sunday 6th";

    default:
      return "Invalid option";
  }
}
