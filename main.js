import { startTimer } from './timer.js';
import { fetchRandomPoem } from './fetch_data.js';

const textContainer = document.getElementById('text-to-type')
const inputContainer = document.getElementById('input-field')

function displayParagraph(paragraph) {
  if (!textContainer) {
    console.error("Text container not found")
    return
  }

  const cleanText = paragraph
  .replace(/[\n\r\t]+/g, ' ')
  .replace(/\s+/g, ' ')    
  .trim()

  textContainer.innerHTML = ''
  cleanText.split('').forEach(character => {
    const characterSpan = document.createElement('span')
    characterSpan.innerText = character
    textContainer.appendChild(characterSpan)
  })
}

function randomFunction() {
  const arrayText = textContainer.querySelectorAll('span')
  const arrayValue = inputContainer.value.split('')
  arrayText.forEach((characterSpan, index) => {
    const character = arrayValue[index]
    if (character == null) {
      characterSpan.classList.remove('correct')
      characterSpan.classList.remove('incorrect')
    } else if (character === characterSpan.innerText) {
      characterSpan.classList.add('correct')
      characterSpan.classList.remove('incorrect')
    } else {
      characterSpan.classList.remove('correct')
      characterSpan.classList.add('incorrect')
    }
  })
}

window.onload = async () => {
  const fetchedText = await fetchRandomPoem();
  displayParagraph(fetchedText)

  document.getElementById('input-field').addEventListener('keydown', () => {
    startTimer()
  })

  inputContainer.addEventListener('input', () => {
    randomFunction()
  })
}
