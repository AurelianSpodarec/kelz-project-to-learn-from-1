import React from "react"
import PropTypes from "prop-types"
import { isEmpty, findIndex } from "lodash"
import { colours, nullFunc } from "@4cplatform/elements/Helpers"
import { Button } from "@4cplatform/elements/Molecules"

// Components
import { IconWithText } from "../../../Atoms"
import { UsersListWrapper, ListItemWrapper } from "./organisationAgencyCodes.styles"

const List = ({ list, setList }) => {
  if (isEmpty(list)) return null
  return (
    <UsersListWrapper>
      {list.map(item => {
        const { user_id: userID, label } = item
        return (
          <ListItemWrapper key={userID}>
            <IconWithText
              key={userID}
              icon="account"
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
                const i = findIndex(list, { user_id: userID })
                const newList = [...list.slice(0, i), ...list.slice(i + 1)]
                setList(newList)
              }}
            />
          </ListItemWrapper>
        )
      })}
    </UsersListWrapper>
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
