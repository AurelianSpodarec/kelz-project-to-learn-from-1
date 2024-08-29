import * as yup from "yup"
import { get } from "lodash"
import { validateFiles } from "@4cplatform/elements/Helpers"

export const importLeadModel = yup.object({
  file: yup
    .mixed()
    .required()
    .test("fileValidation", "INVALID_FILE", async (files, context) => {
      const list = get(context, "parent.file", [])

      return validateFiles(list, {
        types: [
          ".xls",
          "text/csv",
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        ]
      })
    })
})
