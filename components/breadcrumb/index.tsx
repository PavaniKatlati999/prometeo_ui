import React from 'react';
import './styles.scss';

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, separator = '/' }) => {
  return (
    <nav className="breadcrumb">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <React.Fragment key={index}>
            {isLast ? (
              <span className="active">{item.label}</span>
            ) : item.href ? (
              <a href={item.href}>{item.label}</a>
            ) : (
              <span onClick={item.onClick}>{item.label}</span>
            )}
            {!isLast && <span className="separator">{separator}</span>}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;
