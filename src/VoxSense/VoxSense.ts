import { VoxSenseOptions } from './VoxSense.types';

export class VoxSense {
	private recognition!: SpeechRecognition;

	constructor() {
		this.initialize();
	}

  /**
   * Initialize SpeechRecognition. 
   */
	private initialize() {
		const SpeechRecognition =
			window.SpeechRecognition || window.webkitSpeechRecognition;
		// TODO: Add Mozilla, Safari, and Edge compatibility

		// TODO: Handle if browser is unsupported, permission is blocked, and permission is denied.
		this.recognition = new SpeechRecognition();
	}

  /**
   * Set recognition options.
   * 
   * @param options 
   */
	private setOptions(options: VoxSenseOptions) {
		this.recognition.continuous = options.continuous ?? true;
		this.recognition.interimResults = options.interimResults ?? true;
		this.recognition.onresult = options.onContinuousResult ?? null;
	}

  /**
   * 
   * Starts the speech recognition service listening to incoming audio.
   * 
   * @param options 
   */
	start(options?: VoxSenseOptions) {
		if (options) this.setOptions(options);

		this.recognition.start();
	}


  /**
   * Stops the speech recognition service from listening to incoming audio.
   */
	stop() {
		this.recognition.stop();
	}
}
