"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const allPosts = [
    {
        id: 9994,
        slug: "Tesis-arroz-29-04-2025",
        title: "Segundo Avance de Tesis: Análisis Visual de Factores que Afectan el Rendimiento del Arroz",
        category: "Investigación I",
        date: "29 abril, 2025",
        image: "/assets/images/blog/tesis-arroz2.jpg",
        excerpt: "En este segundo avance se realizó un análisis visual que muestra cómo ciertos factores, como la variabilidad climática y los valores NDVI, impactan directamente en el rendimiento del arroz en la zona de Tarapoto.",
    },
    
    {
        id: 9995,
        slug: "Tesis-arroz-22-04-2025",
        title: "Avance de Tesis: Modelo Predictivo de Rendimiento de Arroz con Satélite y Datos Climáticos",
        category: "Investigación I",
        date: "22 abril, 2025",
        image: "/assets/images/blog/tesis-arroz.jpg",
        excerpt: "Primeros resultados de mi investigación para predecir rendimiento de arroz en Tarapoto usando imágenes satelitales NDVI y datos climáticos históricos.",
    },
    {
        id: 9996,
        slug: "discord-para-negocios",
        title: "Cómo usar Discord para tu negocio o comunidad online",
        category: "Comunidades",
        date: "21 April, 2024",
        image: "/assets/images/blog/blogs-1_1-discord.jpg",
        excerpt: "Discord no es solo para gamers. Hoy es una herramienta clave para comunidades, soporte y networking. Aprende a sacarle provecho.",
    }
];


const Blog3 = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredPosts, setFilteredPosts] = useState(allPosts);
    const [selectedCategory, setSelectedCategory] = useState('');

    // Calcular categorías únicas y conteos
    const categories = [...new Set(allPosts.map(post => post.category))].map(category => ({
        name: category,
        count: allPosts.filter(post => post.category === category).length
    }));

    // Buscar
    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim() === '') {
            setFilteredPosts(allPosts);
            return;
        }
        const filtered = allPosts.filter(post => 
            post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredPosts(filtered);
    };

    // Filtrar por categoría
    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
        if (category === '') {
            setFilteredPosts(allPosts);
        } else {
            const filtered = allPosts.filter(post => post.category === category);
            setFilteredPosts(filtered);
        }
    };

    // Posts recientes
    const recentPosts = [...allPosts]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 3);

    return (
        <section className="blogs-area space bg-theme2">
            <div className="container">
                <div className="blog__inner-wrap">
                    <div className="row gx-35 lg-gx-25 gy-35 flex-lg-row flex-column-reverse">
                        <div className="col-lg-8">
                            <div className="blog__details-wrap">
                                {filteredPosts.map((post) => (
                                    <div key={post.id} className="single-blog-box">
                                        <a className="meta" href="#"> {post.category} . {post.date} </a>
                                        <h3 className="blog-title">
                                            <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                                        </h3>
                                        <figure className="blog-thumb">
                                            <Image src={post.image} alt={post.title} width={798} height={448} loading="lazy"/>
                                        </figure>
                                        <div className="blog-content">
                                            <p className="blog-text">{post.excerpt}</p>
                                            <Link href={`/blog/${post.slug}`} className="link-btn3">
                                                <span className="link-effect">
                                                    <span className="effect-1">Leer más</span>
                                                    <span className="effect-1">Leer más</span>
                                                </span>
                                                <div className="btn-circle">
                                                    <span><i className="bi bi-arrow-up-right"></i><i className="bi bi-arrow-up-right"></i></span>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <aside className="blog__sidebar">
                                <div className="sidebar__widget sidebar__widget-two">
                                    <div className="sidebar__search">
                                        <h4 className="sidebar__widget-title">Buscar</h4>
                                        <form onSubmit={handleSearch}>
                                            <input 
                                                type="text" 
                                                placeholder="Buscar" 
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                            />
                                            <button type="submit">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="none">
                                                    <path d="M19.0002 19.0002L14.6572 14.6572M14.6572 14.6572C15.4001 13.9143 15.9894 13.0324 16.3914 12.0618C16.7935 11.0911 17.0004 10.0508 17.0004 9.00021C17.0004 7.9496 16.7935 6.90929 16.3914 5.93866C15.9894 4.96803 15.4001 4.08609 14.6572 3.34321C13.9143 2.60032 13.0324 2.01103 12.0618 1.60898C11.0911 1.20693 10.0508 1 9.00021 1C7.9496 1 6.90929 1.20693 5.93866 1.60898C4.96803 2.01103 4.08609 2.60032 3.34321 3.34321C1.84288 4.84354 1 6.87842 1 9.00021C1 11.122 1.84288 13.1569 3.34321 14.6572C4.84354 16.1575 6.87842 17.0004 9.00021 17.0004C11.122 17.0004 13.1569 16.1575 14.6572 14.6572Z" stroke="currentcolor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </button>
                                        </form>
                                    </div>
                                </div>
                                <div className="sidebar__widget">
                                    <h4 className="sidebar__widget-title">Categorías</h4>
                                    <div className="sidebar__cat-list">
                                        <ul className="list-wrap">
                                            <li>
                                                <a 
                                                    href="#" 
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        handleCategoryClick('');
                                                    }}
                                                    className={selectedCategory === '' ? 'active' : ''}
                                                >
                                                    Todas
                                                </a>
                                            </li>
                                            {categories.map((category) => (
                                                <li key={category.name}>
                                                    <a 
                                                        href="#" 
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            handleCategoryClick(category.name);
                                                        }}
                                                        className={selectedCategory === category.name ? 'active' : ''}
                                                    >
                                                        {category.name} <span>({category.count})</span>
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                <div className="sidebar__widget">
                                    <h4 className="sidebar__widget-title">Post Recientes</h4>
                                    <div className="sidebar__post-list">
                                        {recentPosts.map((post) => (
                                            <div key={post.id} className="sidebar__post-item">
                                                <div className="sidebar__post-thumb">
                                                    <Link href={`/blog/${post.slug}`}>
                                                        <Image src={post.image} alt={post.title} width={100} height={100} loading="lazy"/>
                                                    </Link>
                                                </div>
                                                <div className="sidebar__post-content">
                                                    <h5 className="title">
                                                        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                                                    </h5>
                                                    <span className="date">{post.date}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                
                            </aside>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Blog3;