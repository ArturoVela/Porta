'use client';
import Link from "next/link";
import Image from "next/image";
import Header from './Components/Header'; // si estás en src/app/

export default function NotFound() {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "100px 20px",
        backgroundColor: "#171717",
        color: "#fff",
      }}
    >
      <Header></Header>
     
      <p> </p>
      <p> </p>
      <div className="hero-social_arrow mb-30 responsive-img">
        <Image
          src="/assets/images/404.png"
          alt="img"
          width={500}
          height={500}
        />
      </div>
      <div className="title-area">
              <h2 className="sec-title mb-0" data-title="(2018 - 2025)">
                Página no  <span className="font2">Existe</span>
              </h2></div>
    </div>
  );
}
