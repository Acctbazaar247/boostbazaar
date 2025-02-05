import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import Providers from '@/components/shared/provider';
import { config } from '@/config';
import OnDevelopment from '@/components/OnDevelopment/OnDevelopment';
const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
  style: ['normal'],
});

export const metadata: Metadata = {
  title: 'Acctpanel',
  description:
    'Get your Brands Pictures, Videos buzzing with Followers, Likes, Views, etc without breaking a sweat.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        />
        <link rel="icon" href={'/favicon.ico'} />
        {/* <script
          dangerouslySetInnerHTML={{
            __html: `
              var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
              (function(){
              var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
              s1.async=true;
              s1.src='https://embed.tawk.to/${config.tawkId}/1i6i4gbdf';
              s1.charset='UTF-8';
              s1.setAttribute('crossorigin','*');
              s0.parentNode.insertBefore(s1,s0);
              })();
            `,
          }}
        /> */}
      </head>
      <body className={poppins.className}>
        {config.onDevelopment ? (
          <OnDevelopment></OnDevelopment>
        ) : (
          <Providers>{children}</Providers>
        )}
      </body>
    </html>
  );
}
