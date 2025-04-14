function displayParagraph(paragraph) {
    const textContainer = document.getElementById('text-to-type');
    if (!textContainer) {
      console.error("Text container not found");
      return;
    }
  
    const words = paragraph.trim().split(/\s+/);
  
    const formatted = words.map((word, index) => {
      return `<span class="word-hint" data-index="${index}">${word}</span>`;
    }).join(' ');
  
    textContainer.innerHTML = formatted;
  }

  export async function fetchRandomPoem() {
    try {
      const response = await fetch('https://poetrydb.org/random');
      const data = await response.json();
      
      if (data && data.length > 0) {
        const poemText = data[0].lines.join(' ');

        const wordLimit = 200;
        const words = poemText.split(' ');

        const limitedText = words.slice(0, wordLimit).join(' ');
  
        displayParagraph(limitedText);
      }
    } catch (error) {
      console.error("Failed to fetch poem:", error);
    }
  }