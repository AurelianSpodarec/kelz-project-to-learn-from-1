import React, { useContext, Fragment } from "react"
import { capitalize, get, isEmpty } from "lodash"
import { v4 as uuid } from "uuid"
import { colours } from "@4cplatform/elements/Helpers"
import { Modal, Collapse, Skeleton } from "@4cplatform/elements/Molecules"
import { P, SmallText } from "@4cplatform/elements/Typography"
import { Container } from "@4cplatform/elements/Atoms"
import { QuerySelect } from "@4cplatform/elements/Forms"

// Helpers
import { JourneyContext } from "../../journey.context"
import { renderProviderOptions } from "../../../../Helpers"

// Components
import { Search } from "../../../../Molecules"
import { Divider, ResultsContainer } from "./faqModal.styles"

const FaqModal = () => {
  const { setFaqModal, faqQuery, faqQueryResults, faqsLoading, setFaqQuery } =
    useContext(JourneyContext)

  const search = get(faqQuery, "search", "")

  const formatProviderValue = value => {
    if (value === "The Exeter") {
      return "EXETER"
    }
    return value.toUpperCase()
  }

  return (
    <Modal title="FAQ's" hasPadding={false} onClose={() => setFaqModal(false)}>
      <Container margin="0" padding="2rem" backgroundColour={get(colours, "veryFaintGrey")}>
        <Search
          width="100%"
          charLimit={1}
          name="search_frequently_asked_questions"
          label="Search frequently asked questions"
          placeholder="Enter a search term (e.g payments)"
          handleChange={val => setFaqQuery({ ...faqQuery, search: val })}
          onCancel={() => setFaqQuery({ ...faqQuery, search: "" })}
          dependencies={[faqQuery]}
        />
        <QuerySelect
          name="provider"
          label="Provider"
          noun={{ singular: "provider", plural: "providers" }}
          endpoint="/providers"
          render={data => renderProviderOptions(data, false)}
          onChange={val => setFaqQuery({ ...faqQuery, provider: formatProviderValue(val) })}
        />
      </Container>
      <ResultsContainer
        margin="0"
        height={`${isEmpty(faqQueryResults) && !faqsLoading ? "8rem" : "40rem"}`}
        padding="2rem"
      >
        {faqsLoading && <Skeleton count={9} wrapper={P} />}
        {!isEmpty(faqQueryResults) &&
          !faqsLoading &&
          faqQueryResults.map(result => (
            <Fragment key={uuid()}>
              <Collapse
                headerContent={
                  <>
                    <P
                      margin="0.5rem 0"
                      colour={get(colours, "blue")}
                      dangerouslySetInnerHTML={{
                        __html: get(result, "question", "").replace(
                          new RegExp(search, "g"),
                          `<strong>${search}</strong>`
                        )
                      }}
                    />
                    <>{capitalize(get(result, "provider_key", "General"))}</>
                  </>
                }
                bodyContent={<SmallText margin="1.2rem 0">{result.answer}</SmallText>}
              />
              {faqQueryResults.length - 1 !== faqQueryResults.indexOf(result) && <Divider />}
            </Fragment>
          ))}
        {isEmpty(faqQueryResults) && !faqsLoading && (
          <P margin="1rem 0">No data is available for display</P>
        )}
      </ResultsContainer>
    </Modal>
  )
}

export default FaqModal
