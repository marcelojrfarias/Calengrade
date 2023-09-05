import React from 'react'
import './styles.css'

export default function FooterMenu({ menuItems }) {

  return (
    <div className="footer">
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