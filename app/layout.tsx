import { FC, PropsWithChildren } from "react";
import { AppProps } from "next/app";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";

const App: FC<PropsWithChildren<AppProps>> = async ({ children }) => {
    const locale = await getLocale();

    // Providing all messages to the client
    // side is the easiest way to get started
    const messages = await getMessages();

    return (
        <html lang={locale}>
            <body>
                <main>
                    <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
                </main>
            </body>
        </html>
    );
};

export default App;
