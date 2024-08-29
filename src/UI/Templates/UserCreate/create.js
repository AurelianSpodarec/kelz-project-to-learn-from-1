import React, { useEffect, useContext } from "react"
import PropTypes from "prop-types"
import { useLocation } from "react-router-dom"
import queryString from "query-string"
import { get } from "lodash"
import { useFormik } from "formik"
import { Toggle, Input, QuerySelect, Select } from "@4cplatform/elements/Forms"
import { Button } from "@4cplatform/elements/Molecules"
import { useTranslations } from "@4cplatform/elements/Translations"
import { useGet } from "@4cplatform/elements/Api"
import { AuthContext } from "@4cplatform/elements/Auth"
import { ConfigContext } from "@4cplatform/elements/Config"

// Helpers
import { renderTitleOptions } from "@4cplatform/elements/Helpers"
import { createUserModel as validationSchema } from "./create.helpers"
import { PageContext } from "../../Organisms"

// Components
import { Wrapper } from "./create.styles"
import { Typeahead } from "../../Forms"

const UserCreate = ({ onSubmit, isLoading, apiErrors }) => {
  const t = useTranslations()
  const { canAccess } = useContext(AuthContext)
  const { selfServiceData } = useContext(PageContext)
  const { LOADING_TITLES, GLOBAL_TITLES } = useContext(ConfigContext)
  const { pathname, search } = useLocation()

  const qs = queryString.parse(search)
  const qsParentId = get(qs, "parent_id", null) ? parseInt(get(qs, "parent_id")) : null

  const isSystemUser = canAccess(["SYS_ADMIN", "SUPPORT_ADMIN"])
  const isOrganisationUser = canAccess(["SALES_ADVISER", "ORG_ADMIN"])

  // Define fields for Create User form
  const createUserFormik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: "",
      first_name: "",
      middle_names: "",
      last_name: "",
      email: "",
      role: "",
      simulation_mode: isOrganisationUser ? true : null,
      parent_id: !isSystemUser ? parseInt(get(selfServiceData, "parent.id", null)) : qsParentId
    },
    validationSchema,
    onSubmit: body => {
      // eslint-disable-next-line no-unused-vars
      onSubmit(Object.fromEntries(Object.entries(body).filter(([_, v]) => v != null)))
    }
  })

  const { handleSubmit } = createUserFormik
  const formik = { ...createUserFormik, validationSchema }

  // Organisation
  const shouldShowOrganisationTypeahead =
    ["ORG_ADMIN", "SALES_ADVISER"].includes(get(formik, "values.role", null)) &&
    !pathname.includes("/organisations")
  const shouldShowSimulationMode = ["SALES_ADVISER", "ORG_ADMIN"].includes(
    get(formik, "values.role", null)
  )

  // Network
  const shouldShowNetworkTypeahead =
    ["NETWORK_ADMIN", "NETWORK_MEMBER_ADMIN"].includes(get(formik, "values.role", null)) &&
    !pathname.includes("/networks")

  // Provider
  const shouldShowProviderTypeahead =
    ["PROVIDER_ADMIN", "UNDERWRITER"].includes(get(formik, "values.role", null)) &&
    !pathname.includes("/providers")

  useEffect(() => {
    if (shouldShowSimulationMode && get(formik, "values.simulation_mode", null) === null) {
      formik.setFieldValue("simulation_mode", true)
    }
    if (!shouldShowSimulationMode && get(formik, "values.simulation_mode", null) !== null) {
      formik.setFieldValue("simulation_mode", null)
    }
  })

  // GET requests
  const { data: organisations = [] } = useGet({
    endpoint: "/organisations",
    skip: !(isSystemUser && shouldShowOrganisationTypeahead)
  })

  const { data: networks = [] } = useGet({
    endpoint: "/networks",
    skip: !(isSystemUser && shouldShowNetworkTypeahead)
  })

  const { data: providers = [] } = useGet({
    endpoint: "/providers",
    skip: !(isSystemUser && shouldShowProviderTypeahead)
  })

  const fieldProps = {
    formik,
    isHorizontal: true,
    labelWidth: "20rem",
    margin: "0 0 2rem",
    apiErrors
  }

  const typeaheadSharedProps = arr => ({
    ...fieldProps,
    isRequired: true,
    name: "parent_id",
    suggestions: arr.map(({ id, name: label }) => ({ id, label })),
    apiErrors: apiErrors?.validation
  })

  return (
    <>
      <Wrapper>
        <Select {...fieldProps} name="title" label="Title" isDisabled={LOADING_TITLES}>
          {LOADING_TITLES ? (
            <option value="">Loading titles</option>
          ) : (
            <option value="">Select title</option>
          )}
          {renderTitleOptions(GLOBAL_TITLES?.data, formik)}
        </Select>
        <Input {...fieldProps} name="first_name" label="First name" />
        <Input {...fieldProps} name="middle_names" label="Middle names" />
        <Input {...fieldProps} name="last_name" label="Last name" />
        <Input {...fieldProps} name="email" label="Email address" />
        <QuerySelect
          {...fieldProps}
          name="role"
          label="Role"
          noun={{ singular: "role", plural: "roles" }}
          endpoint="/roles"
          render={data =>
            data
              .filter(role => {
                if (isSystemUser && pathname !== "/users/add") {
                  if (
                    pathname.includes("/organisations") &&
                    ["ORG_ADMIN", "SALES_ADVISER"].includes(role.name)
                  )
                    return role
                  if (
                    pathname.includes("/networks") &&
                    ["NETWORK_ADMIN", "NETWORK_MEMBER_ADMIN"].includes(role.name)
                  )
                    return role
                  if (
                    pathname.includes("/providers") &&
                    ["PROVIDER_ADMIN", "UNDERWRITER"].includes(role.name)
                  )
                    return role
                  return false
                }
                return role
              })
              .map(item => (
                <option value={get(item, "name", "")} key={get(item, "id", "")}>
                  {t(get(item, "name", ""))}
                </option>
              ))
          }
        />
        {shouldShowSimulationMode && (
          <Toggle name="simulation_mode" formik={formik} label="Simulation mode" isHorizontal />
        )}
        {isSystemUser && shouldShowOrganisationTypeahead && (
          <Typeahead {...typeaheadSharedProps(organisations)} label="Select organisation" />
        )}
        {isSystemUser && shouldShowNetworkTypeahead && (
          <Typeahead {...typeaheadSharedProps(networks)} label="Select network" />
        )}
        {isSystemUser && shouldShowProviderTypeahead && (
          <Typeahead {...typeaheadSharedProps(providers)} label="Select provider" />
        )}
      </Wrapper>
      <Button
        appearance="success"
        trailingIcon="check"
        onClick={handleSubmit}
        margin="0 0 2rem"
        isLoading={isLoading}
        name="create_user"
      >
        Add user
      </Button>
    </>
  )
}

UserCreate.defaultProps = {
  onSubmit: () => null,
  isLoading: false,
  apiErrors: null
}

UserCreate.propTypes = {
  onSubmit: PropTypes.func,
  isLoading: PropTypes.bool,
  apiErrors: PropTypes.object
}

export default UserCreate
