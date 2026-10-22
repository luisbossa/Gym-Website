import Reveal from "./Reveal";

const SectionHeader = ({ eyebrow, title, subtitle, align = "start", action }) => (
  <Reveal as="header" className={`section-header section-header--${align}`}>
    <div className="section-header-text">
      <p className="eyebrow">/// {eyebrow}</p>
      <h2 className="section-heading">{title}</h2>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </div>
    {action}
  </Reveal>
);

export default SectionHeader;
