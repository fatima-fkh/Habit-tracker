import { useState } from "react"
import api from '../lib/api'

const AddHabit = ({ onClose, onHabitAdded }) => {
    const [name, setName] = useState("");
    const [err, setErr] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name.trim()) {
            setErr("Habit name is required!")
            return;
        }
        setSubmitting(true);
        setErr(null);

        try {
            const response = await api.post("/", { name: name.trim() });
            onHabitAdded(response.data.habit);
            onClose();
        } catch (error) {
            console.error(error);
            setErr("Could not create habit. Try again.");
        } finally {
            setSubmitting(false);
        }
    };
    return (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50"
            onClick={onClose}>

            <div className="bg-white rounded-2xl shadow-xl p-6 w-80" onClick={(e) => e.stopPropagation()}>
                <h2 className="text-xl font-bold text-slate-800 mb-4">Add a habit</h2>


                <form onSubmit={handleSubmit}>
                    <input type="text"
                        value={name}
                        placeholder="e.g. Sleep 8 hours" autoFocus
                        onChange={(e) => setName(e.target.value)}
                        className="w-full border border-slate-300 
                        rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#EC709A]"/>

                    {err && <p className="text-red-500 text-sm mt-2">{err}</p>}

                    <div className="flex justify-end gap-2 mt-4">
                        <button onClick={onClose} type="button"
                            className="cursor-pointer px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
                        >  Cancel </button>

                        <button className=" cursor-pointer px-4 py-2 rounded-lg bg-[#EC709A] text-white font-medium hover:bg-[#d95f89] disabled:opacity-50 transition-colors"
                            type="submit" disabled={submitting}>
                            {submitting ? "Adding" : "Add habit"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default AddHabit;
