import './styles.sass';


function toggleRecord() {
	if (recordBtn.style['animationName'] === 'flash') {
		recognition.stop();

		recordBtn.style['animationName'] = 'none';
		content.innerText = '';
	} else {
		recognition.start();

		recordBtn.style['animationName'] = 'flash';
	}
}

function initSpeechRecognition(onResult: (e: SpeechRecognitionEvent) => void) {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  
	const recognition = new SpeechRecognition();

	recognition.continuous = false;
	recognition.interimResults = true;

	recognition.onresult = onResult;

	return recognition;
}

function showTranscriptResult(event: SpeechRecognitionEvent) {
	let result = '';

	for (let i = event.resultIndex; i < event.results.length; i++) {
		result += event.results[i][0].transcript;
	}

	content.innerText = result;
}

const content = document.querySelector<HTMLDivElement>('#content')!;
const recordBtn = document.querySelector<HTMLButtonElement>('#record')!;
recordBtn.addEventListener('click', toggleRecord);

const recognition = initSpeechRecognition(showTranscriptResult);
