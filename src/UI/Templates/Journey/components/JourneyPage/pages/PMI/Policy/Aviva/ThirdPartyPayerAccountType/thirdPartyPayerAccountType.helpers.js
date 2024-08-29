export const getOptions = provider => {
  switch (provider) {
    case "bupa":
      return [
        { order: 0, label: "Sole", value: "Sole" },
        { order: 1, label: "Company", value: "Company" }
      ]
    default:
      return [
        { order: 0, label: "Sole", value: "Sole" },
        { order: 1, label: "Joint", value: "Joint" },
        { order: 2, label: "Company", value: "Company" }
      ]
  }
}
