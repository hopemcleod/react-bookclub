import {
  IActionCollapse2,
  IActionExpand2,
  IActionRight,
  IActions,
  IAlert,
  IApproved,
  IArrowDown,
  IArrowLeft,
  IArrowRight,
  IArrowSwapVertical,
  IArrowUp,
  IAscending,
  IBarChart,
  IBox,
  ICalendar,
  ICertificate,
  IChat,
  ICheckboard,
  ICheckbox,
  IChevronDown,
  IChevronLeft,
  IChevronRight,
  IChevronUp,
  ICircleOutline,
  IClipboard,
  IClipboard2,
  ICog,
  IColumns,
  IComment,
  IConjoinedLine,
  IControl,
  ICross,
  ICross2,
  IDash,
  IDescending,
  IDocumentAlert,
  IDownload,
  IError,
  IExport,
  IEye,
  IFileText,
  IFillColour,
  IFilter,
  IFilterActive,
  IFolder,
  IHistory,
  IHome,
  IImport,
  IInfo,
  IInternalAudit,
  ILine8,
  ILink,
  IList,
  ILocation,
  ILock,
  ILogin,
  ILogout,
  IMinus,
  IObjectives,
  IOrder,
  IPagesLight,
  IPencil,
  IPending,
  IPersonalContact,
  IPin,
  IPlus,
  IPlus2,
  IPreferences,
  IPreferencesHorizontal,
  IProductRisk,
  IProducts,
  IQuestion,
  IQuestion2,
  IQueue,
  IRadio,
  IRefresh,
  IRisk,
  ISave,
  ISearch,
  ISquareOutline,
  IStarFill,
  IStarOutline,
  IStop,
  ITextAlignJustify,
  IThumbUp,
  ITick,
  ITick2,
  ITrash,
  ITreeChart,
  IUndo,
  IUnknown,
  IUser,
  IUser3,
  IUsers,
  IUsers2,
  IWarning,
  IWeb,
  IconProps,
} from 'helix';

/**
 * Returns a helix icon component.
 * @param icon The icon name.
 * @param props The icon props.
 * @returns The Icon jsx.
 */
