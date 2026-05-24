export default function Show({ book }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <div className="max-w-6xl mx-auto py-10 px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
                {/* Kolona e majtë */}
                <div className="md:col-span-1">
                    <img src={getImageUrl(book.foto_kopertines)} className="w-full rounded-2xl shadow-lg" />
                    <button className="mt-4 w-full bg-green-600 text-white py-3 rounded-lg font-bold">Want to Read</button>
                </div>
                
                {/* Kolona e djathtë */}
                <div className="md:col-span-2">
                    <h1 className="text-4xl font-black">{book.titulli}</h1>
                    <p className="text-lg text-gray-600 mt-2">by {book.author.emri} {book.author.mbiemri}</p>
                    <div className="mt-6">
                        <h3 className="font-bold text-xl">Description</h3>
                        <p className="mt-2 text-gray-700 leading-relaxed">{book.pershkrimi}</p>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}