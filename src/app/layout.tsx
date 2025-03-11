import NoSsr from "@/utils/NoSsr";
import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import "../../src/index.scss";
import MainProvider from "./MainProvider";
import { I18nProvider } from "./i18n/i18n-context";
import { detectLanguage } from "./i18n/server";
import SessionWrapper from "@/CommonComponent/SessionWrapper";
import { authoption } from "./api/auth/[...nextauth]/authOption";
import { getServerSession } from "next-auth";
import { ToastContainer } from "react-toastify";
import "./font.css";
import "@mantine/core/styles.css";

import {
  ColorSchemeScript,
  MantineProvider,
  mantineHtmlProps,
} from "@mantine/core";

const nunito = Nunito_Sans({
  weight: ["200", "300", "400", "500", "600", "700", "800", "900", "1000"],
  style: ["italic", "normal"],
  subsets: ["latin"],
  display: "swap",
  variable: "--nunito",
});

export const metadata: Metadata = {
  title: "Vj sir classes",
};
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const lng = await detectLanguage();
  const session = await getServerSession(authoption);

  return (
    <I18nProvider language={lng}>
      <html lang="en" {...mantineHtmlProps}>
        <head>
          <link
            rel="icon"
            href="/assets/images/favicon.ico"
            type="image/x-icon"
          />
          <link
            rel="shortcut icon"
            href="/assets/images/favicon.ico"
            type="image/x-icon"
          />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin=""
          />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=League+Spartan:wght@100..900&display=swap"
            rel="stylesheet"
          />
          <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAjeJEPREBQFvAIqDSZliF0WjQrCld-Mh0"></script>
          <ColorSchemeScript />
        </head>
        <body
          suppressHydrationWarning={true}
          className={`${nunito.variable} league-spartan`}
        >
          <MantineProvider>
            <NoSsr>
              <SessionWrapper session={session}>
                <MainProvider>{children}</MainProvider>
                <ToastContainer />
              </SessionWrapper>
            </NoSsr>
          </MantineProvider>
        </body>
      </html>
    </I18nProvider>
  );
}
