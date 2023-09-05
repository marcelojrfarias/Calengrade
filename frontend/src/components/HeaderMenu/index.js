import React from 'react'
import './styles.css'

export default function HeaderMenu({ menuItems }) {

  return (
    <div className="header">
      {menuItems.map((menuItem, index) => (
        <a
          key={index}
          rel="noopener noreferrer"
          target="_blank"
          href={menuItem.link}>{
            menuItem.title
          }
        </a>
      ))}
    </div>
  )
}