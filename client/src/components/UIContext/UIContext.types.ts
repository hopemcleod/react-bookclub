/**
 * Configuration type for a confirm modal.
 */
export type ConfirmModalConfig = {
    /**
     * True to display the acknowledge modal.
     */
    acknowledge?: boolean;
    /**
     * Optional override for the cancel label.
     */
    cancelLabel?: string;
    /**
     * Optional override for the confirm label.
     */
    confirmLabel?: string;
    /**
     * Handler called when confirm is clicked.
     */
    onConfirm: () => void;
    /**
     * The sub title text to display.
     */
    subTitle: string;
    /**
     * The title text to display.
     */
    title: string;
  };
  
  /**
   * Configuration type for a delete modal.
   */
  export type DeleteModalConfig = {
    /**
     * Optional override for the archive label.
     */
    archiveLabel?: string;
    /**
     * The archive sub title text to display.
     */
    archiveSubtitle?: string;
    /**
     * True if the record can be archived.
     */
    canArchive?: boolean;
    /**
     * Optional override for the cancel label.
     */
    cancelLabel?: string;
    /**
     * Optional override for the confirm label.
     */
    confirmLabel?: string;
    /**
     * Optional override for the delete label.
     */
    deleteLabel?: string;
    /**
     * Handler called when archive is clicked.
     */
    onArchive?: () => void;
    /**
     * Handler called when delete is clicked.
     */
    onDelete: () => void;
    /**
     * The sub title text to display.
     */
    subTitle: string;
    /**
     * The title text to display.
     */
    title: string;
  };
  
  /**
   * Configuration type for a snackbar.
   */
  export type SnackbarConfig = {
    /**
     * The snackbar message.
     */
    message: string;
    /**
     * The snackbar type.
     */
    type?: 'info' | 'success' | 'warning' | 'error';
    /**
     * The optional url to click to view the associated record.
     */
    clickToViewUrl?: string;
  };
  
  export const MASK_EVENT = 'maskEvent';
  export const UNMASK_EVENT = 'unmaskEvent';
  
  export const MODAL_ACKNOWLEDGE_EVENT = 'modalAcknowledgeEvent';
  export const MODAL_CLOSE_EVENT = 'modalCloseEvent';
  export const MODAL_CONFIRM_EVENT = 'modalConfirmEvent';
  export const MODAL_DELETE_EVENT = 'modalDeleteEvent';
  
  export const SET_HEADER_EVENT = 'setHeaderEvent';
  export const SET_HEADER_CONTENT_EVENT = 'setHeaderContentEvent';
  export const SET_TITLE_EVENT = 'setTitleEvent';
  
  export const SNACKBAR_DEQUEUE_EVENT = 'snackbarDequeueEvent';
  export const SNACKBAR_DISPLAY_EVENT = 'snackbarDisplayEvent';
  export const SNACKBAR_ENQUEUE_EVENT = 'snackbarEnqueueEvent';
  
  /**
   * State type for UIProvider.
   */
  export type UIContextState = {
    /**
     * The current confirm modal config.
     */
    confirmModal?: ConfirmModalConfig;
    /**
     * The current delete modal config.
     */
    deleteModal?: DeleteModalConfig;
    /**
     * True to mask the UI.
     */
    masked: boolean;
    /**
     * True to show a confrimation modal.
     */
    showConfirmationModal: boolean;
    /**
     * True to show a delete modal.
     */
    showDeleteModal: boolean;
    /**
     * True to show a snackbar.
     */
    showSnackbar: boolean;
    /**
     * The current snackbar config.
     */
    snackbar?: SnackbarConfig;
    /**
     * The title displayed in the browser tab.
     */
    title: string;
  };
  
  /**
   * State tyoe for the Header.
   */
  export type UIContextHeaderState = {
    /**
     * The text to display in the header.
     */
    header?: string;
    /**
     * The content to display in the header.
     */
    headerContent?: JSX.Element;
  };
  