import React from 'react'
import './styles.css'

export default function FooterMenu(props) {

  const { menuItems } = props;

  return (
    <div className="container">
      {menuItems.map(menuItem => (
        <div>
          <span>
            <a rel="noopener noreferrer" target="_blank" href={menuItem.link}>{menuItem.title}</a>
          </span>
        </div>
      ))}
    </div>
  )
}