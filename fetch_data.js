
export async function fetchRandomPoem() {
    try {
      const response = await fetch('https://poetrydb.org/random')
      const data = await response.json()
      
      if (data && data.length > 0) {
        const poemText = data[0].lines.join(' ')

        const wordLimit = 200
        const words = poemText.split(' ')

        const limitedText = words.slice(0, wordLimit).join(' ')
        return limitedText
      }
    } catch (error) {
      console.error("Failed to fetch poem:", error)
    }
  }