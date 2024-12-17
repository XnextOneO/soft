import { getRequestConfig } from "next-intl/server";

import { getUserLocale } from "@/i18n/locale-detector";

export default getRequestConfig(async () => {
  const locale = await getUserLocale();

  return {
    locale,
    // eslint-disable-next-line unicorn/no-await-expression-member
    messages: (await import(`../public/locales/${locale}.json`)).default,
  };
});
