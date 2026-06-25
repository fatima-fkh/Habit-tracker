import { useParams, Link } from "react-router";

function HabitDetailPage() {
    // useParams reads dynamic segments from the URL.
    // Since our route is defined as "/habits/:id", this pulls
    // whatever value is actually in that position — e.g. visiting
    // "/habits/5" makes id === "5" here.
    const { id } = useParams();

    return (
        <div className="min-h-screen bg-slate-50 p-6">
            <Link to="/" className="text-blue-600 hover:underline">
                ← Back to habits
            </Link>
            <h1 className="text-2xl font-bold text-slate-800 mt-4">
                Habit Detail Page
            </h1>
            <p className="text-slate-500 mt-2">
                Showing details for habit id: <strong>{id}</strong>
            </p>
            <p className="text-slate-500 mt-2">Calendar view will go here.</p>
        </div>
    );
}

export default HabitDetailPage;