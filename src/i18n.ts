import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

i18n.use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: 'zh', // 默认语言
        debug: false, // 生产环境关闭
        interpolation: { escapeValue: false },
        backend: {
            loadPath: '/locales/{{lng}}/common.json' // 翻译文件路径
        }
    });

export default i18n;
