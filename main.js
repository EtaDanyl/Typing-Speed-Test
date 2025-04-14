import { startTimer } from './timer.js';
import { fetchRandomPoem } from './fetch_data.js';

  window.onload = () => {
    fetchRandomPoem(); 
    document.getElementById('input-field').addEventListener('keydown', () => {
        startTimer();
      });
  };