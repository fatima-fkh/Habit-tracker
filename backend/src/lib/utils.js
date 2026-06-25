function dateStr(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`
}

function calculateStreak(logDates, today = new Date()) {
    const todayStr = dateStr(today);
    const logSet = new Set(logDates);
    const loggedToday = logSet.has(todayStr);
    let marker = new Date(today)
    let streak = 0;
    if (!loggedToday) {  // today not marked, start from yesterday
        marker.setDate(marker.getDate() - 1);
    }
    while (logSet.has(dateStr(marker))) {
        streak++;
        marker.setDate(marker.getDate() - 1);
    }
    let streakStatus;
    if (streak === 0) {
        streakStatus = "broken";
    } else if (loggedToday) {
        streakStatus = "active";
    } else {
        streakStatus = "pending";
    }

    return { streak, streakStatus, loggedToday }
}

function habitDetails(habit) {
    const logDatesStr = habit.habitLogs.map((log) => dateStr(log.addedAt));
    const { streak, streakStatus, loggedToday } = calculateStreak(logDatesStr);
    const last7days = history7days(logDatesStr);

    return ({
        id: habit.id,
        name: habit.name,
        streak,
        streakStatus,
        loggedToday,
        logDatesStr,
        last7days,
    });
}

function history7days(logDates) {
    const logSet = new Set(logDates);
    const streakDays = [];

    for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const ds = dateStr(d);
        streakDays.push({ date: d, done: logSet.has(ds) });
    }
    return streakDays;
}

module.exports = { dateStr, calculateStreak, history7days, habitDetails }

if (require.main === module) {
    console.log(dateStr(new Date()));
    console.log(calculateStreak(["2026-06-20", "2026-06-21"]));
}