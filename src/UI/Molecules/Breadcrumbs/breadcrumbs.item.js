import React from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"

// Components
import { ItemWrapper, Divider } from "./breadcrumbs.styles"

const Item = ({ label, isLast, link }) => {
  // Render the item as link or text
  const renderItem = () => {
    if (link && link.includes("://")) {
      return (
        <a href={link} title={label}>
          {label}
        </a>
      )
    }
    if (link) {
      return <Link to={link}>{label}</Link>
    }
    return label
  }

  return (
    <ItemWrapper data-testid={label}>
      {renderItem()}
      {!isLast && <Divider data-testid="breadcrumb-divider">/</Divider>}
    </ItemWrapper>
  )
}

Item.defaultProps = {
  isLast: false,
  link: ""
}

Item.propTypes = {
  label: PropTypes.string.isRequired,
  isLast: PropTypes.bool,
  link: PropTypes.string
}

export default Item
