const variantClass = {
  primary: "ui-btn-primary",
  secondary: "ui-btn-secondary",
  ghost: "ui-btn-ghost",
  danger: "ui-btn-danger",
};

const sizeClass = {
  sm: "ui-btn-sm",
  md: "ui-btn-md",
  lg: "ui-btn-lg",
};

const Button = ({
  type = "button",
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}) => {
  const classes = [
    "ui-btn",
    variantClass[variant] ?? variantClass.primary,
    sizeClass[size] ?? sizeClass.md,
    className,
  ]
    .join(" ")
    .trim();

  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  );
};

export default Button;
