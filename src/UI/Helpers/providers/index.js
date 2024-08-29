import { A } from "@4cplatform/elements/Typography"

/**
 *  A helper function for generating anchor links. Returns <A /> component.
 * @param {string} type
 * @param {string} href
 * @param {string} appearance
 */
export const renderA = (type = "url", href = "", appearance = "dark") => {
  let hrefPrefix = ""
  if (type === "phone") hrefPrefix = "tel:"
  if (type === "email") hrefPrefix = "mailto:"

  return href ? (
    <A target="_blank" fontSize="1.6rem" href={`${hrefPrefix}${href}`} appearance={appearance}>
      {href}
    </A>
  ) : (
    "-"
  )
}
