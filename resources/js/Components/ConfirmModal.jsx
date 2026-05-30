export default function ConfirmModal({
    open,
    title,
    message,
    confirmLabel = 'Confirm',
    cancelLabel = 'Cancel',
    onConfirm,
    onCancel,
}) {
    if (!open) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 bg-black/45 px-4">
            <div className="absolute left-1/2 top-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-[28px] border border-gray-100 bg-white p-6 shadow-2xl">
                <div className="text-center">
                    <h2 className="text-2xl font-black tracking-tight text-gray-900">{title}</h2>
                </div>

                <p className="mt-4 text-center text-sm leading-6 text-gray-500">{message}</p>

                <div className="mt-8 flex justify-center gap-3">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="rounded-xl border border-gray-200 px-5 py-3 text-xs font-bold uppercase tracking-widest text-gray-600 transition hover:bg-gray-50"
                    >
                        {cancelLabel}
                    </button>
                    <button
                        type="button"
                        onClick={onConfirm}
                        className="rounded-xl bg-red-600 px-5 py-3 text-xs font-bold uppercase tracking-widest text-white shadow-lg transition hover:bg-red-700"
                    >
                        {confirmLabel}
                    </button>
                </div>
            </div>
        </div>
    );
}
