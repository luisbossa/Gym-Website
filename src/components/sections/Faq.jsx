import { useState } from "react";
import { HashLink } from "react-router-hash-link";
import { faq } from "../../data/faq";
import Icon from "../ui/Icon";
import Reveal from "../ui/Reveal";
import "./Faq.css";

const Faq = () => {
  // Solo una respuesta abierta a la vez; la animación de apertura vive en Faq.css
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="section faq">
      <Reveal className="faq-intro">
        <p className="eyebrow">/// Preguntas frecuentes</p>
        <h2 className="section-heading">Resolvemos tus dudas</h2>
        <p className="section-subtitle">
          ¿No encuentras lo que buscas? Escríbenos y te respondemos lo antes
          posible.
        </p>
        <HashLink smooth to="/#contact" className="outline-btn faq-contact">
          Contáctanos
        </HashLink>
      </Reveal>

      <Reveal stagger className="faq-list">
        {faq.map(({ question, answer }, index) => {
          const isOpen = openIndex === index;

          return (
            <div key={question} className={`faq-item ${isOpen ? "is-open" : ""}`}>
              <h3>
                <button
                  type="button"
                  id={`faq-question-${index}`}
                  className="faq-question"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  <span className="faq-number">{String(index + 1).padStart(2, "0")}</span>
                  <span className="faq-question-text">{question}</span>
                  <span className="faq-icon">
                    <Icon name="plus" size={18} />
                  </span>
                </button>
              </h3>

              <div
                id={`faq-answer-${index}`}
                role="region"
                aria-labelledby={`faq-question-${index}`}
                className="faq-answer"
                inert={!isOpen}
              >
                <div className="faq-answer-inner">
                  <p>{answer}</p>
                </div>
              </div>
            </div>
          );
        })}
      </Reveal>
    </section>
  );
};

export default Faq;
