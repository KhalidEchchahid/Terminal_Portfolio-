import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import WhatsAppButton from "@/components/WhatsAppButton";
import Head from "next/head";
import Image from "next/image";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "حذاء رياضي مريح وأنيق ",
  description:
    "  هذا الحذاء الرياضي مصمم بعناية ليوفر لك الراحة والأناقة طوال اليوم. يتميز بتصميم عصري يتماشى مع جميع الإطلالات اليومية، سواء كانت كاجوال أو رياضية.  مصنوع من خامات عالية الجودة تضمن التهوية والمتانة، مع وسادة قدم ناعمة  لتوفير دعم مثالي لراحة قدميك.",
  // icons: {
  //   icon: "/images/shoes3.jpg",
  // },
  openGraph: {
    images: [
      {
        url: "/images/3.jpg",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="rtl">
      <Head>
        <meta
          name="facebook-domain-verification"
          content="5n499kynw54azs1bbeks5i3zwh0g32"
        />
      </Head>
      <body className={inter.className}>
        {children}
        <WhatsAppButton />

        <Script id="facebook-pixel" strategy="afterInteractive">
          {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '1725231501604996');
          fbq('track', 'PageView');
        `}
        </Script>
        <noscript>
          <Image
            alt="fb"
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=1725231501604996&ev=PageView&noscript=1`}
          />
        </noscript>
      </body>
    </html>
  );
}
