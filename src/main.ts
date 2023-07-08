import VoxSense from './VoxSense';
import './styles.sass';


function toggleRecord() {
	if (recordBtn.style['animationName'] === 'flash') {
		voxSense.stop();

		recordBtn.style['animationName'] = 'none';
		content.innerText = '';
	} else {
		voxSense.start({ onContinuousResult: showTranscriptResult});

		recordBtn.style['animationName'] = 'flash';
	}
}

function showTranscriptResult(event: SpeechRecognitionEvent) {
	let result = '';

	for (let i = event.resultIndex; i < event.results.length; i++) {
		result += event.results[i][0].transcript;
	}

	content.innerText = result;
}

const voxSense = new VoxSense();

const content = document.querySelector<HTMLDivElement>('#content')!;
const recordBtn = document.querySelector<HTMLButtonElement>('#record')!;
recordBtn.addEventListener('click', toggleRecord);