export const icons = (icon: string, props?: { key?: string } & IconProps) => {
  switch (icon) {
    // ***************** ARC icons *****************
    case 'LibraryAction':
    case 'Action':
      return <IActions {...props} />;
    case 'Audit':
    case 'AuditType':
      return <IFolder {...props} />;
    case 'LibraryControl':
    case 'Control':
      return <IControl {...props} />;
    case 'LibraryFinding':
    case 'Finding':
      return <IUnknown {...props} />;
    case 'Group':
      return <IUser3 {...props} />;
    case 'LibraryIncident':
    case 'Incident':
      return <IAlert {...props} />;
    case 'IncidentReport':
      return <IDocumentAlert {...props} />;
    case 'AuditReport':
    case 'Library':
      return <IPagesLight {...props} />;
    case 'Location':
      return <ILocation {...props} />;
    case 'Matrix':
      return <IProducts {...props} />;
    case 'Note':
      return <IComment {...props} />;
    case 'LibraryObjective':
    case 'Objective':
      return <IObjectives {...props} />;
    case 'LibraryPhase':
    case 'Phase':
      return <IHistory {...props} />;
    case 'Process':
      return <ITreeChart {...props} />;
    case 'Register':
      return <IQueue {...props} />;
    case 'Review':
      return <ICertificate {...props} />;
    case 'LibraryRisk':
    case 'Risk':
      return <IRisk {...props} />;
    case 'Role':
      return <IPersonalContact {...props} />;
    case 'LibraryStep':
    case 'Step':
      return <IConjoinedLine {...props} />;
    case 'LibraryTest':
    case 'Test':
      return <IClipboard2 {...props} />;
    case 'Universe':
      return <IWeb {...props} />;
    // ***************** Helix icons *****************
    case 'ActionRight':
      return <IActionRight {...props} />;
    case 'Alert':
      return <IAlert {...props} />;
    case 'Approved':
      return <IApproved {...props} />;
    case 'ArrowDown':
      return <IArrowDown {...props} />;
    case 'ArrowLeft':
      return <IArrowLeft {...props} />;
    case 'ArrowRight':
      return <IArrowRight {...props} />;
    case 'ArrowSwapVertical':
      return <IArrowSwapVertical {...props} />;
    case 'ArrowUp':
      return <IArrowUp {...props} />;
    case 'Ascending':
      return <IAscending {...props} />;
    case 'Assurance':
      return <ICertificate {...props} />;
    case 'BarChart':
      return <IBarChart {...props} />;
    case 'Box':
      return <IBox {...props} />;
    case 'Calendar':
      return <ICalendar {...props} />;
    case 'Certificate':
      return <ICertificate {...props} />;
    case 'Chat':
      return <IChat {...props} />;
    case 'Checkboard':
      return <ICheckboard {...props} />;
    case 'Checkbox':
      return <ICheckbox {...props} />;
    case 'ChevronDown':
      return <IChevronDown {...props} />;
    case 'ChevronLeft':
      return <IChevronLeft {...props} />;
    case 'ChevronRight':
      return <IChevronRight {...props} />;
    case 'ChevronUp':
      return <IChevronUp {...props} />;
    case 'CircleOutline':
      return <ICircleOutline {...props} />;
    case 'Clipboard':
      return <IClipboard {...props} />;
    case 'Cog':
      return <ICog {...props} />;
    case 'CollapseLeft':
      return <IActionCollapse2 {...props} />;
    case 'CollapseRight':
      return <IActionExpand2 {...props} />;
    case 'Columns':
      return <IColumns {...props} />;
    case 'Comment':
      return <IComment {...props} />;
    case 'ConjoinedLine':
      return <IConjoinedLine {...props} />;
    case 'CopyTo':
      return <IImport {...props} />;
    case 'Cross':
      return <ICross {...props} />;
    case 'Cross2':
      return <ICross2 {...props} />;
    case 'Dash':
      return <IDash {...props} />;
    case 'Descending':
      return <IDescending {...props} />;
    case 'DocumentAlert':
      return <IDocumentAlert {...props} />;
    case 'Download':
      return <IDownload {...props} />;
    case 'Error':
      return <IError {...props} />;
    case 'Export':
      return <IExport {...props} />;
    case 'Eye':
      return <IEye {...props} />;
    case 'FileText':
      return <IFileText {...props} />;
    case 'FillColour':
      return <IFillColour {...props} />;
    case 'Filter':
      return <IFilter {...props} />;
    case 'FilterActive':
      return <IFilterActive {...props} />;
    case 'Folder':
      return <IFolder {...props} />;
    case 'Home':
      return <IHome {...props} />;
    case 'Info':
      return <IInfo {...props} />;
    case 'InternalAudit':
      return <IInternalAudit {...props} />;
    case 'Line8':
      return <ILine8 {...props} />;
    case 'Link':
      return <ILink {...props} />;
    case 'List':
      return <IList {...props} />;
    case 'Lock':
      return <ILock {...props} />;
    case 'Login':
      return <ILogin {...props} />;
    case 'Logout':
      return <ILogout {...props} />;
    case 'Minus':
      return <IMinus {...props} />;
    case 'Order':
      return <IOrder {...props} />;
    case 'PagesLight':
      return <IPagesLight {...props} />;
    case 'Pencil':
      return <IPencil {...props} />;
    case 'Pending':
      return <IPending {...props} />;
    case 'Pin':
      return <IPin {...props} />;
    case 'Plus':
      return <IPlus {...props} />;
    case 'Plus2':
      return <IPlus2 {...props} />;
    case 'Preferences':
      return <IPreferences {...props} />;
    case 'PreferencesHorizontal':
      return <IPreferencesHorizontal {...props} />;
    case 'ProductRisk':
      return <IProductRisk {...props} />;
    case 'Question':
      return <IQuestion {...props} />;
    case 'Radio':
      return <IRadio {...props} />;
    case 'Refresh':
      return <IRefresh {...props} />;
    case 'Save':
      return <ISave {...props} />;
    case 'Search':
      return <ISearch {...props} />;
    case 'SquareOutline':
      return <ISquareOutline {...props} />;
    case 'StarFill':
      return <IStarFill {...props} />;
    case 'StarOutline':
      return <IStarOutline {...props} />;
    case 'Stop':
      return <IStop {...props} />;
    case 'TextAlignJustify':
      return <ITextAlignJustify {...props} />;
    case 'ThumbUp':
      return <IThumbUp {...props} />;
    case 'Tick':
      return <ITick {...props} />;
    case 'Tick2':
      return <ITick2 {...props} />;
    case 'Trash':
      return <ITrash {...props} />;
    case 'TreeChart':
      return <ITreeChart {...props} />;
    case 'Undo':
      return <IUndo {...props} />;
    case 'Unknown':
      return <IUnknown {...props} />;
    case 'User':
      return <IUser {...props} />;
    case 'Users':
      return <IUsers {...props} />;
    case 'Users2':
      return <IUsers2 {...props} />;
    case 'Warning':
      return <IWarning {...props} />;
    case 'Web':
      return <IWeb {...props} />;
    default:
      return <IQuestion2 {...props} />;
  }
};
