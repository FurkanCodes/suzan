import type { Metadata } from "next";
import { Inter, DM_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
const dm = DM_Sans({ subsets: ["latin"] });
import { Toaster } from "react-hot-toast";
import ModalProvider from "@/providers/modal-provider";
export const metadata: Metadata = {
  title: "Suzan",
  description: "Automate your workflows",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <html lang="en">
        <body className={dm.className}>
          {" "}
          <ModalProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
              <Toaster position="top-center" reverseOrder={false} />
              {children}
            </ThemeProvider>
          </ModalProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
