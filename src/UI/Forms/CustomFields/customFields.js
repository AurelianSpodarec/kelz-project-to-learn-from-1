import React from "react"
import PropTypes from "prop-types"
import { get } from "lodash"
import { Icon } from "@4cplatform/elements/Atoms"
import { Select, Input, TextArea } from "@4cplatform/elements/Forms"
import { Button } from "@4cplatform/elements/Molecules"
import { colours } from "@4cplatform/elements/Helpers"
import { FieldArray, FormikProvider } from "formik"

// Components
import {
  Wrapper,
  ItemWrapper,
  FieldWrapper,
  TypeWrapper,
  SelectWrapper,
  InnerWrapper,
  CancelButton
} from "./customFields.styles"

const CustomFields = ({ name, formik, margin, addLabel, apiErrors }) => {
  const items = get(formik, `values.${name}`, [])

  return (
    <FormikProvider value={formik}>
      <Wrapper margin={margin} data-testid={`${name}-custom_fields-wrapper`}>
        <FieldArray
          name={name}
          render={arrayHelpers => (
            <>
              <InnerWrapper data-testid={`${name}-custom_fields-inner_wrapper`}>
                {items.map((item, index) => (
                  <ItemWrapper
                    index={index}
                    key={`${item.type}-${index}`}
                    data-testid={`${name}-custom_fields-item_wrapper_${index}`}
                    isLast={index + 1 === items.length}
                  >
                    <TypeWrapper>
                      <SelectWrapper>
                        <Select
                          name={`${name}.${index}.type`}
                          label="Contact type"
                          formik={formik}
                          margin="0"
                          apiErrors={apiErrors}
                        >
                          <option value="">Select type</option>
                          <option value="email">Email address</option>
                          <option value="phone">Phone number</option>
                          <option value="url">Website URL</option>
                        </Select>
                      </SelectWrapper>

                      {/* Remove field button */}
                      <CancelButton
                        onClick={() => {
                          arrayHelpers.remove(index)
                        }}
                        data-testid={`${name}-custom_fields-cancel_${index}`}
                      >
                        <Icon icon="trash-can" colour={colours.white} />
                      </CancelButton>
                    </TypeWrapper>

                    {item.type && (
                      <FieldWrapper>
                        <Input
                          name={`${name}.${index}.contact`}
                          label="Contact detail"
                          formik={formik}
                          margin="0 0 2rem"
                          apiErrors={apiErrors}
                          leadingText={item.type === "url" ? "https://" : null}
                        />
                        <TextArea
                          name={`${name}.${index}.description`}
                          label="Contact description"
                          formik={formik}
                          margin="0"
                          apiErrors={apiErrors}
                        />
                      </FieldWrapper>
                    )}
                  </ItemWrapper>
                ))}
              </InnerWrapper>

              {/* Add new field to the array */}
              <Button
                type="inline-button"
                appearance="primaryInline"
                leadingIcon="plus"
                onClick={() => {
                  arrayHelpers.push({
                    type: "",
                    contact: "",
                    description: ""
                  })
                }}
                name={`${name}_add_new`}
                margin="1rem 0 0 0"
              >
                {addLabel}
              </Button>
            </>
          )}
        />
      </Wrapper>
    </FormikProvider>
  )
}

CustomFields.defaultProps = {
  margin: "0 0 2rem",
  addLabel: "Add additional contact detail",
  apiErrors: {}
}

CustomFields.propTypes = {
  /**
   * A required prop that is used for formik controls
   */
  name: PropTypes.string.isRequired,
  /**
   * The formik instance that controls this component
   */
  formik: PropTypes.object.isRequired,
  /**
   * The margin prop passed to the wrapper
   */
  margin: PropTypes.string,
  /**
   * The text content of the Add Button
   */
  addLabel: PropTypes.string,
  /**
   * API errors, passed through for error handling
   */
  apiErrors: PropTypes.object
}

export default CustomFields
