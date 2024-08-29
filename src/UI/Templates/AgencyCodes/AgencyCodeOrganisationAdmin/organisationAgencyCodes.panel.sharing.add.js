import React from "react"
import PropTypes from "prop-types"
import { isEmpty } from "lodash"
import { useFormik } from "formik"
import { Button, Modal } from "@4cplatform/elements/Molecules"

// Helpers
import { AgencyCodesContext } from "../agencyCodes.context"
import { addUsersModel as validationSchema } from "./organisationAgencyCodes.helpers"

// Components
import { AddUserButtonsWrapper, AddUserModalWrapper } from "./organisationAgencyCodes.styles"
import AddUsersForm from "./organisationAgencyCodes.addUsers.form"
import List from "./organisationAgencyCodes.addUsers.list"

const AddUsers = ({ isDisabled, onConfirm }) => {
  const { setUserVal, userVal, users } = React.useContext(AgencyCodesContext)
  const [isOpen, setOpen] = React.useState(false)
  const [list, setList] = React.useState([])

  // Formik instance
  const addUsersFormik = useFormik({
    initialValues: {
      user_id: null
    },
    validationSchema,
    onSubmit: (item, { resetForm }) => {
      // Only add to list if it's not already there
      const isPresent = list.findIndex(usr => usr.user_id === item.user_id) !== -1
      if (!isPresent) {
        setList([...list, { ...item, label: userVal }])
      }

      setUserVal("")
      resetForm("")
    }
  })

  const { handleSubmit, handleReset } = addUsersFormik
  const formik = { ...addUsersFormik, validationSchema }

  return (
    <>
      <Button
        type="inline-button"
        appearance="whiteInline"
        leadingIcon="plus-circle-outline"
        hasIconFill={false}
        onClick={() => setOpen(true)}
        isDisabled={isDisabled}
      >
        Add users
      </Button>
      {isOpen && (
        <Modal title="Add users" onClose={() => setOpen(false)} name="add_users" hasPadding={false}>
          <AddUserModalWrapper>
            <List list={list} setList={setList} />
            <AddUsersForm formik={formik} handleSubmit={handleSubmit} users={users} />
            {/* Actions */}
            <AddUserButtonsWrapper>
              <Button
                appearance="success"
                leadingIcon="check"
                onClick={() => {
                  onConfirm(list)
                  handleReset()
                  setList([])
                  setOpen(false)
                }}
                isDisabled={isEmpty(list)}
              >
                Confirm
              </Button>
              <Button appearance="errorGhost" leadingIcon="close" onClick={() => setOpen(false)}>
                Cancel
              </Button>
            </AddUserButtonsWrapper>
          </AddUserModalWrapper>
        </Modal>
      )}
    </>
  )
}

AddUsers.propTypes = {
  isDisabled: PropTypes.bool,
  onConfirm: PropTypes.func.isRequired
}

export default AddUsers
