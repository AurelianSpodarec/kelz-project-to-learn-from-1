/* eslint-disable react-hooks/exhaustive-deps */
import React from "react"
import PropTypes from "prop-types"
import { Icon } from "@4cplatform/elements/Atoms"
import { colours } from "@4cplatform/elements/Helpers"

// Helpers
import { PageContext } from "../../Organisms"

// Components
import PanelContainer from "./panel.container"
import { Wrapper, CloseButton, BodyWrapper, WideBodyWrapper } from "./panel.styles"

const FlyOutPanel = ({ body: BodyContent, wideBody: WideBodyContent, onClose, scroll, name }) => {
  const [isMounted, setMounted] = React.useState(false)
  const { setPanelStatus, panelStatusControls, resetPanel } = React.useContext(PageContext)
  const { panelStatus, prevPanelStatus } = panelStatusControls

  // Unless component is mounted, panel status should always read as closed
  const next = isMounted ? panelStatus : "closed"
  const prev = isMounted ? prevPanelStatus : "closed"

  // When this component dismounts, reset the FlyOutPanel statuses
  React.useEffect(() => {
    setMounted(true)
    return () => {
      resetPanel()
    }
  }, [])

  return (
    <PanelContainer>
      <Wrapper
        panelStatus={next}
        prevPanelStatus={prev}
        data-testid={`${name}-flyout_panel-wrapper`}
      >
        {/* Body content */}
        {next === "open" && (
          <BodyWrapper
            panelStatus={next}
            prevPanelStatus={prev}
            data-testid={`${name}-flyout_panel-body_wrapper`}
            scroll={scroll}
          >
            <CloseButton
              onClick={() => {
                if (next === "wide") {
                  setPanelStatus("open")
                } else {
                  setPanelStatus("closed")
                }
                onClose()
              }}
              data-testid={`${name}-flyout_panel-body_close`}
            >
              <Icon icon="close" colour={colours.white} />
            </CloseButton>
            <BodyContent />
          </BodyWrapper>
        )}
        {/* Wide Body content */}
        {next === "wide" && (
          <WideBodyWrapper
            panelStatus={next}
            prevPanelStatus={prev}
            data-testid={`${name}-flyout_panel-wide_body_wrapper`}
            scroll={scroll}
          >
            <CloseButton
              onClick={() => {
                if (panelStatus === "wide") {
                  setPanelStatus("open")
                } else {
                  setPanelStatus("closed")
                }
                onClose()
              }}
              data-testid={`${name}-flyout_panel-wide_close`}
            >
              <Icon icon="close" colour={colours.white} />
            </CloseButton>
            <WideBodyContent />
          </WideBodyWrapper>
        )}
      </Wrapper>
    </PanelContainer>
  )
}

FlyOutPanel.defaultProps = {
  body: () => null,
  wideBody: () => null,
  onClose: () => null,
  scroll: "default",
  name: "default"
}

FlyOutPanel.propTypes = {
  body: PropTypes.any,
  wideBody: PropTypes.any,
  onClose: PropTypes.func,
  scroll: PropTypes.oneOf(["default", "body", "none"]),
  name: PropTypes.string
}

export default FlyOutPanel
