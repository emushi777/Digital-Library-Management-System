import React from 'react';
import { useForm } from '@inertiajs/react';

export default function Edit({ collection }) {
    const { data, setData, put, processing, errors } = useForm({
        emertimi: collection.emertimi || '',
        pershkrimi: collection.pershkrimi || '',
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('collections.update', collection.id));
    };

    return (
        <div className="p-6 max-w-md">
            <h1 className="text-2xl font-bold mb-4">Edito Koleksionin</h1>
            <form onSubmit={submit}>
                <div className="mb-4">
                    <label className="block">Emërtimi</label>
                    <input type="text" value={data.emertimi} onChange={e => setData('emertimi', e.target.value)} className="w-full border p-2" />
                    {errors.emertimi && <div className="text-red-500">{errors.emertimi}</div>}
                </div>
                <div className="mb-4">
                    <label className="block">Përshkrimi</label>
                    <textarea value={data.pershkrimi} onChange={e => setData('pershkrimi', e.target.value)} className="w-full border p-2" />
                </div>
                <button type="submit" disabled={processing} className="bg-blue-500 text-white px-4 py-2 rounded">Ruaj Ndryshimet</button>
            </form>
        </div>
    );
}
