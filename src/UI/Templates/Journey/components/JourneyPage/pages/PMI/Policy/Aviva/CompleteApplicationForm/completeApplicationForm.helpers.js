import * as yup from "yup"
import { get } from "lodash"
import { validateFiles } from "@4cplatform/elements/Helpers"

export const fileUploaderSchema = yup.object({
  pmc: yup
    .mixed()
    .required()
    .test("The file is too large", files => !files || (files && files.size >= 5242880))
    .test("fileValidation", "INVALID_FILE", async (files, context) => {
      const list = get(context, "parent.file", [])
      return validateFiles(list, {
        types: ["zip"]
      })
    })
})
