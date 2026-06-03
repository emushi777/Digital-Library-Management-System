import { useState } from 'react';
import ConfirmModal from '@/Components/ConfirmModal';

export default function useConfirmModal() {
    const [options, setOptions] = useState(null);

    const confirm = ({
        title,
        message,
        confirmLabel = 'Confirm',
        cancelLabel = 'Cancel',
        onConfirm,
    }) => {
        setOptions({
            title,
            message,
            confirmLabel,
            cancelLabel,
            onConfirm,
        });
    };

    const close = () => setOptions(null);

    const modal = (
        <ConfirmModal
            open={Boolean(options)}
            title={options?.title}
            message={options?.message}
            confirmLabel={options?.confirmLabel}
            cancelLabel={options?.cancelLabel}
            onCancel={close}
            onConfirm={() => {
                options?.onConfirm?.();
                close();
            }}
        />
    );

    return { confirm, modal };
}
