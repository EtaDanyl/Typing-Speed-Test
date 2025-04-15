import { startTimer } from './timer.js';
import { fetchRandomPoem } from './fetch_data.js';

const textContainer = document.getElementById('text-to-type')
const inputContainer = document.getElementById('input-field')
const wpmElement = document.getElementById('wpm')
const accuracyElement = document.getElementById('accuracy')
let correctChars = 0
let totalKeyPresses = 0
let totalTypedChars = 0
let startTime = null

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

function updateStats() {
  if (!startTime) return;

  const elapsedTimeInMinutes = (Date.now() - startTime) / 1000 / 60
  const wpm = Math.round((correctChars / 5) / elapsedTimeInMinutes)
  const accuracy = Math.round((correctChars / totalKeyPresses) * 100) || 0

  wpmElement.innerText = wpm
  accuracyElement.innerText = `${accuracy}%`
}

function textAnalyzer() {
  const arrayText = textContainer.querySelectorAll('span')
  const arrayValue = inputContainer.value.split('')

  correctChars = 0

  arrayText.forEach((characterSpan, index) => {
    const character = arrayValue[index]
    if (character == null) {
      characterSpan.classList.remove('correct')
      characterSpan.classList.remove('incorrect')
    } else if (character === characterSpan.innerText) {
      characterSpan.classList.add('correct')
      characterSpan.classList.remove('incorrect')
      correctChars++
    } else {
      characterSpan.classList.remove('correct')
      characterSpan.classList.add('incorrect')
    }
  })

  updateStats()
}


window.onload = async () => {
  const fetchedText = await fetchRandomPoem();
  displayParagraph(fetchedText)

  document.getElementById('input-field').addEventListener('keydown', () => {
    if (!startTime) {
      startTime = Date.now()
      startTimer()
    }
  })

  inputContainer.addEventListener('input', (e) => {
    const inputType = e.inputType;
  
    if (inputType !== 'deleteContentBackward') {
      totalKeyPresses++;
    }
  
    textAnalyzer();
  });
}
