import React from "react"
import PropTypes from "prop-types"
import { v4 as uuid } from "uuid"
import { isEmpty } from "lodash"
import { Icon } from "@4cplatform/elements/Atoms"

// Components
import {
  NavWrapper,
  NavButtons,
  NavItemLink,
  NavItemDiv,
  NavItemWrapper,
  IconWrapper,
  SubNavWrapper,
  SubNavItemLink,
  SubNavItemDiv,
  IconLabel
} from "./page.styles"

// Helpers
import { getNavLinks } from "../../Helpers"

const Navigation = ({ dashboard, isLoading }) => (
  <NavWrapper>
    {!isLoading && (
      <NavButtons>
        {getNavLinks(dashboard).map(category => {
          const { title, icon, route, links } = category
          const ParentLinkElement = route ? NavItemLink : NavItemDiv

          return (
            <NavItemWrapper className="nav-link" key={uuid()}>
              <ParentLinkElement to={route}>
                <IconWrapper className="icon">
                  <Icon icon={icon} />
                </IconWrapper>
                <IconLabel className="label">{title}</IconLabel>
              </ParentLinkElement>
              {!isEmpty(links) && (
                <SubNavWrapper className="sub-nav">
                  {links.map(page => {
                    const { title: subLinkTitle, route: subLinkRoute, isSimulated } = page
                    const ChildLinkElement = subLinkRoute ? SubNavItemLink : SubNavItemDiv

                    return (
                      <ChildLinkElement
                        to={subLinkRoute}
                        key={isSimulated ? `${subLinkTitle}-simulated` : subLinkTitle}
                      >
                        {!isSimulated && subLinkTitle}
                        {isSimulated && `Simulated ${subLinkTitle.toLowerCase()}`}
                      </ChildLinkElement>
                    )
                  })}
                </SubNavWrapper>
              )}
            </NavItemWrapper>
          )
        })}
      </NavButtons>
    )}
  </NavWrapper>
)

Navigation.defaultProps = {
  dashboard: [],
  isLoading: false
}

Navigation.propTypes = {
  dashboard: PropTypes.array,
  isLoading: PropTypes.bool
}

export default Navigation
