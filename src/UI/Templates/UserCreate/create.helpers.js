import { boolean, string, object, number } from "yup"

export const createUserModel = object().shape({
  title: string().required("MISSING_REQUIRED_FIELD"),
  first_name: string().required("MISSING_REQUIRED_FIELD"),
  middle_names: string(),
  last_name: string().required("MISSING_REQUIRED_FIELD"),
  email: string().email().required("MISSING_REQUIRED_FIELD"),
  role: string().required("MISSING_REQUIRED_FIELD"),
  simulation_mode: boolean()
    .nullable()
    .when("role", {
      is: value => ["ORG_ADMIN", "SALES_ADVISER"].includes(value),
      then: schema => schema.required("MISSING_REQUIRED_FIELD"),
      otherwise: schema => schema.notRequired().nullable()
    }),
  parent_id: number()
    .nullable()
    .when("role", {
      is: value =>
        [
          "ORG_ADMIN",
          "SALES_ADVISER",
          "NETWORK_ADMIN",
          "NETWORK_MEMBER_ADMIN",
          "PROVIDER_ADMIN",
          "UNDERWRITER"
        ].includes(value),
      then: schema => schema.required("MISSING_REQUIRED_FIELD"),
      otherwise: schema => schema.notRequired()
    })
})
