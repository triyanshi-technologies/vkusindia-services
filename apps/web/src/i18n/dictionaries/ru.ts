import type { Dictionary } from "./en";

const ru = {
  metadata: {
    title: "vkusindia: бизнес-консалтинг для выхода на российский рынок",
    description:
      "Комплексная поддержка иностранных компаний в России: консалтинг, регистрация компаний, бизнес-планы, склады, выставки и контроль экспортно-импортных поставок.",
  },
  common: {
    skipToContent: "Перейти к основному содержанию",
    languageSwitcher: "Выбор языка",
  },
  home: {
    title: "vkusindia",
    underConstruction: "Сайт в разработке.",
  },
  notFound: {
    title: "Страница не найдена",
    description: "Страница, которую вы ищете, не существует или была перемещена.",
    backHome: "На главную",
  },
} satisfies Dictionary;

export default ru;
