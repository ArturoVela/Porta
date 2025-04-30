"use client";

import { useEffect, useState } from "react";

export default function CommentSection({ serverAction }) {
  const [comments, setComments] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [slug, setSlug] = useState("");

  useEffect(() => {
    // Captura el slug desde la ruta actual del navegador
    const path = window.location.pathname;
    setSlug(path);

    // Cargar comentarios desde una API route o usar fetch directamente
    const loadComments = async () => {
      const res = await fetch(
        `${window.location.origin}/api/comments?slug=${path}`
      );
      const data = await res.json();
      setComments(data);
    };

    loadComments();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    const res = await fetch(`${window.location.origin}/api/comments`, {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      form.reset();
      const updated = await fetch(
        `${window.location.origin}/api/comments?slug=${slug}`
      );
      const data = await updated.json();
      setComments(data);
    }
  };

  return (
    <div className="comment-area space-bottom bg-theme2">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="comment-respond">
              <h3 className="comment-reply-title">Publicar un comentario</h3>
              <form onSubmit={handleSubmit} className="comment-form">
                <input type="hidden" name="slug" value={slug} />
                <div className="row gx-30">
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        placeholder="Nombre"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        placeholder="Email"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <textarea
                        name="message"
                        placeholder="Mensaje"
                        className="form-control style2"
                        required
                      ></textarea>
                    </div>
                  </div>
                  <div className="form-btn col-12">
                    <button type="submit" className="link-btn">
                      <span className="link-effect">
                        <span className="btn-title">Enviar Comentario</span>
                      </span>
                      <img
                        src="/assets/images/icons/arrow-left-top.svg"
                        alt="icon"
                      />
                    </button>
                  </div>
                </div>
              </form>
              <p> </p>
              <hr className="my-5" />
              <h4 className="comment-reply-title">Comentarios recientes</h4>
              {comments.length === 0 ? (
                <p className="title text-white"> Sé el primero en comentar ✍️</p>
              ) : (
                <>
                  <ul className="list-unstyled">
                    {(showAll ? comments : comments.slice(0, 3)).map(
                      (comment) => (
                        <li
                          key={comment.id}
                          className="mb-4 border-bottom pb-2"
                        >
                          <p className="mb-1">
                            <strong>{comment.name}</strong> —{" "}
                            <small>
                              {new Date(comment.created_at).toLocaleString()}
                            </small>
                          </p>
                          <p className="mb-0">{comment.message}</p>
                        </li>
                      )
                    )}
                  </ul>

                  {!showAll && comments.length > 3 && (
                    <div className="text-center mt-3">
                      <button
                        onClick={() => setShowAll(true)}
                        className="btn btn-outline-primary"
                      >
                        Mostrar más comentarios
                      </button>
                    </div>
                  )}
                </>
              )}

              {!showAll && comments.length > 3 && (
                <div className="text-center mt-3">
                  <button
                    onClick={() => setShowAll(true)}
                    className="btn btn-outline-primary"
                  >
                    Mostrar más comentarios
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
