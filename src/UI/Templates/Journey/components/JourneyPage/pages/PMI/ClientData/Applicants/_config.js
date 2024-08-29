import { array, object, string } from "yup"

export const config = () => ({
  title: "Applicants",
  navTitle: "Applicants",
  subtitle: "",
  sections: [
    {
      key: "applicants",
      components: [
        {
          key: "applicants",
          initialValue: [],
          validationSchema: array(
            object({
              name: string().required("MISSING_REQUIRED_FIELD"),
              age: string().required("MISSING_REQUIRED_FIELD"),
              type: string().required("MISSING_REQUIRED_FIELD")
            })
          ),
          label: "Applicants",
          labels: {
            name: "Name",
            age: "Age",
            type: "Primary"
          }
        }
      ]
    }
  ]
})
