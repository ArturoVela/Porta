'use client';
import { useEffect, useState } from "react";

export default function SocialShare() {
  const [url, setUrl] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setUrl(window.location.href);
    }
  }, []);

  return (
    <div className="post-share">
      <h5 className="title">Compartelo en tus redes sociales:</h5>
      <div className="social-btn style3 justify-content-md-end">
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="link-effect">
            <span className="effect-1"><i className="bi bi-facebook"></i></span>
            <span className="effect-1"><i className="bi bi-facebook"></i></span>
          </span>
        </a>
        <a
          href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="link-effect">
            <span className="effect-1"><i className="bi bi-twitter"></i></span>
            <span className="effect-1"><i className="bi bi-twitter"></i></span>
          </span>
        </a>
        <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
          <span className="link-effect">
            <span className="effect-1"><i className="bi bi-instagram"></i></span>
            <span className="effect-1"><i className="bi bi-instagram"></i></span>
          </span>
        </a>
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="link-effect">
            <span className="effect-1"><i className="bi bi-linkedin"></i></span>
            <span className="effect-1"><i className="bi bi-linkedin"></i></span>
          </span>
        </a>
      </div>
    </div>
  );
}
