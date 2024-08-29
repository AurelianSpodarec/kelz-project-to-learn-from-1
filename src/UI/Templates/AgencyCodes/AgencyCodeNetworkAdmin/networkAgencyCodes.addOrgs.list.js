import React from "react"
import PropTypes from "prop-types"
import { isEmpty, findIndex } from "lodash"
import { colours, nullFunc } from "@4cplatform/elements/Helpers"
import { Button } from "@4cplatform/elements/Molecules"

// Components
import { IconWithText } from "../../../Atoms"
import { OrganisationsListWrapper, ListItemWrapper } from "./networkAgencyCodes.styles"

const List = ({ list, setList }) => {
  if (isEmpty(list)) return null
  return (
    <OrganisationsListWrapper>
      {list.map(item => {
        const { organisation_id: orgID, label } = item
        return (
          <ListItemWrapper key={orgID}>
            <IconWithText
              key={orgID}
              icon="domain"
              content={label}
              iconColour={colours.blue}
              margin="0"
            />
            <Button
              trailingIcon="delete"
              type="inline-button"
              appearance="errorInline"
              hasIconFill={false}
              onClick={() => {
                const i = findIndex(list, { organisation_id: orgID })
                const newList = [...list.slice(0, i), ...list.slice(i + 1)]
                setList(newList)
              }}
            />
          </ListItemWrapper>
        )
      })}
    </OrganisationsListWrapper>
  )
}

List.defaultProps = {
  list: [],
  setList: nullFunc
}

List.propTypes = {
  list: PropTypes.array,
  setList: PropTypes.func
}

export default List
