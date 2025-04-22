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
      <li className="menu-item-has-children">
      <Link href="/project" onClick={() => setMobileToggle(false)}>
      Portafolio
        </Link>        
        <DropDown>
          <ul>              
            <li>
              <Link href="/project" onClick={() => setMobileToggle(false)}>
              Portafolio
              </Link>
            </li>           
            <li>
              <Link href="/project/project-details" onClick={() => setMobileToggle(false)}>
                Detalle de Portafolio
              </Link>
            </li>                        
          </ul>
        </DropDown>
      </li>      
     
      <li className="menu-item-has-children">
        <Link href="/service" onClick={() => setMobileToggle(false)}>
          Servicios
        </Link>
        <DropDown>
          <ul>
            <li>
              <Link href="/service" onClick={() => setMobileToggle(false)}>
              Servicios
              </Link>
            </li>
            <li>
              <Link href="/service/service-details" onClick={() => setMobileToggle(false)}>
                Detalle de Servicios
              </Link>
            </li>
          </ul>
        </DropDown>

      </li>   
      <li>
        <Link href="/pricing" onClick={() => setMobileToggle(false)}>
        Pricios
        </Link>
      </li>         
      <li className="menu-item-has-children">
        <Link href="/blog" onClick={() => setMobileToggle(false)}>
          Blog
        </Link>
        <DropDown>
          <ul>
            <li>
              <Link href="/blog" onClick={() => setMobileToggle(false)}>
                Blog
              </Link>
            </li>           
            <li>
              <Link
                href="/blog/blog-details"
                onClick={() => setMobileToggle(false)}
              >
                Detalle de Blog
              </Link>
            </li>
          </ul>
        </DropDown>
      </li>
      <li>
        <Link href="/contact" onClick={() => setMobileToggle(false)}>
          Contacto
        </Link>
      </li>
    </ul>
  );
}
