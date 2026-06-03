import { useMemo, useState } from 'react';
import ConfirmModal from '@/Components/ConfirmModal';

function normalize(value) {
    if (value instanceof File) {
        return value.name;
    }

    if (Array.isArray(value)) {
        return value.map(normalize);
    }

    if (value && typeof value === 'object') {
        return Object.keys(value)
            .sort()
            .reduce((result, key) => ({
                ...result,
                [key]: normalize(value[key]),
            }), {});
    }

    return value ?? '';
}

export default function useUnsavedChangesModal(initialData, currentData, {
    title = 'Discard changes?',
    message = 'You have unsaved changes. If you leave now, those changes will be lost.',
    confirmLabel = 'Discard changes',
    cancelLabel = 'Keep editing',
} = {}) {
    const [pendingAction, setPendingAction] = useState(null);

    const hasUnsavedChanges = useMemo(
        () => JSON.stringify(normalize(initialData)) !== JSON.stringify(normalize(currentData)),
        [initialData, currentData],
    );

    const confirmDiscard = (action) => {
        if (!hasUnsavedChanges) {
            action();
            return;
        }

        setPendingAction(() => action);
    };

    const modal = (
        <ConfirmModal
            open={Boolean(pendingAction)}
            title={title}
            message={message}
            confirmLabel={confirmLabel}
            cancelLabel={cancelLabel}
            onCancel={() => setPendingAction(null)}
            onConfirm={() => {
                pendingAction?.();
                setPendingAction(null);
            }}
        />
    );

    return { hasUnsavedChanges, confirmDiscard, modal };
}
