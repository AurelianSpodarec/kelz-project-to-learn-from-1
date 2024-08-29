import React, { useContext, useEffect, useRef, useState } from "react"
import { get, isEmpty } from "lodash"
import moment from "moment"
import { useFormik } from "formik"
import { object, string } from "yup"
import { v4 as uuid } from "uuid"
import { Button, Modal } from "@4cplatform/elements/Molecules"
import { AuthContext } from "@4cplatform/elements/Auth"
import { TextArea } from "@4cplatform/elements/Forms"
import { colours } from "@4cplatform/elements/Helpers"
import { P, SmallText } from "@4cplatform/elements/Typography"

// Helpers
import { PoliciesContext } from "./policies.context"

// Components
import {
  AvatarWrapper,
  MessageDateWrapper,
  MessageBody,
  MessageContainer,
  MessageIsSending,
  MessageMeta,
  Messages,
  MessageWrapper,
  NewMessagesWrapper,
  SectionWrapper,
  SvgWrapper,
  TextAreaControls,
  NoMessagesTextWraoper
} from "./policies.styles"
import { PanelBody } from "../../Molecules/FlyOutPanel"
import { Avatar } from "../../Atoms"
import TermsButtons from "./components/TermsButtons"
import { Tab, Tabs } from "../../Organisms"
import AcceptanceButtons from "./components/AcceptanceButtons"
import People from "./policies.panel.body.people"

const PoliciesPanelBody = () => {
  const {
    viewLoading,
    viewData,
    setMessagingModal,
    messagingModal,
    messages,
    submitMessage,
    submitMessageLoading
  } = useContext(PoliciesContext)
  const { user, canAccess } = useContext(AuthContext)
  const [scrollBehaviour, setScrollBehaviour] = useState("auto")
  const latestMessageRef = useRef(null)

  // New Message Formik instance
  const newMessageFormik = useFormik({
    initialValues: {
      body_text: ""
    },
    validationSchema: object({
      body_text: string().required("MISSING_REQUIRED_FIELD").nullable()
    }),
    onSubmit: (values, { resetForm }) => {
      submitMessage({
        body: values,
        user: `${get(user, "first_name", "")} ${get(user, "last_name", "")}`
      })
      resetForm({})
    }
  })

  const { handleSubmit } = newMessageFormik
  const formik = { ...newMessageFormik }

  // this useEffect is used to delay the smoothnest of the scroll, so that when component has mounted,
  // the latest message is avaliable to the user straight away, instead of seeing the div scroll all the way down
  useEffect(() => {
    const timeout = setTimeout(() => {
      setScrollBehaviour("smooth")
    }, 5000)

    return () => clearTimeout(timeout)
  }, [])

  useEffect(() => {
    if (latestMessageRef?.current)
      latestMessageRef.current.scrollIntoView({ behavior: scrollBehaviour })
  })
  const getMessages = () => {
    const currentUserName = `${get(user, "first_name", "")} ${get(user, "last_name", "")}`
    if (isEmpty(messages))
      return (
        <NoMessagesTextWraoper>
          <SmallText colour={get(colours, "lightGrey", "lightgrey")}>
            No messages to display
          </SmallText>
        </NoMessagesTextWraoper>
      )
    return messages?.map(message => {
      const isItMyMessage = message.user_name === currentUserName
      return (
        <MessageContainer isItMyMessage={isItMyMessage} key={uuid()}>
          <MessageWrapper>
            <MessageBody isItMyMessage={isItMyMessage}>
              <P appearance="light" margin="0">
                {message.body_text}
              </P>
            </MessageBody>
            <SvgWrapper isItMyMessage={isItMyMessage}>
              <svg viewBox="146.945 107.499 104.831 104.928" width="12" height="12">
                <path
                  style={{ fill: !isItMyMessage ? colours.purple : colours.paleGreen }}
                  d="M 146.945 107.504 L 148.124 212.427 C 153.981 164.796 154.534 127.262 251.776 107.499 L 146.945 107.504 Z"
                />
              </svg>
            </SvgWrapper>
          </MessageWrapper>

          <MessageMeta isItMyMessage={isItMyMessage}>
            <MessageDateWrapper>
              {!message?.sent_at && submitMessageLoading ? (
                <MessageIsSending isItMyMessage={isItMyMessage} />
              ) : (
                <SmallText colour={colours.lightGrey} margin="0 13px">
                  {moment(message?.sent_at).format("DD/MM/YYYY HH:mm:ss")}
                </SmallText>
              )}
            </MessageDateWrapper>

            <AvatarWrapper isItMyMessage={isItMyMessage}>
              <Avatar
                first={get(message, "user_name", "")?.split(" ")[0]}
                last={get(message, "user_name", "")?.split(" ")[1]}
                name={get(message, "user_name", "")}
              />
              <SmallText margin="0 0.5rem">{get(message, "user_name", "")}</SmallText>
            </AvatarWrapper>
          </MessageMeta>
        </MessageContainer>
      )
    })
  }

  return (
    <PanelBody>
      {canAccess(["SALES_ADVISER", "ORG_ADMIN"]) && (
        <SectionWrapper>
          <Button
            appearance="success"
            trailingIcon="email"
            onClick={() => setMessagingModal(true)}
            name="messaging_modal"
            isLoading={viewLoading}
            isDisabled={viewLoading}
          >
            Messaging
          </Button>
        </SectionWrapper>
      )}
      <SectionWrapper isLast>
        {get(viewData, "status", false) === "AWAITING_TERMS" && <TermsButtons />}
        {get(viewData, "status", false) === "AWAITING_ACCEPTANCE" && <AcceptanceButtons />}
      </SectionWrapper>
      {messagingModal && (
        <Modal
          title="Messages"
          onClose={() => setMessagingModal(false)}
          name="add_organisations"
          hasPadding={false}
        >
          <Messages id="messages">
            {getMessages()}
            <div ref={latestMessageRef} />
          </Messages>

          <NewMessagesWrapper>
            <TextArea
              maxlength="256"
              name="body_text"
              formik={formik}
              onChange={val => (val.length <= 256 ? formik.setFieldValue("body_text", val) : null)}
            />
            <TextAreaControls>
              <SmallText m="0" colour={colours.lightGrey}>
                {formik.values.body_text.length} of 256 characters
              </SmallText>
              <Button onClick={handleSubmit}>Send</Button>
            </TextAreaControls>
          </NewMessagesWrapper>
        </Modal>
      )}

      <Tabs type="panel" name="policies_panel" isLoading={viewLoading} margin="0 0 1rem">
        <Tab header="Details">
          <SmallText>Details</SmallText>
        </Tab>

        <Tab header="People">
          <People data={viewData.applicants} />
        </Tab>

        <Tab header="Disclosures">
          <SmallText>Disclosures</SmallText>
        </Tab>
      </Tabs>
    </PanelBody>
  )
}

export default PoliciesPanelBody
