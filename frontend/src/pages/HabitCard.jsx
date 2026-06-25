import { Flame } from "lucide-react"
import api from '../lib/api'

const flame_styles = {
    active: { color: "text-orange-500", fill: "cuurentColor" },
    pending: { color: "text-orange-300", fill: "cuurentColor" },
    broken: { color: "text-slate-200", fill: "none" },
};

const HabitCard = ({ habit, isSelected, onSelect, onHabitUpdated }) => {
    const status = habit.streakStatus || "broken"
    const flamestyle = flame_styles[status];

    const handleMarkDone = async (e) => {
        e.stopPropagation();

        if (habit.loggedToday) return;

        try {
            await api.post(`/habits/${habit.id}/log`);
            onHabitUpdated();
        } catch (error) { console.log(error) }
    }
    return (
        <div onClick={() => onSelect(habit.id)}
            className={`
        flex items-center justify-between p-4 rounded-xl cursor-pointer
        transition-all duration-150
        ${isSelected
                    ? "bg-yellow-100 ring-2 ring-yellow-300"
                    : "bg-white hover:bg-slate-50"}
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
            <button
                onClick={handleMarkDone}
                disabled={habit.loggedToday}
                className={`
          px-3 py-1.5 rounded-full text-sm font-medium transition-colors
          ${habit.loggedToday
                        ? "bg-pink-100 text-pink-500 cursor-default"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"}
        `}
            > {habit.loggedToday ? "Done" : "Mark done"}</button>
        </div>
    )
}

export default HabitCard
