import React from "react"
import PropTypes from "prop-types"
import { Button } from "@4cplatform/elements/Molecules"
import { nullFunc } from "@4cplatform/elements/Helpers"

// Components
import { ButtonsWrapper } from "./import.styles"

const Actions = ({ type, handleSubmit, isLoading, clearImport }) => (
  <ButtonsWrapper type={type}>
    {type === "import" && (
      <>
        <Button
          onClick={handleSubmit}
          isLoading={isLoading}
          trailingIcon="file-plus-outline"
          appearance="success"
          name="submit"
        >
          Submit
        </Button>
        <Button
          onClick={clearImport}
          isLoading={isLoading}
          trailingIcon="cancel"
          appearance="error"
          name="cancel"
        >
          Cancel
        </Button>
      </>
    )}
    {type === "error" && (
      <Button
        onClick={handleSubmit}
        isLoading={isLoading}
        trailingIcon="chevron-right"
        name="try_again"
      >
        Try again
      </Button>
    )}
  </ButtonsWrapper>
)

Actions.defaultProps = {
  type: "import",
  handleSubmit: nullFunc,
  isLoading: false,
  clearImport: nullFunc
}

Actions.propTypes = {
  type: PropTypes.oneOf(["import", "error"]),
  handleSubmit: PropTypes.func,
  isLoading: PropTypes.bool,
  clearImport: PropTypes.func
}

export default Actions
