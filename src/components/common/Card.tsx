import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  footer?: React.ReactNode;
  hover?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  title,
  subtitle,
  footer,
  hover = false,
}) => {
  return (
    <div 
      className={`
        bg-white rounded-xl shadow-sm border border-gray-200
        ${hover ? 'transition-all duration-200 hover:shadow-md hover:translate-y-[-2px]' : ''}
        ${className}
      `}
    >
      {(title || subtitle) && (
        <div className="p-5 border-b border-gray-100">
          {title && <h3 className="text-lg font-medium text-gray-900">{title}</h3>}
          {subtitle && <p className="mt-1 text-sm text-gray-500">{subtitle}</p>}
        </div>
      )}
      <div className="p-5">{children}</div>
      {footer && (
        <div className="px-5 py-4 bg-gray-50 rounded-b-xl border-t border-gray-100">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;