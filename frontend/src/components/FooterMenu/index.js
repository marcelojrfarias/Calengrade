import React, {Component} from 'react'
import './styles.css'

class FooterMenu extends Component {

  render() {
    const { menuItems } = this.props
    return (
      <div className="container">
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
}

export default FooterMenu