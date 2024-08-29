import React from "react"
import moment from "moment"
import { get } from "lodash"
import { Table } from "@4cplatform/elements/Organisms"
import { colours } from "@4cplatform/elements/Helpers"

// Helpers
import { ApiStatusContext } from "./status.context"

// Components
import { IconWithText } from "../../Atoms"

const ApiStatusAdmin = () => {
  const { data, pagination, setPage, setPerPage, isLoading } = React.useContext(ApiStatusContext)

  return (
    <>
      <Table
        data={data}
        isLoading={isLoading}
        name="api_status"
        columns={[
          { label: "Provider", dataKey: "friendly_name", minWidth: "100px" },
          {
            label: "Status",
            dataKey: "status",
            minWidth: "100px",
            render: row => {
              const isActive = get(row, "data.status")
              return (
                <IconWithText
                  icon={isActive ? "check-circle" : "close-circle"}
                  content={isActive ? "Success" : "Failure"}
                  iconColour={isActive ? get(colours, "green") : get(colours, "red")}
                  margin="0"
                />
              )
            }
          },
          {
            label: "Message",
            dataKey: "message",
            minWidth: "100px"
          },
          {
            label: "Response time",
            dataKey: "duration",
            minWidth: "100px",
            render: row => {
              const secs = get(row, "data.duration")
              return moment(secs * 1000).format("mm:ss")
            }
          }
        ]}
        hasActions={false}
        pagination={pagination}
        changePage={e => setPage(e)}
        changePerPage={setPerPage}
        hasPerPage
        perPageOptions={{ max: 50, interval: 5 }}
      />
    </>
  )
}

export default ApiStatusAdmin
