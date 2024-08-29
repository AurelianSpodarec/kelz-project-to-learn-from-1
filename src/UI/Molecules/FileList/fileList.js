import React from "react"
import PropTypes from "prop-types"
import { isEmpty, isNull, get } from "lodash"
import { colours } from "@4cplatform/elements/Helpers"
import { SmallText } from "@4cplatform/elements/Typography"
import { IconWithText } from "../../Atoms"

const FileList = ({ files, emptyFilesMessage, isError }) => {
  // Return null if a null value is passed, to avoid trying to use .map on null
  if (isNull(files)) return null
  // Create an array from the file list if this is necessary
  const list = Array.isArray(files) ? files : Array.from(files)

  return (
    <>
      {!isEmpty(list) &&
        list.map((file, i) => (
          <IconWithText
            icon={isError ? "close-circle" : "check-circle"}
            content={get(file, "name", "-")}
            iconColour={isError ? get(colours, "red", "red") : get(colours, "green", "green")}
            iconSpacing="0.5rem"
            fontColour={get(colours, "tints.secondary.darkBlue.t20", "black")}
            key={`${get(file, "name", "-")}-${i}`}
          />
        ))}
      {isEmpty(list) && <SmallText>{emptyFilesMessage}</SmallText>}
    </>
  )
}

FileList.defaultProps = {
  files: null,
  emptyFilesMessage: "No files have been selected",
  isError: false
}

FileList.propTypes = {
  files: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  emptyFilesMessage: PropTypes.string,
  isError: PropTypes.bool
}

export default FileList
