let timer
let timeLeft = 60
let timerStarted = false

export function resetTimer() {
  clearInterval(timer)
  timeLeft = 60
  timerStarted = false
  updateTimerDisplay(timeLeft)
}

export function startTimer() {
  if (timerStarted) return

  if (timer) clearInterval(timer)

  timer = setInterval(() => {
    timeLeft--
    updateTimerDisplay(timeLeft)

    if (timeLeft <= 0) {
      clearInterval(timer)
      disableInputField()
    }
  }, 1000)

  timerStarted = true
}

function updateTimerDisplay(time) {
  const minutes = Math.floor(time / 60)
  const seconds = time % 60
  document.getElementById('time').textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

function disableInputField() {
  document.getElementById('input-field').disabled = true
}

function onUserStartTyping() {
  if (!timerStarted) {
    startTimer()
  }
}

document.getElementById('input-field').addEventListener('keydown', onUserStartTyping)
