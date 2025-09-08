import React from 'react';
import './styles.scss';
/**
 * @typedef {Object} BreadcrumbItem
 * @property {string} label - The display text of the breadcrumb item.
 * @property {string} [href] - Optional URL for navigation.
 * @property {() => void} [onClick] - Optional click handler if no href is provided.
 */

/**
 * @typedef {Object} BreadcrumbProps
 * @property {BreadcrumbItem[]} items - The list of breadcrumb items to render.
 * @property {string} [separator='/'] - The separator displayed between breadcrumb items.
 */

/**
 * A reusable breadcrumb navigation component.
 *
 * @component
 * @param {BreadcrumbProps} props - The props for the Breadcrumb component.
 * @returns {JSX.Element} The rendered breadcrumb navigation.
 */
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
