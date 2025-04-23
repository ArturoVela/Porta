import Link from 'next/link';
import DropDown from './DropDown';

export default function Nav({ setMobileToggle }) {
  return (
    <ul className="cs_nav_list fw-medium">
      <li>
        <Link href="/">Inicio</Link>
      </li>
      <li className="menu-item-has-children">
        <Link href="/about" onClick={() => setMobileToggle(false)}>
        Sobre mí 
        </Link>
        <DropDown> 
          <ul>
            <li>
              <Link href="/about" onClick={() => setMobileToggle(false)}>
                Sobre mí
              </Link>
            </li>
            <li>
              <Link href="/cv" onClick={() => setMobileToggle(false)}>
                CV
              </Link>
            </li>
            </ul>  
        </DropDown>          
      </li>       
      <li>
      <Link href="/project" onClick={() => setMobileToggle(false)}>
      Portafolio
        </Link>        
      </li>      
     
      <li>
        <Link href="/service" onClick={() => setMobileToggle(false)}>
          Servicios
        </Link>

      </li>   
      <li>
        <Link href="/pricing" onClick={() => setMobileToggle(false)}>
        Pricios
        </Link>
      </li>         
      <li >
        <Link href="/blog" onClick={() => setMobileToggle(false)}>
          Blog
        </Link>
      </li>
      <li>
        <Link href="/contact" onClick={() => setMobileToggle(false)}>
          Contacto
        </Link>
      </li>
    </ul>
  );
}
