/**
 * Represents a dialog box.
 */
export interface DialogData {
  /** The title of the dialog. */
  title: string;
  /** The confirmation message. */
  message: string;

  primaryBtnText: string;

  secondaryBtnText?: string;

  type: 'confirmation';
}
