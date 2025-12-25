
  window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  const recognition = new SpeechRecognition();
  recognition.interimResults = true;
  recognition.lang = 'en-US';
  
  const words = document.querySelector('.words');
  const statusDot = document.querySelector('.status-dot');
  const statusText = document.querySelector('.status-text');

  let p = document.createElement('p');
  words.appendChild(p);

  recognition.addEventListener('result', e => {
    const transcript = Array.from(e.results)
      .map(result => result[0])
      .map(result => result.transcript)
      .join('');

    const poopScript = transcript.replace(/poop|poo|shit|dump/gi, '💩');
    p.textContent = poopScript;

    if (e.results[0].isFinal) {
      p = document.createElement('p');
      words.appendChild(p);
      words.scrollTop = words.scrollHeight;
    }
  });

  recognition.addEventListener('start', () => {
    statusDot.classList.add('active');
    statusText.textContent = 'Listening...';
  });

  recognition.addEventListener('end', () => {
    statusDot.classList.remove('active');
    statusText.textContent = 'Mic paused';
    recognition.start();
  });

  recognition.addEventListener('error', (event) => {
    statusText.textContent = `Error: ${event.error}`;
    statusDot.classList.remove('active');
  });

  recognition.start();


