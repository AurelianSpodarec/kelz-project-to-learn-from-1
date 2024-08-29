import { createPortal } from "react-dom"
import PropTypes from "prop-types"

const PanelContainer = ({ children }) =>
  createPortal(
    children,
    document.getElementById("panel_container") || document.getElementsByTagName("BODY")[0]
  )

PanelContainer.propTypes = {
  children: PropTypes.any
}

export default PanelContainer
