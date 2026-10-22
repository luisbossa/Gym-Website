import { Link, useParams } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { getProgramById, programs } from "../data/programs";
import { useAuth } from "../hooks/useAuth";
import { useToast } from "../hooks/useToast";
import Icon from "../components/ui/Icon";
import Reveal from "../components/ui/Reveal";
import "./ProgramDetail.css";

const ProgramDetail = () => {
  const { id } = useParams();
  const program = getProgramById(id);
  const { user, requireAuth, updateUser } = useAuth();
  const toast = useToast();

  if (!program) {
    return (
      <section className="page page-empty">
        <h1>Programa no encontrado</h1>
        <HashLink smooth to="/#training" className="outline-btn">
          Ver entrenamientos
        </HashLink>
      </section>
    );
  }

  const { title, level, duration, days, image, description, benefits, exercises, tips } =
    program;
  const otherPrograms = programs.filter((p) => p.id !== program.id).slice(0, 3);

  const enrollment = user?.programs?.[program.id];
  const completed = enrollment?.completed ?? [];
  const isRoutineDone = completed.length === exercises.length;

  const updateEnrollment = (updater) =>
    updateUser((current) => {
      const nextPrograms = { ...current.programs };
      const next = updater(nextPrograms[program.id]);
      if (next) nextPrograms[program.id] = next;
      else delete nextPrograms[program.id];
      return { ...current, programs: nextPrograms };
    });

  const enroll = () =>
    requireAuth(() => {
      updateEnrollment(
        (existing) => existing ?? { enrolledAt: new Date().toISOString(), completed: [] }
      );
      toast(`Te inscribiste en ${title}. ¡A entrenar!`);
    }, "register");

  const toggleExercise = (name) =>
    updateEnrollment((current) => ({
      ...current,
      completed: current.completed.includes(name)
        ? current.completed.filter((exercise) => exercise !== name)
        : [...current.completed, name],
    }));

  const resetProgress = () => updateEnrollment((current) => ({ ...current, completed: [] }));

  const leaveProgram = () => {
    updateEnrollment(() => null);
    toast(`Saliste del programa ${title}.`);
  };

  return (
    <article className="page program-page">
      <header className="program-hero">
        <img src={image} alt={title} fetchPriority="high" />
        <div className="program-hero-overlay"></div>

        <HashLink smooth to="/#training" className="program-back">
          <Icon name="arrow-left" size={18} /> Entrenamientos
        </HashLink>

        <div className="program-hero-content">
          <p className="eyebrow">/// Programa</p>
          <h1>{title}</h1>
          <ul className="program-stats">
            <li>
              <Icon name="target" size={18} />
              <span>Nivel</span>
              <strong>{level}</strong>
            </li>
            <li>
              <Icon name="calendar" size={18} />
              <span>Duración</span>
              <strong>{duration}</strong>
            </li>
            <li>
              <Icon name="clock" size={18} />
              <span>Frecuencia</span>
              <strong>{days}</strong>
            </li>
          </ul>
        </div>
      </header>

      <div className="program-body">
        <div className="program-main">
          <Reveal as="section" className="program-block">
            <h2>Descripción</h2>
            <p className="program-description">{description}</p>
          </Reveal>

          <Reveal as="section" className="program-block">
            <h2>Beneficios</h2>
            <ul className="program-benefits">
              {benefits.map((benefit) => (
                <li key={benefit}>
                  <Icon name="check" size={16} strokeWidth={3} />
                  {benefit}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal as="section" className="program-block">
            <h2>Recomendaciones</h2>
            <ul className="program-tips">
              {tips.map((tip) => (
                <li key={tip}>{tip}</li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal as="aside" className="card program-routine" delay={120}>
          <div className="routine-header">
            <h2>Rutina</h2>
            {enrollment && (
              <span className="routine-count">
                {completed.length}/{exercises.length} completados
              </span>
            )}
          </div>

          {enrollment && (
            <div
              className="routine-progress"
              role="progressbar"
              aria-label="Progreso de la rutina"
              aria-valuemin={0}
              aria-valuemax={exercises.length}
              aria-valuenow={completed.length}
            >
              <span style={{ width: `${(completed.length / exercises.length) * 100}%` }}></span>
            </div>
          )}

          <ol className="exercise-list">
            {exercises.map(({ name, reps }, index) => {
              const isDone = completed.includes(name);
              const content = (
                <>
                  <span className="exercise-number">
                    {enrollment ? (
                      <span className={`exercise-check ${isDone ? "is-done" : ""}`}>
                        {isDone && <Icon name="check" size={14} strokeWidth={3} />}
                      </span>
                    ) : (
                      String(index + 1).padStart(2, "0")
                    )}
                  </span>
                  <span className="exercise-name">{name}</span>
                  <span className="exercise-reps">{reps}</span>
                </>
              );

              return (
                <li key={name}>
                  {enrollment ? (
                    <label className={`exercise-item is-checkable ${isDone ? "is-done" : ""}`}>
                      <input
                        type="checkbox"
                        className="visually-hidden"
                        checked={isDone}
                        onChange={() => toggleExercise(name)}
                      />
                      {content}
                    </label>
                  ) : (
                    <div className="exercise-item">{content}</div>
                  )}
                </li>
              );
            })}
          </ol>

          {enrollment ? (
            <>
              {isRoutineDone && (
                <p className="routine-done">
                  <Icon name="award" size={18} /> ¡Completaste la rutina! Reinicia el progreso para
                  tu próxima sesión.
                </p>
              )}
              <div className="routine-actions">
                <button
                  type="button"
                  className="text-btn"
                  onClick={resetProgress}
                  disabled={!completed.length}
                >
                  Reiniciar progreso
                </button>
                <button type="button" className="text-btn is-danger" onClick={leaveProgram}>
                  Abandonar programa
                </button>
              </div>
            </>
          ) : (
            <>
              <button type="button" className="gold-btn program-cta" onClick={enroll}>
                Comenzar programa
                <Icon name="arrow-right" size={18} />
              </button>
              <p className="program-cta-note">
                {user?.membership ? (
                  "Incluido en tu membresía."
                ) : (
                  <>
                    Disponible con cualquiera de nuestros{" "}
                    <HashLink smooth to="/#plans">
                      planes
                    </HashLink>
                    .
                  </>
                )}
              </p>
            </>
          )}
        </Reveal>
      </div>

      <section className="program-others">
        <h2 className="section-heading">Otros programas</h2>
        <Reveal stagger className="program-others-grid">
          {otherPrograms.map((other) => (
            <Link key={other.id} to={`/program/${other.id}`} className="other-card">
              <img src={other.image} alt="" loading="lazy" decoding="async" />
              <div>
                <span className="chip">{other.level}</span>
                <h3>{other.title}</h3>
              </div>
            </Link>
          ))}
        </Reveal>
      </section>
    </article>
  );
};

export default ProgramDetail;
