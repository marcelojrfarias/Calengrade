import React from 'react'
import './styles.css'

export default function FooterMenu({ menuItems }) {

  return (
    <div className="footer">
      {menuItems.map((menuItem, index) => (
        <div key={index}>
          <span>
            <a rel="noopener noreferrer" target="_blank" href={menuItem.link}>{menuItem.title}</a>
          </span>
        </div>
      ))}
    </div>
  )
}