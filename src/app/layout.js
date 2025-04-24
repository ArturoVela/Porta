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
    url: 'https://trolinol.xyz', // URL fija de tu sitio web
    image: 'https://trolinol.xyz/assets/images/thumbnail.jpg', // URL fija de la imagen
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <meta name="author" content="Arturo Vela" />
        <link rel="icon" href="/favicon.ico" sizes="any" />

        {/* Meta etiquetas Open Graph */}
        <meta property="og:title" content={metadata.openGraph.title} />
        <meta property="og:description" content={metadata.openGraph.description} />
        <meta property="og:url" content={metadata.openGraph.url} />
        <meta property="og:image" content={metadata.openGraph.image} />
        <meta property="og:type" content={metadata.openGraph.type} />

        {/* Meta etiquetas para Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metadata.openGraph.title} />
        <meta name="twitter:description" content={metadata.openGraph.description} />
        <meta name="twitter:image" content={metadata.openGraph.image} />

        {/* Meta etiquetas adicionales para otras plataformas */}
        <meta property="og:site_name" content="Arturo Vela - Portafolio Profesional" />
        <meta name="theme-color" content="#000000" /> {/* Color para navegadores y plataformas */}
      </head>
      <body className={`${manrope.variable} ${playfair_display.variable}`}>
        {children}
      </body>
    </html>
  );
}
