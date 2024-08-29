import React from "react"
import PropTypes from "prop-types"
import { get } from "lodash"

// Components
import { H1 } from "@4cplatform/elements/Typography"
import Category from "./dashboard.category"
import { DashWrapper, CategoriesWrapper, DashHeader } from "./dashboard.styles"

const Dashboard = ({ dashboard, title, isLoading }) => (
  <DashWrapper>
    <DashHeader>
      <H1 margin="0" isLoading={isLoading}>
        {title}
      </H1>
    </DashHeader>
    <CategoriesWrapper>
      {dashboard.map((category, i) => (
        <Category
          category={category}
          key={get(category, "title", i)}
          isFirst={i === 0}
          isLast={i === dashboard.length - 1}
          length={dashboard.length}
          index={i}
          isLoading={isLoading}
        />
      ))}
    </CategoriesWrapper>
  </DashWrapper>
)

Dashboard.defaultProps = {
  title: "Let's start your client journey",
  isLoading: false
}

Dashboard.propTypes = {
  dashboard: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.shape({
        title: PropTypes.string,
        colour: PropTypes.string,
        icon: PropTypes.any,
        route: PropTypes.string,
        links: PropTypes.arrayOf(
          PropTypes.shape({
            title: PropTypes.string,
            description: PropTypes.string,
            route: PropTypes.string
          })
        )
      }),
      PropTypes.array
    ])
  ).isRequired,
  title: PropTypes.string,
  isLoading: PropTypes.bool
}

export default Dashboard
