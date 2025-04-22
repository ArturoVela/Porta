import Image from "next/image";

const Skill2 = () => {

    const skilltContent = [
        {img:'/assets/images/skill/skill-1.png', skillname:'Photoshop'},
        {img:'/assets/images/skill/skill-2.png', skillname:'Illustrator'},
        {img:'/assets/images/skill/skill-3.png', skillname:'CSS3'},
        {img:'/assets/images/skill/skill-4.png', skillname:'HTML5'},
        {img:'/assets/images/skill/skill-5.png', skillname:'Next.js'},
        {img:'/assets/images/skill/skill-6.png', skillname:'Discord'},
      ];  


    return (
        <section className="skill-area space bg-theme2">
            <div className="container">
                <div className="row">
                    <div className="col-xl-12">
                        <div className="title-area">
                            <h2 className="sec-title text-center">Hago maravillosas <span className="font2">experiencias digitales</span> <br/> para las marcas</h2>
                        </div>
                    </div>
                </div>
                <div className="row gx-40 gy-30">

                {skilltContent.map((item, i) => (
                    <div key={i} className="col-xl-2 col-lg-3 col-md-3 col-6">
                        <div className="skill-item text-center">
                            <div className="skill-thumb d-flex align-items-center justify-content-center flex-column">
                                <div className="skill-icon mb-35">
                                <span>
                                    <Image src={item.img} alt="img" width={55} height={55}   />
                                </span>
                                </div>
                                <h3 className="skill-count"><span className="count-number">{item.skillnumber}</span></h3>
                            </div>
                            <div className="skill-content">
                                <p className="skill-title">{item.skillname}</p>
                            </div>
                        </div>
                    </div>
                     ))}

                    </div>
            </div>
        </section>

    );
};

export default Skill2;