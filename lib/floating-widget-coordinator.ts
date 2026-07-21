// Coordinates the floating chat widgets mounted on the dashboard
// (ChatWithAdminWidget, FloatingStudyGroupChat) so opening one closes the
// other - both render in roughly the same bottom-right screen region, and
// having both open at once visually overlapped. A window CustomEvent is
// enough here (no React context needed) since neither widget has a parent
// in common closer than the page root.

export type FloatingWidgetId = "admin-chat" | "study-group-chat";

const EVENT_NAME = "floating-widget-opened";

export function announceWidgetOpened(id: FloatingWidgetId) {
  window.dispatchEvent(new CustomEvent<FloatingWidgetId>(EVENT_NAME, { detail: id }));
}

/** Calls onClose whenever a DIFFERENT floating widget announces it opened. */
export function onOtherWidgetOpened(selfId: FloatingWidgetId, onClose: () => void): () => void {
  function handleEvent(event: Event) {
    const openedId = (event as CustomEvent<FloatingWidgetId>).detail;
    if (openedId !== selfId) onClose();
  }
  window.addEventListener(EVENT_NAME, handleEvent);
  return () => window.removeEventListener(EVENT_NAME, handleEvent);
}
