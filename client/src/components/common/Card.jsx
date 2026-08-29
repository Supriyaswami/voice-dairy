const Card = ({ children, className = "" }) => (
  <div className={`glass-panel rounded-[2rem] p-6 ${className}`}>{children}</div>
);

export default Card;

