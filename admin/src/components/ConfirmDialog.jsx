import { AlertTriangle, Loader2, Trash2, X } from "lucide-react";

export default function ConfirmDialog({ open, title = "Delete item?", message, confirmLabel = "Delete permanently", loading = false, onConfirm, onClose }) {
  if (!open) return null;
  return <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
    <section role="dialog" aria-modal="true" aria-labelledby="confirm-dialog-title" className="confirm-dialog" onMouseDown={(event) => event.stopPropagation()}>
      <button type="button" aria-label="Close confirmation" onClick={onClose} disabled={loading} className="absolute right-4 top-4 rounded-xl p-2 text-ink-500 transition hover:bg-ink-100 hover:text-ink-800"><X size={18} /></button>
      <div className="grid h-14 w-14 place-items-center rounded-2xl bg-red-50 text-red-500 shadow-inner"><AlertTriangle size={26} /></div>
      <p className="mt-5 text-xs font-extrabold uppercase tracking-[.16em] text-red-500">Action requires confirmation</p>
      <h2 id="confirm-dialog-title" className="mt-2 font-display text-2xl font-extrabold tracking-tight text-ink-900">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-ink-500">{message}</p>
      <div className="mt-7 grid gap-3 sm:grid-cols-2"><button type="button" onClick={onClose} disabled={loading} className="btn-secondary order-2 sm:order-1">Keep it</button><button type="button" onClick={onConfirm} disabled={loading} className="inline-flex order-1 items-center justify-center gap-2 rounded-xl bg-red-500 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-red-500/20 transition hover:bg-red-600 active:scale-[.98] disabled:pointer-events-none disabled:opacity-60 sm:order-2">{loading ? <Loader2 size={17} className="animate-spin" /> : <Trash2 size={17} />}{loading ? "Deleting..." : confirmLabel}</button></div>
    </section>
  </div>;
}
