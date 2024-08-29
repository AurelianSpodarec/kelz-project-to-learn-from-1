import React, { useContext } from "react"
import { get, isEmpty, isNull } from "lodash"

import { Container } from "@4cplatform/elements/Atoms"
import { Button } from "@4cplatform/elements/Molecules"
import { H1 } from "@4cplatform/elements/Typography"

// Helpers
import { JourneyContext } from "./journey.context"
import { DASHBOARD } from "../../../config/pages"

// Components
import {
  JourneyNav,
  JourneyPage,
  JourneyPanel,
  SubmitModal,
  PrevModal,
  FaqModal
} from "./components"
import { Breadcrumbs } from "../../Molecules"
import { JourneyWrapper, StickyNav, JourneyHeaderWrapper } from "./journey.styles"

const Journey = () => {
  const {
    data,
    onPageSubmit,
    hasSubmitModal,
    setSubmitModal,
    onClickPrevious,
    onClickNext,
    isLoading,
    disablePrevious,
    disableNext,
    hasPreviousModal,
    setPreviousModal,
    setFaqModal,
    hasFaqModal,
    formik
  } = useContext(JourneyContext)

  const productType = get(data, "journey.product_type", "PMI")
  const isLocked = get(data, "journey.locked", false)

  return (
    <>
      <Container width="80%">
        <JourneyHeaderWrapper>
          <Container width="100%" margin="0" padding="0">
            <Breadcrumbs
              trail={[
                { label: "Dashboard", link: DASHBOARD.path },
                { label: `${productType} Journey` }
              ]}
            />
            <H1 isLoading={isLoading}>{`${productType} Journey`}</H1>
          </Container>
          <Button type="inline-button" onClick={() => setFaqModal(true)} name="faq_s">
            FAQ's
          </Button>
        </JourneyHeaderWrapper>

        <JourneyWrapper>
          <JourneyNav />
          <JourneyPage />
        </JourneyWrapper>
      </Container>
      {!isNull(data) && (
        <StickyNav hasSingleButton={disablePrevious} isVisible={!isNull(data) || !isLoading}>
          {!disablePrevious && (
            <Button
              leadingIcon="chevron-left"
              onClick={() => {
                if (get(formik, "dirty", false)) {
                  setPreviousModal(true)
                } else {
                  onClickPrevious()
                }
              }}
              name="journey_previous"
              isDisabled={isLoading}
            >
              Previous
            </Button>
          )}
          <Button
            onClick={() => {
              if (!isLocked) {
                if (!isEmpty(get(data, "page.modals.submit", []))) {
                  setSubmitModal(true)
                } else {
                  onPageSubmit()
                }
              } else {
                onClickNext()
              }
            }}
            appearance={isLocked ? "primary" : "success"}
            trailingIcon={isLocked ? "chevron-right" : "check"}
            name="journey_save"
            isDisabled={disableNext || isLoading}
          >
            {isLocked ? "Next" : "Save and Continue"}
          </Button>
        </StickyNav>
      )}
      <JourneyPanel />
      {hasSubmitModal && <SubmitModal />}
      {hasPreviousModal && <PrevModal />}
      {hasFaqModal && <FaqModal />}
    </>
  )
}

export default Journey
