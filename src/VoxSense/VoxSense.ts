import { VoxSenseOptions, VoxSenseResult } from './VoxSense.types';

export class VoxSense {
	private recognition!: SpeechRecognition;
	private options?: VoxSenseOptions;

	constructor(options?: VoxSenseOptions) {
		this.initialize();

		if (options) this.setOptions(options);
	}

	/**
	 * Initialize SpeechRecognition.
	 */
	private initialize() {
		const SpeechRecognition =
			window.SpeechRecognition || window.webkitSpeechRecognition;
		// TODO: Add Mozilla, Safari, and Edge compatibility

		if (!SpeechRecognition) {
			throw new Error('This browser does not support SpeechRecognition');
		}

		this.recognition = new SpeechRecognition();
	}

	/**
	 * Set recognition options.
	 *
	 * @param options
	 */
	private setOptions(options: VoxSenseOptions) {
		this.options = options;

		this.recognition.continuous = options.continuous ?? true;
		this.recognition.interimResults = options.interimResults ?? true;

		this.recognition.onresult = this.onResult.bind(this);
		this.recognition.onerror = this.onError.bind(this);
	}

	/**
	 * Parse speech recognition result that is `SpeechRecognitionEvent` to `VoxSenseResult`.
	 *
	 * @param e
	 * @returns
	 */
	private parseResult(e: SpeechRecognitionEvent): VoxSenseResult {
		let result = {
			transcript: '',
			confidence: 0,
			isFinal: true,
		};

		for (let i = e.resultIndex; i < e.results.length; i++) {
			result = {
				transcript: (result.transcript += e.results[i][0].transcript),
				confidence: e.results[i][0].confidence,
				isFinal: e.results[i].isFinal,
			};
		}

		return result;
	}

	/**
	 * Fired when the speech recognition returns a result.
	 *
	 * @param e
	 * @returns
	 */
	private onResult(e: SpeechRecognitionEvent) {
		const result = this.parseResult(e);

		if (!this.options) {
			return;
		}

		const { onContinuousResult, onFinalResult } = this.options;

		if (onContinuousResult) {
			onContinuousResult(result);
		}

		if (result.isFinal && onFinalResult) {
			onFinalResult(result);
		}
	}

  /**
   * Throw speech recognition error.
   * 
   * @param e 
   */
	private onError(e: SpeechRecognitionErrorEvent) {
		throw new Error(e.error);
	}

	/**
	 *
	 * Starts the speech recognition service listening to incoming audio.
	 *
	 * @param options
	 */
	start() {
		this.recognition.start();
	}

	/**
	 * Stops the speech recognition service from listening to incoming audio.
	 */
	stop() {
		this.recognition.stop();
	}
}
