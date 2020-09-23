import i18next from "i18next";
import {initReactI18next} from "react-i18next";
import SignInEn from '../translations/SignIn/en.json';
import SignInPl from '../translations/SignIn/pl.json';
import SignUpEn from '../translations/SignUp/en.json';
import SignUpPl from '../translations/SignUp/pl.json';
import PermissionEn from '../translations/Permission/en.json';
import PermissionPl from '../translations/Permission/pl.json';

const resources = {
    en: {
        signin: SignInEn,
        signup: SignUpEn,
        permission: PermissionEn,
    },
    pl: {
        signin: SignInPl,
        signup: SignUpPl,
        permission: PermissionPl,
    },
};

const i18n = i18next;

i18n.use(initReactI18next)
    .init({
        resources,
        lng: 'en',
        fallbackLng: 'en',
        debug: false,
        keySeparator: false,
        interpolation: {escapeValue: false},
    });

export default i18n;
