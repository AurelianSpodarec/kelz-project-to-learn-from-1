import React, { useContext, useState } from "react"
import PropTypes from "prop-types"
import { get, find } from "lodash"
import { useFormik } from "formik"
import { object, string, boolean } from "yup"
import { useHistory } from "react-router-dom"
import { AuthContext } from "@4cplatform/elements/Auth"
import { QuerySelect, Checkbox } from "@4cplatform/elements/Forms"
import { Modal, ComplianceNote, Button } from "@4cplatform/elements/Molecules"
import { H3, H4, P, SmallText } from "@4cplatform/elements/Typography"

// Components
import { ButtonsWrapper } from "./journey.styles"

const StartJourney = ({
  clientId,
  onStartJourney,
  isJourneyLoading,
  clientJourneys,
  isDataLoading
}) => {
  const { user } = useContext(AuthContext)

  const [modal, setModal] = useState(false)

  const history = useHistory()

  const simulationMode = get(
    find(user.settings, ({ key }) => key === "SIMULATION_MODE"),
    "data.value",
    false
  )

  const validationSchema = object({
    product_type: string().required("MISSING_REQUIRED_FIELD"),
    simulation_mode: simulationMode
      ? boolean().oneOf([true], "MISSING_REQUIRED_FIELD").required()
      : boolean()
  })
  const selectJourneyFormik = useFormik({
    initialValues: {
      product_type: "",
      simulation_mode: simulationMode
    },
    validationSchema,
    onSubmit: body => onStartJourney({ body })
  })
  const { handleSubmit } = selectJourneyFormik
  const formik = { ...selectJourneyFormik, validationSchema }

  return (
    <>
      <Button
        appearance="success"
        trailingIcon="arrow-right"
        isLoading={isDataLoading}
        margin="2rem 0"
        onClick={() => {
          setModal(true)
        }}
        name="start_journey"
      >
        Start journey
      </Button>
      {modal && (
        <Modal title="Commence journey" onClose={() => setModal(false)}>
          <QuerySelect
            name="product_type"
            label="Select a product type"
            noun={{ singular: "product type", plural: "product types" }}
            endpoint="/product-types"
            render={data => {
              const keys = Object.keys(data)
              return keys.map((key, i) => {
                if (data[key].status === "active") {
                  return (
                    <option
                      value={key}
                      key={`product_type_key-option_${i}`}
                      data-testid={`product_type_key-option_${i}`}
                    >
                      {get(data, `[${key}].name`)}
                    </option>
                  )
                }
                return ""
              })
            }}
            formik={formik}
            margin="0 0 3rem"
          />

          {/* If simulation mode is not on and there are no incomplete journeys  */}
          {!simulationMode && !clientJourneys > 0 && (
            <ButtonsWrapper>
              <Button
                onClick={handleSubmit}
                appearance="success"
                isDisabled={simulationMode || clientJourneys > 0}
                isLoading={isJourneyLoading}
                trailingIcon="chevron-right"
                name="start_journey_modal"
              >
                Start
              </Button>
              <Button
                onClick={() => setModal(false)}
                appearance="error"
                isLoading={isJourneyLoading}
                trailingIcon="cancel"
                name="cancel_journey_modal"
              >
                Cancel
              </Button>
            </ButtonsWrapper>
          )}

          {/* If simulation mode is on */}
          {simulationMode && (
            <ComplianceNote type="error" margin="0 0 3rem">
              <H3 margin="1rem 0 2rem">Simulation mode is currently active</H3>
              <SmallText>
                Simulation mode is for training purposes only and should never be used for quoting
                or advising a client.
              </SmallText>
              <SmallText>
                To ensure accurate pricing, reports and documentation, please switch to the live
                environment before progressing to the next stage.
              </SmallText>

              {/* If simulation mode is on and there are no incomplete journeys */}
              {!clientJourneys > 0 && (
                <>
                  <H4 margin="0 0 3rem">Is this a training exercise?</H4>

                  <ButtonsWrapper>
                    <Button
                      onClick={handleSubmit}
                      isLoading={isJourneyLoading}
                      trailingIcon="chevron-right"
                      name="new_journey"
                      appearance="success"
                    >
                      Yes
                    </Button>

                    <Button
                      onClick={() => setModal(false)}
                      appearance="error"
                      isLoading={isJourneyLoading}
                      trailingIcon="cancel"
                      name="cancel_journey_modal"
                    >
                      No
                    </Button>
                  </ButtonsWrapper>
                </>
              )}

              {clientJourneys > 0 && (
                <Checkbox
                  label="Continue with simulation mode"
                  margin="0 0 1.5rem"
                  name="simulation_mode"
                  formik={formik}
                />
              )}
            </ComplianceNote>
          )}

          {/* If there are incomplete journeys */}
          {clientJourneys > 0 && (
            <ComplianceNote type="error">
              <P>You have incomplete journeys</P>
              <SmallText>
                There {clientJourneys > 1 ? "are" : "is"} {clientJourneys} incomplete journey
                {clientJourneys > 1 ? "s" : ""} associated with this client.
              </SmallText>

              <ButtonsWrapper>
                <Button
                  onClick={handleSubmit}
                  isLoading={isJourneyLoading}
                  trailingIcon="chevron-right"
                  name="new_journey"
                >
                  Start a New journey
                </Button>

                <Button
                  onClick={() => {
                    history.push(
                      `/journeys?status=IN_PROGRESS&status=QUOTED${
                        clientId ? `&client_id=${clientId}` : ""
                      }`
                    )
                  }}
                  type="inline-button"
                  data-testid="view_incomplete_journeys_link"
                >
                  View incomplete journeys
                </Button>
              </ButtonsWrapper>
            </ComplianceNote>
          )}
        </Modal>
      )}
    </>
  )
}

StartJourney.propTypes = {
  /**
   * Selected client id
   */
  clientId: PropTypes.number,
  /**
   * Loading prop for journey
   */
  isJourneyLoading: PropTypes.bool.isRequired,
  /**
   * The submit function for starting the journey
   */
  onStartJourney: PropTypes.func.isRequired,
  /**
   * The selectedClient journeys
   */
  clientJourneys: PropTypes.number.isRequired,
  /**
   * Loading data to start a journey
   */
  isDataLoading: PropTypes.bool.isRequired
}

export default StartJourney
