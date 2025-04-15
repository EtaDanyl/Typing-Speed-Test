
export async function fetchRandomText() {
  try {
    const response = await fetch('https://fakerapi.it/api/v1/texts?_locale=en_EN&_quantity=1&_characters=1000')
    const data = await response.json()

    if (data && data.data && data.data.length > 0) {
      const rawText = data.data[0].content

      const wordLimit = 200
      const words = rawText.split(' ')
      const limitedText = words.slice(0, wordLimit).join(' ')

      return limitedText
    }
  } catch (error) {
    console.error("Failed to fetch text:", error)
  }
}