import { checked, email, text } from "@/lib/forms/fields";
import { handleSubmission } from "@/lib/forms/handle-submission";
import { isLocale } from "@/i18n/config";

/** Contact page form: validates the request and emails it to the company inbox. */
export async function POST(request: Request) {
  return handleSubmission(request, {
    name: "contact",

    parse(body) {
      const name = text(body.name, { max: 100, required: true });
      const address = email(body.email);
      const phone = text(body.phone, { max: 40 });
      const company = text(body.company, { max: 150 });
      const service = text(body.service, { max: 150 });
      const message = text(body.message, { max: 5000, required: true });
      const locale = body.locale;

      if (!checked(body.consent) || typeof locale !== "string" || !isLocale(locale)) return null;
      if (name === null || address === null || phone === null || company === null) return null;
      if (service === null || message === null) return null;
      return { name, email: address, phone, company, service, message, locale };
    },

    // Labels in both languages: whoever reads the inbox may prefer either.
    toEmail: (data) => ({
      subject: `New message / Новое сообщение: ${data.service || "General / Общий вопрос"}`,
      replyTo: data.email,
      fields: [
        { label: "Name / Имя", value: data.name },
        { label: "Email / Эл. почта", value: data.email },
        { label: "Phone / Телефон", value: data.phone },
        { label: "Company / Компания", value: data.company },
        { label: "Service / Услуга", value: data.service },
        { label: "Message / Сообщение", value: data.message },
        { label: "Page language / Язык страницы", value: data.locale.toUpperCase() },
      ],
    }),
  });
}
