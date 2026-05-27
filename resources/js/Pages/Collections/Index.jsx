import React from 'react';
import { Link, useForm } from '@inertiajs/react';

export default function Index({ koleksionet }) {
    const { delete: destroy } = useForm();

    const handleDelete = (id) => {
        if (confirm("A je i sigurt që dëshiron ta fshish?")) {
            destroy(route('collections.destroy', id));
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Koleksionet e Mia</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {koleksionet.map((k) => (
                    <div key={k.id} className="border p-4 rounded shadow">
                        <h2 className="font-bold text-xl">{k.emertimi}</h2>
                        <p className="text-gray-600">{k.pershkrimi}</p>
                        <div className="mt-4 flex gap-2">
                            <Link href={route('collections.edit', k.id)} className="text-blue-500">Edito</Link>
                            <button onClick={() => handleDelete(k.id)} className="text-red-500">Fshij</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
