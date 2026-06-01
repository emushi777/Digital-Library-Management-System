import React, { useState } from 'react';
import axios from 'axios';

const BookRequestForm = () => {
    const [formData, setFormData] = useState({
        titulli_librit: '',
        emri_autorit: ''
    });
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const response = await axios.post('/book-requests', formData);
            setMessage(response.data.message);
            setFormData({ titulli_librit: '', emri_autorit: '' }); // Pastrimi i formës
        } catch (error) {
            setMessage('Error: ' + (error.response?.data?.message || 'Something went wrong.'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 bg-white rounded shadow-md">
            <h2 className="text-xl font-bold mb-4">Request a Book</h2>
            
            {message && <div className="mb-4 p-2 bg-blue-100 text-blue-800 rounded">{message}</div>}

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block mb-1">Book Title</label>
                    <input
                        type="text"
                        className="w-full border p-2 rounded"
                        value={formData.titulli_librit}
                        onChange={(e) => setFormData({...formData, titulli_librit: e.target.value})}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1">Author Name</label>
                    <input
                        type="text"
                        className="w-full border p-2 rounded"
                        value={formData.emri_autorit}
                        onChange={(e) => setFormData({...formData, emri_autorit: e.target.value})}
                        required
                    />
                </div>
                <button 
                    type="submit" 
                    disabled={loading}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    {loading ? 'Sending...' : 'Submit Request'}
                </button>
            </form>
        </div>
    );
};

export default BookRequestForm;