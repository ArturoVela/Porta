'use client';
import ReCAPTCHA from 'react-google-recaptcha';
import { useRef, useState } from 'react';

const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

export default function CommentForm({ action }) {
  const recaptchaRef = useRef(null);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    const token = recaptchaRef.current?.getValue();
    if (!token) {
      e.preventDefault();
      setError('Confirma que no eres un robot');
    }
  };

  return (
    <form action={action} onSubmit={handleSubmit} className="comment-form">
      <div className="row gx-30">
        <div className="col-md-6">
          <div className="form-group">
            <input type="text" className="form-control" name="name" placeholder="Name" required />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <input type="email" className="form-control" name="email" placeholder="Email" required />
          </div>
        </div>
        <div className="col-lg-12">
          <div className="form-group">
            <textarea name="message" placeholder="Message" className="form-control style2" required></textarea>
          </div>
        </div>
        <div className="col-lg-12 mb-3">
          <ReCAPTCHA sitekey={SITE_KEY} ref={recaptchaRef} />
          {error && <p className="text-danger mt-2">{error}</p>}
        </div>
        <div className="form-btn col-12">
          <button type="submit" className="link-btn">
            <span className="link-effect">
              <span className="btn-title">Evniar comentario</span>
            </span>
            <img src="/assets/images/icons/arrow-left-top.svg" alt="icon" />
          </button>
        </div>
      </div>
    </form>
  );
}
