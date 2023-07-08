export interface VoxSenseOptions {
  /**
   * Controls whether continuous results are returned for each recognition, or only a single result. 
   * 
   * @default true
   */
	continuous?: boolean;

  /**
   * Controls whether interim results should be returned or not.
   * Interim results are results that are not yet final. 
   * 
   * @default true
   */
	interimResults?: boolean;

	/**
	 * Fired when the speech recognition service returns a result.
	 *
	 * @param e
	 * @returns
	 */
	onContinuousResult?: (e: SpeechRecognitionEvent) => void;
}
