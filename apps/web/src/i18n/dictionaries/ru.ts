import type { Dictionary } from "./en";

const ru = {
  metadata: {
    title: "vkusindia: бизнес-консалтинг для выхода на российский рынок",
    description:
      "Комплексная поддержка иностранных компаний в России: консалтинг, регистрация компаний, бизнес-планы, склады, выставки и контроль экспортно-импортных поставок.",
  },
  common: {
    skipToContent: "Перейти к основному содержанию",
    switchLanguage: "переключить язык на",
    homeLink: "vkusindia, главная страница",
    learnMore: "Подробнее",
    breadcrumbs: "Навигационная цепочка",
    comingSoon: "Полное содержание этой страницы скоро появится.",
  },
  nav: {
    label: "Основное меню",
    openMenu: "Открыть меню",
    closeMenu: "Закрыть меню",
    menuHint: "Не знаете, какая услуга подойдёт вашему проекту?",
    cta: "Получить консультацию",
    items: {
      home: "Главная",
      services: "Услуги",
      about: "О нас",
      contact: "Контакты",
      privacy: "Политика конфиденциальности",
    },
  },
  footer: {
    tagline:
      "Комплексная поддержка иностранных компаний при выходе на российский рынок и развитии в России.",
    servicesHeading: "Услуги",
    companyHeading: "Компания",
    contactHeading: "Контакты",
    phone: "Телефон",
    email: "Эл. почта",
    rights: "Все права защищены.",
  },
  chat: {
    label: "Напишите нам",
    whatsapp: "Написать нам в WhatsApp",
    telegram: "Написать нам в Telegram",
  },
  blocks: {
    comparisonFeature: "Критерий",
    step: "Шаг",
    versus: "или",
  },
  servicePage: {
    overview: "Обзор",
    otherServices: "Другие услуги",
    asideTitle: "Обсудим ваш проект",
    asideText: "Первая консультация бесплатна. Свяжитесь с нами удобным способом.",
  },
  contactPage: {
    methodsTitle: "Свяжитесь с нами",
    phone: "Позвоните нам",
    email: "Напишите нам",
    whatsapp: "WhatsApp",
    telegram: "Telegram",
    hours: "Часы работы",
    form: {
      title: "Отправьте заявку",
      name: "Имя и фамилия",
      email: "Эл. почта",
      phone: "Телефон",
      company: "Компания",
      service: "Интересующая услуга",
      servicePlaceholder: "Выберите услугу",
      serviceOther: "Другое / пока не знаю",
      message: "Расскажите о вашем проекте",
      consentBefore: "Я согласен на обработку персональных данных в соответствии с",
      consentLink: "политикой конфиденциальности",
      required: "обязательно",
      submit: "Отправить заявку",
      hint: "После отправки откроется почтовое приложение с заполненной заявкой.",
      subject: "Заявка с сайта",
    },
  },
  notFound: {
    title: "Страница не найдена",
    description: "Страница, которую вы ищете, не существует или была перемещена.",
    backHome: "На главную",
  },
} satisfies Dictionary;

export default ru;
