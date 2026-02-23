import type { Metadata } from "next";
import "./globals.css";
import { StellarProvider } from "@/components/providers/StellarProvider";

export const metadata: Metadata = {
  title: "ZK Payroll Dashboard",
  description: "A zero-knowledge payroll dashboard application.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <StellarProvider>
          {children}
        </StellarProvider>
      </body>
    </html>
  );
}
