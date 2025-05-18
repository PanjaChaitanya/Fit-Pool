export const DisplayTitle = ({ children, className = "" }) => (
  <h1 className={`display-title ${className}`.trim()}>{children}</h1>
);

export const SectionTitle = ({ children, className = "" }) => (
  <h2 className={`section-title ${className}`.trim()}>{children}</h2>
);

export const Eyebrow = ({ children, className = "" }) => (
  <p className={`eyebrow ${className}`.trim()}>{children}</p>
);

export const Lead = ({ children, className = "" }) => (
  <p className={`lead ${className}`.trim()}>{children}</p>
);

export const BodyText = ({ children, className = "" }) => (
  <p className={`body-text ${className}`.trim()}>{children}</p>
);
