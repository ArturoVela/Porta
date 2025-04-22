import { Manrope, Playfair_Display } from "next/font/google";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import "slick-carousel/slick/slick.css";
import "./assets/main.css";

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--body-color-font',
});
const playfair_display = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--heading-font',
});

export const metadata = {
  title: {
    absolute: '',
    default: 'Arturo Vela - Portafolio Profesional',
    template: '%s | Arturo Vela - Portafolio Profesional',
  },
  description: 'Portafolio de Arturo Vela, ingeniero en sistemas y desarrollador web enfocado en soluciones tecnológicas eficientes y visualmente atractivas.',
  openGraph: {
    title: 'Arturo Vela - Portafolio Profesional',
    description: 'Portafolio de Arturo Vela, ingeniero en sistemas y desarrollador web enfocado en soluciones tecnológicas eficientes y visualmente atractivas.',
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <meta name="author" content="Arturo Vela" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={`${manrope.variable} ${playfair_display.variable}`}>
        {children}
      </body>
    </html>
  );
}
