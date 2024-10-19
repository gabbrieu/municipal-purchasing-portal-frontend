import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from './providers';
import Sidebar from './sidebar/Sidebar';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Portal de compra municipal',
  description: 'Portal de compra municipal',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <Providers>
          <Sidebar>{children}</Sidebar>
        </Providers>
      </body>
    </html>
  );
}
