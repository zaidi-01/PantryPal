/**
 * Represents an alert message.
 */
export interface Alert {
  /** The type of alert. */
  type: 'success' | 'error' | 'info' | 'warning';
  /** The message to display. */
  message: string;
}
