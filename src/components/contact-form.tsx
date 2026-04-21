"use client";

import { FormEvent, useState } from "react";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const nextErrors: { name?: string; email?: string } = {};

    if (!name) nextErrors.name = "Campo obrigatório";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = "Informe um e-mail válido";
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length === 0) {
      setSubmitted(true);
      event.currentTarget.reset();
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <div>
          <label htmlFor="name">Nome *</label>
          <input id="name" name="name" className="form-input" placeholder="Seu nome" />
          {errors.name ? <p className="form-error">{errors.name}</p> : null}
        </div>
        <div>
          <label htmlFor="lastName">Sobrenome</label>
          <input id="lastName" name="lastName" className="form-input" placeholder="Sobrenome" />
        </div>
      </div>

      <div>
        <label htmlFor="email">E-mail *</label>
        <input id="email" name="email" type="email" className="form-input" placeholder="seu@email.com.br" />
        {errors.email ? <p className="form-error">{errors.email}</p> : null}
      </div>

      <div>
        <label htmlFor="message">Mensagem</label>
        <textarea id="message" name="message" className="form-input form-textarea" placeholder="Descreva sua necessidade ou dúvida..." />
      </div>

      {submitted ? (
        <div className="form-success">Mensagem enviada com sucesso. A equipe da ILC retornará em breve.</div>
      ) : null}

      <button type="submit" className="btn btn-primary form-submit">
        Enviar Mensagem
      </button>
    </form>
  );
}