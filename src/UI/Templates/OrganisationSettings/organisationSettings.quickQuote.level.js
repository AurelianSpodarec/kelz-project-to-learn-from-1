import React, { useContext } from "react"
import PropTypes from "prop-types"
import { get, capitalize } from "lodash"
import { H3, P } from "@4cplatform/elements/Typography"
import { Button } from "@4cplatform/elements/Molecules"
import { Select } from "@4cplatform/elements/Forms"

// Helpers
import { OrganisationSettingsContext } from "./organisationSettings.context"

// Components
import { LevelWrapper, Cell } from "./organisationSettings.styles"
import { resolveValueNames } from "./organisationsSettings.helpers"

const QuickQuoteLevel = ({ level, isEdit, setIsEdit }) => {
  const { quickQuoteData, quickQuoteLoading, updateQuickQuoteLoading, formik, handleSubmit } =
    useContext(OrganisationSettingsContext)
  const isLoading = quickQuoteLoading || updateQuickQuoteLoading

  const isLevelEdit = get(isEdit, level, false)
  const isAnyLevelEdit = Object.values(isEdit).includes(true)

  // Defining H3 text content here to prevent errors from propTypes (Passing Array instead of string)
  const quickQuoteTitle = `${capitalize(level)} Policy`
  const excessText = `£${resolveValueNames(get(quickQuoteData, `${level}_excess`, "-"))}`
  const hospitalListText = `${resolveValueNames(
    get(quickQuoteData, `${level}_hospital_list`, "-")
  )}`
  const outpatientLimitText = `${resolveValueNames(
    get(quickQuoteData, `${level}_outpatient`, "-")
  )}`
  const underwritingText = `${get(quickQuoteData, `${level}_underwriting`, "-")}`

  return (
    <>
      {!isLevelEdit && (
        <LevelWrapper level={level}>
          <Cell level={level} isFirst>
            <H3 margin="0" appearance="light">
              {quickQuoteTitle}
            </H3>
          </Cell>
          <Cell isEdit={isAnyLevelEdit}>
            <P margin="1rem 0 0 0">Excess</P>
            <H3 margin="0" loadingWidth="15rem" isLoading={isLoading}>
              {excessText}
            </H3>
          </Cell>
          <Cell isEdit={isAnyLevelEdit}>
            <P margin="1rem 0 0 0">Hospital list</P>
            <H3 margin="0" loadingWidth="15rem" isLoading={isLoading}>
              {hospitalListText}
            </H3>
          </Cell>
          <Cell isEdit={isAnyLevelEdit}>
            <P margin="1rem 0 0 0">Outpatient limit</P>
            <H3 margin="0" loadingWidth="15rem" isLoading={isLoading}>
              {outpatientLimitText}
            </H3>
          </Cell>
          <Cell isEdit={isAnyLevelEdit}>
            <P margin="1rem 0 0 0">Underwriting</P>
            <H3 margin="0" loadingWidth="15rem" isLoading={isLoading}>
              {underwritingText}
            </H3>
          </Cell>
          <Cell level={level} isLast>
            <Button
              name={`${level}_edit_button`}
              leadingIcon="playlist-edit"
              type="inline-button"
              onClick={() => setIsEdit({ ...isEdit, [level]: true })}
              isDisabled={isLoading || isAnyLevelEdit}
            />
          </Cell>
        </LevelWrapper>
      )}
      {isLevelEdit && (
        <LevelWrapper level={level}>
          <Cell level={level} isFirst>
            <H3 margin="0" appearance="light" isLoading={isLoading}>
              {quickQuoteTitle}
            </H3>
          </Cell>
          <Cell isEdit>
            <Select name={`${level}_excess`} formik={formik} label="Excess" width="18.5rem">
              {quickQuoteData.available_options.excess.map((option, index) => (
                <option value={option} key={index}>
                  {option.slice(-3) !== "NIL" && "£"}
                  {resolveValueNames(option)}
                </option>
              ))}
            </Select>
          </Cell>
          <Cell isEdit>
            <Select
              name={`${level}_hospital_list`}
              formik={formik}
              label="Hospital list"
              width="18.5rem"
            >
              {quickQuoteData.available_options.hospital_list
                .filter(option => !option.includes("GUIDED"))
                .map((option, index) => (
                  <option value={option} key={index}>
                    {resolveValueNames(option)}
                  </option>
                ))}
            </Select>
          </Cell>
          <Cell isEdit>
            <Select
              name={`${level}_outpatient`}
              formik={formik}
              label="Outpatient limit"
              width="18.5rem"
            >
              {quickQuoteData.available_options.outpatient.map((option, index) => (
                <option value={option} key={index}>
                  {resolveValueNames(option)}
                </option>
              ))}
            </Select>
          </Cell>
          <Cell isEdit>
            <Select
              name={`${level}_underwriting`}
              formik={formik}
              label="Underwriting"
              width="18.5rem"
            >
              <option value="MORI">Moratorium</option>
              <option value="FMU">FMU</option>
            </Select>
          </Cell>
          <Cell level={level} isLast>
            <Button
              appearance="successInline"
              name={`${level}_save_button`}
              leadingIcon="check"
              type="inline-button"
              onClick={() => {
                handleSubmit()
                setIsEdit({ ...isEdit, [level]: false })
              }}
            />
            <Button
              appearance="errorInline"
              name={`${level}_cancel_button`}
              trailingIcon="close"
              type="inline-button"
              onClick={() => setIsEdit({ ...isEdit, [level]: false })}
            />
          </Cell>
        </LevelWrapper>
      )}
    </>
  )
}

QuickQuoteLevel.propTypes = {
  level: PropTypes.oneOf(["basic", "standard", "comprehensive"]).isRequired,
  isEdit: PropTypes.object.isRequired,
  setIsEdit: PropTypes.func.isRequired
}

export default QuickQuoteLevel
