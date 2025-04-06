import React from 'react';
import './Card.css';

const Card = ({ 
  children, 
  title, 
  accentColor, 
  className = '', 
  animate = true 
}) => {
  return (
    <div className={`card ${animate ? 'card-animate' : ''} ${className}`} 
         style={{ borderTopColor: accentColor }}>
      {title && <h2 className="card-title">{title}</h2>}
      {children}
    </div>
  );
};

export default Card;