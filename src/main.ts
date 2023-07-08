import VoxSense from './VoxSense';
import { VoxSenseResult } from './VoxSense/VoxSense.types';
import './styles.sass';


function toggleRecord() {
	if (recordBtn.style['animationName'] === 'flash') {
		voxSense.stop();

		recordBtn.style['animationName'] = 'none';
		content.innerText = '';
	} else {
		voxSense.start();

		recordBtn.style['animationName'] = 'flash';
	}
}

function showTranscriptResult(result: VoxSenseResult) {
	content.innerText = result.transcript;
}

const voxSense = new VoxSense({ onContinuousResult: showTranscriptResult});

const content = document.querySelector<HTMLDivElement>('#content')!;
const recordBtn = document.querySelector<HTMLButtonElement>('#record')!;
recordBtn.addEventListener('click', toggleRecord);
