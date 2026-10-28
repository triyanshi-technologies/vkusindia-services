import { TelegramIcon, WhatsAppIcon } from "@/components/icons";
import { siteConfig } from "@/config/site";
import { getDictionary } from "@/i18n/get-dictionary";

const buttonClass =
  "inline-flex size-12 items-center justify-center rounded-full bg-secondary text-white shadow-lg transition-colors hover:bg-secondary-hover";

/** WhatsApp and Telegram shortcuts pinned to the bottom corner on every page. */
export async function FloatingChat() {
  const dict = await getDictionary();

  return (
    <aside aria-label={dict.chat.label} className="fixed right-4 bottom-4 z-30 sm:right-6 sm:bottom-6">
      <ul className="flex flex-col gap-3">
        <li>
          <a
            href={siteConfig.contact.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClass}
          >
            <WhatsAppIcon className="size-6" />
            <span className="sr-only">{dict.chat.whatsapp}</span>
          </a>
        </li>
        <li>
          <a
            href={siteConfig.contact.telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClass}
          >
            <TelegramIcon className="size-6" />
            <span className="sr-only">{dict.chat.telegram}</span>
          </a>
        </li>
      </ul>
    </aside>
  );
}
