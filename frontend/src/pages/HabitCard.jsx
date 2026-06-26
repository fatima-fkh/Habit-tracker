import { Flame, ChevronRight } from "lucide-react"
import api from '../lib/api'
import { useNavigate } from "react-router";

const flame_styles = {
    active: { color: "text-orange-500", fill: "currentColor" },
    pending: { color: "text-orange-300", fill: "currentColor" },
    broken: { color: "text-slate-200", fill: "none" },
};

const HabitCard = ({ habit, isSelected, onSelect, onHabitUpdated }) => {
    const navigate = useNavigate();
    const status = habit.streakStatus || "broken"
    const flamestyle = flame_styles[status];

    const handleViewHistory = (e) => {
        e.stopPropagation();
        navigate(`/${habit.id}`);
    }

    const handleMarkDone = async (e) => {
        e.stopPropagation();

        if (habit.loggedToday) return;

        try {
            await api.post(`/${habit.id}/log`)
            if (onHabitUpdated) { onHabitUpdated(); }
            else { console.log('hello') }

        } catch (error) { console.log(error) }
    }
    return (
        <div onClick={() => {
            onSelect(habit.id)
        }}
            className={`
        flex items-center justify-between p-4 rounded-xl 
        transition-all duration-150 m-2 hover:scale-[1.00] active:scale-[1.01]
        ${isSelected
                    ? "bg-yellow-100 ring-2 ring-yellow-300 hover:bg-yellow-50"
                    : "bg-pink-100 ring-2 ring-pink-200 hover:bg-pink-50"}
      `}>
            <div>
                <Flame
                    className={`w-6 h-6 ${flamestyle.color}`}
                    fill={flamestyle.fill} />
                <div>
                    <p>{habit.name}</p>
                    <p className="text-sm text-slate-500">
                        {habit.streak ?? 0} day{habit.streak === 1 ? "" : "s"} streak
                    </p>
                </div>
            </div>


            <div className="flex flex-col items-end gap-1 ml-auto">
                <button
                    onClick={handleMarkDone}
                    disabled={habit.loggedToday}
                    className={`
          px-3 py-1.5 rounded-full text-sm font-medium transition-colors cursor-pointer
         ${habit.loggedToday
                            ? "bg-green-100 text-green-600 border border-green-400 cursor-not-allowed opacity-75"
                            : "bg-slate-100 text-slate-700 border border-slate-500 hover:bg-slate-200 hover:scale-[1.03]"}      `}
                > {habit.loggedToday ? "Done" : "Mark done"}</button>
            </div>

            <div>
                <button
                    onClick={handleViewHistory}
                    className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400"
                >
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>
        </div>
    )
}

export default HabitCard
