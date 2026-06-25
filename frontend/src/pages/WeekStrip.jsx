function WeekStrip({ habit }) {
    if (!habit || !habit.last7days) {
        return null;
    }
    return (
        <div className="bg-white rounded-xl p-4 mb-4">
            <p className="text-sm font-medium text-slate-500 mb-3">
                {habit.name} — last 7 days
            </p>

            <div className="flex justify-between gap-2">
                {
                    habit.last7days.map((d) => {
                        const day = new Date(d.date);
                        const dateNum = Number(day.getDate());
                        const weekDay = day.toLocaleDateString('en-US', { weekday: 'short' })

                        return (
                            <div
                                key={d.date}
                                className="flex flex-col items-center gap-1 flex-1"
                            >
                                <span className="text-xs text-slate-400">{weekDay}</span>
                                <div
                                    className={`
  w-8 h-8 rounded-full flex items-center justify-center
  text-xs font-medium
  ${d.done ? "bg-orange-500 text-white" : "bg-slate-100 text-slate-400"}`}
                                >
                                    {dateNum}
                                </div>
                            </div>
                        );

                    })}
            </div>
        </div>
    );
}

export default WeekStrip;