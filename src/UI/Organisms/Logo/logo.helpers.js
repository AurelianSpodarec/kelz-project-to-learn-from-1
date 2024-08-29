import * as yup from "yup"
import { get } from "lodash"
import { validateFiles } from "@4cplatform/elements/Helpers"

export const uploadLogoModel = yup.object({
  update_logo: yup
    .mixed()
    .required()
    .test("fileValidation", "LOGO_INVALID", async (files, context) => {
      const list = get(context, "parent.update_logo", [])

      return validateFiles(list, { types: ["image/jpeg", "image/png"] })
    })
})
