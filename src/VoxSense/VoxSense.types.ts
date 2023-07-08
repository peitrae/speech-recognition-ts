export interface VoxSenseResult {
  transcript: string,
  confidence: number,
  isFinal: boolean
}

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
	 * Fired when the speech recognition returns a result.
	 *
	 * @param result
	 * @returns
	 */
	onContinuousResult?: (result: VoxSenseResult) => void;

  /**
	 * Fired when the speech recognition return a final result.
	 *
	 * @param result
	 * @returns
	 */
  onFinalResult?: (result: VoxSenseResult) => void;
}
