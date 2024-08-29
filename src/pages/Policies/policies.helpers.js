export const getStatus = status => {
  switch (status) {
    case "":
      return []
    case "SOLD":
      return ["ACCEPTED", "ONBOARDED"]
    default:
      return [status]
  }
}
