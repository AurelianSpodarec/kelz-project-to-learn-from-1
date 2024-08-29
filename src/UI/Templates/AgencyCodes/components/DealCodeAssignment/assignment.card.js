import React from "react"
import PropTypes from "prop-types"
import { get } from "lodash"
import { P } from "@4cplatform/elements/Typography"
import { Icon } from "@4cplatform/elements/Atoms"
import { colours } from "@4cplatform/elements/Helpers"

// Components
import { IconWithText } from "../../../../Atoms"
import { CardWrapper, ActionsButton } from "./assignment.styles"
import ViewDealCode from "./assignment.card.view"

// Helpers
import { AgencyCodesContext } from "../../agencyCodes.context"

const Card = ({ code, index }) => {
  const { viewDeal, setViewDeal } = React.useContext(AgencyCodesContext)
  const isSuspended = get(code, "suspended", false)
  const isOpen = get(viewDeal, "isOpen") && get(code, "slug") === get(viewDeal, "slug")

  return (
    <>
      <CardWrapper data-testid={`deal_code_assignment-card-${index}`}>
        {/* Text */}
        <div>
          <P margin="0 0 0.5rem">{get(code, "name", "-")}</P>
          <IconWithText
            icon="pound"
            content={get(code, "deal_code", "-")}
            margin="0"
            iconSize="1.5rem"
            fontSize="1.4rem"
          />
        </div>
        {/* Actions */}
        <div>
          <Icon
            icon={!isSuspended ? "check-circle" : "close-circle"}
            colour={!isSuspended ? get(colours, "green") : get(colours, "red")}
          />
          <ActionsButton
            data-testid={`deal_code_assignment-view_button-${index}`}
            onClick={() => setViewDeal({ isOpen: true, slug: get(code, "slug") })}
          >
            <Icon icon="dots-horizontal" colour={get(colours, "blue")} />
          </ActionsButton>
        </div>
      </CardWrapper>
      {/* View Deal Code modal */}
      {isOpen && (
        <ViewDealCode code={code} onClose={() => setViewDeal({ isOpen: false, slug: null })} />
      )}
    </>
  )
}

Card.propTypes = {
  code: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired
}

export default Card
