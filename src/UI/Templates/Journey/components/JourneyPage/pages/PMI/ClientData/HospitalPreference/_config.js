import { number } from "yup"

export const config = () => ({
  title: "Hospital preference",
  sections: [
    {
      key: "preferred_hospital",
      components: [
        {
          key: "preferred_hospital",
          initialValue: null,
          validationSchema: number().integer().positive().nullable(),
          label: "Prefered hospital"
        }
      ]
    }
  ]
})
