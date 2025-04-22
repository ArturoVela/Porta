const Counter1 = () => {

    const counterContent = [
      { number: '8', position: 'Proyectos completados', href: 'https://github.com/ArturoVela' },
      { number: '300+', position: 'Usuarios en comunidades', href: '/https://discord.gg/mnMkUXC5vK' },
      { number: '1', position: 'Años de experiencia tech' },
      { number: '100%', position: 'Compromiso con la calidad'},
    ];
  
    return (
      <div className="counter-area bg-theme2">
        <div className="container">
          <div className="row counter-wrap gy-40 align-items-center justify-content-lg-between justify-content-center">
            {counterContent.map((item, i) => (
              <div key={i} className="col-xl-auto col-lg-3 col-md-3 col-sm-6">
                <a 
                  href={item.href} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="counter-box text-decoration-none"
                >
                  <h3 className="counter-box_number">
                    <span className="count-number">{item.number}</span>
                  </h3>
                  <h4 className="counter-box_title">{item.position}</h4>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  export default Counter1;
  