import React from "react"
import { get, isEmpty } from "lodash"
import PropTypes from "prop-types"
import moment from "moment"
import { Link } from "react-router-dom"

// Components
import { AlertsContext } from "@4cplatform/elements/Alerts"
import { FileSelect } from "@4cplatform/elements/Forms"
import { P, H3, SmallText } from "@4cplatform/elements/Typography"
import { usePost, useDelete } from "@4cplatform/elements/Api"
import { Button } from "@4cplatform/elements/Molecules"
import { useTranslations } from "@4cplatform/elements/Translations"
import { UploadedFilesWrapper, UploadedFile } from "./fileUploader.styles"

// Helpers
import { JourneyContext } from "../../journey.context"

const FileUploader = ({ type, fileSelectLabel, name, accept, validation, maxFileSize }) => {
  const t = useTranslations()
  const { addAlert } = React.useContext(AlertsContext)
  const { data } = React.useContext(JourneyContext)
  const [files, setFiles] = React.useState(data.journey[`${name}`] ? [data.journey[`${name}`]] : [])
  const [fileToUpload, setFileToUpload] = React.useState(null)
  const [fileToDelete, setFileToDelete] = React.useState(null)
  const [fileInputRef, setFileInputRef] = React.useState(null)

  const [upload, { loading: uploadLoading }] = usePost({
    endpoint: "/journeys/:journey/files",
    headers: {
      "Content-Type": "multipart/mixed"
    },
    params: {
      journey: get(data.journey, "slug", "")
    },
    onCompleted: res => {
      if (res.data) {
        for (let i = 0, n = fileToUpload.length; i < n; i++) {
          if (res.data.id) fileToUpload[i].id = res.data.id
          if (res.data.url) fileToUpload[i].url = res.data.url
        }
        setFiles([...files, ...fileToUpload])
        fileInputRef.current.value = ""
      }
    },
    onError: () => {
      addAlert({
        message: t("FILE_UPLOAD_ERROR"),
        type: "error",
        dismissible: true,
        timeout: 5
      })
    }
  })

  const [onDelete, { loading: deleteLoading }] = useDelete({
    endpoint: "/journeys/:journey/files/:file",
    onCompleted: () => {
      setFiles([])
      setFileToDelete(null)
    },
    onError: () => {
      addAlert({
        message: t("FILE_DELETE_ERROR"),
        type: "error",
        dismissible: true,
        timeout: 5
      })
    }
  })

  React.useEffect(() => {
    if (fileToUpload && fileToUpload.length > 0) {
      const body = new FormData()
      for (let i = 0, n = fileToUpload.length; i < n; i++) {
        if (!isEmpty(validation)) {
          const fileType = fileToUpload[i].type.substr(fileToUpload[i].type.lastIndexOf("/") + 1)
          const isInValidFormat = validation.types.includes(fileType)
          const isValidFileSize = fileToUpload[i].size * 0.000001 <= parseInt(maxFileSize)
          if (isInValidFormat && isValidFileSize) {
            body.append("file", fileToUpload[i])
            body.append("type", type)
            upload({ body })
          } else {
            let errorMessage = ""
            if (!isInValidFormat) errorMessage = "File format is not correct, must be .zip"
            if (!isValidFileSize) errorMessage = "File size is too large."
            addAlert({
              message: errorMessage,
              type: "error",
              dismissible: true,
              timeout: 5
            })
            break
          }
        } else {
          body.append("file", fileToUpload[i])
          body.append("type", type)
          upload({ body })
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fileToUpload])

  React.useEffect(() => {
    if (!fileToDelete) return
    onDelete({
      params: {
        journey: get(data.journey, "slug", ""),
        file: fileToDelete.id
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fileToDelete])

  const renderUploadedFiles = () => {
    // eslint-disable-next-line prefer-const
    if (!uploadLoading && files) {
      return files.map(file => {
        const fileName =
          type.split("_").join(" ").charAt(0) + type.split("_").join(" ").slice(1).toLowerCase()

        const fileSize =
          file.size.toString().length >= 7
            ? `${Math.round(files[0].size / 1000000)} MB`
            : `${Math.round(files[0].size / 1000)} KB`

        return (
          <UploadedFile key={file.id}>
            <div>
              <Link to={file.url} target="_blank" download>
                <P margin="0 0 0.3rem 0">{fileName}</P>
              </Link>

              <SmallText margin="0">
                {moment(file.lastModifiedDate).format("DD/MM/YYYY HH:mm:ss")}, {fileSize}
              </SmallText>
            </div>

            <Button
              onClick={() => setFileToDelete(file)}
              appearance="errorInline"
              trailingIcon="delete"
              isLoading={deleteLoading}
              type="inline-button"
              name="delete_selected_hospital"
              margin="0 1rem 0"
            />
          </UploadedFile>
        )
      })
    }
    return []
  }

  return (
    <>
      <P>{fileSelectLabel}</P>
      <FileSelect
        name={name}
        margin="0"
        isLoading={uploadLoading || deleteLoading}
        isDisabled={!isEmpty(files)}
        accept={accept}
        onUploadCallback={(inputValue, inputRef) => {
          setFileToUpload(inputValue)
          setFileInputRef(inputRef)
        }}
        canAllowMultiple={false}
      />
      <H3 margin="3rem 0 2rem 0">Uploaded File</H3>
      {!isEmpty(files) && <UploadedFilesWrapper>{renderUploadedFiles()}</UploadedFilesWrapper>}

      {type === "PAPER_APPLICATION_FORM" && (
        <Button
          trailingIcon="printer"
          onClick={() => window.open(files[0].url)}
          width="fit-content"
          isDisabled={isEmpty(files)}
        >
          Print application form
        </Button>
      )}
    </>
  )
}

FileUploader.defaultProps = {
  type: "",
  fileSelectLabel: "",
  accept: "",
  validation: {},
  maxFileSize: 5
}

FileUploader.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string,
  fileSelectLabel: PropTypes.string,
  accept: PropTypes.string,
  /**
   * Validate file formats
   */
  validation: PropTypes.object,
  /**
   * Maximum file size to upload, default to 5 MB
   */
  maxFileSize: PropTypes.number
}
export default FileUploader
