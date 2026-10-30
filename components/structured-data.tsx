interface StructuredDataProps {
  id: string
  data: Record<string, unknown> | Record<string, unknown>[]
}

/** Render JSON-LD on the server, escaping HTML-significant characters. */
export function StructuredData({ id, data }: StructuredDataProps) {
  const json = JSON.stringify(data).replace(
    /[<>&\u2028\u2029]/g,
    (character) => {
      const escapes: Record<string, string> = {
        '<': '\\u003c',
        '>': '\\u003e',
        '&': '\\u0026',
        '\u2028': '\\u2028',
        '\u2029': '\\u2029',
      }
      return escapes[character]
    },
  )
  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  )
}
