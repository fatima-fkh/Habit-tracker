import { useParams, useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Flame, Trash } from 'lucide-react';
import api from '../lib/api';

function HabitDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [habit, setHabit] = useState("");
    const [currDate, setCurrDate] = useState(new Date());
    const year = currDate.getFullYear();
    const month = currDate.getMonth();

    const deleteHabit = async () => {
        try {
            const response = await api.delete(`/${id}`);
            console.log(response.data.message);
            navigate("/");
        }
        catch (error) {
            console.log(error)
        }
    }

    const prevMonth = () => { setCurrDate(new Date(year, month - 1, 1)); }

    const nextMonth = () => { setCurrDate(new Date(year, month + 1, 1)); }

    useEffect(() => {
        const fetchHabit = async () => {
            try {
                const response = await api.get(`/${id}`)
                setHabit(response.data)
            } catch (error) {
                console.log(error)
            }
        };
        fetchHabit();
    }, [id])

    const loggedDates = new Set(habit.logDatesStr ?? []);
    const monthText = currDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = new Date();
    const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

    return (
        <div className='min-h-screen  p-4'>
            <div className="flex items-center gap-3 mb-6">
                <button onClick={() => navigate(-1)}
                    className="p-2 rounded-full bg-yellow-200 hover:bg-pink-300 transition-colors">
                    <ArrowLeft className='w-7 h-5 m-2' /></button>

                <div>
                    <h1 className='text-2xl font-bold text-slate-800'>{habit.name}</h1>
                    <p className="text-md text-slate-500">{habit.streak ?? 0} day{habit.streak === 1 ? '' : 's'} streak</p>
                </div>
                <div className="flex flex-row items-center gap-3 ml-auto">
                    <Trash
                        onClick={deleteHabit}
                        className="w-5 h-5 text-slate-400 hover:text-red-500 cursor-pointer transition-colors"
                    />
                    <Flame
                        className={`w-6 h-6 ${habit.streakStatus === 'active' ? 'text-orange-500' : habit.streakStatus === 'pending' ? 'text-orange-300' : 'text-slate-200'}`}
                        fill={habit.streakStatus === 'broken' ? 'none' : 'currentColor'}
                    />
                </div>
            </div>

            {/*calender*/}
            <div className="bg-white rounded-2xl p-4 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                    <button
                        onClick={prevMonth}
                        className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-sm font-medium hover:bg-yellow-200 transition-colors"
                    ><ArrowLeft /></button>

                    <span className='font-bold text-amber-800'> {monthText}</span>

                    <button
                        onClick={nextMonth}
                        className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-sm font-medium hover:bg-yellow-200 transition-colors"
                    ><ArrowRight /></button>
                </div>

                <div className="grid grid-cols-7 mb-2">
                    {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (<div key={d} className="text-center text-xs text-slate-400 font-medium py-1">{d}</div>
                    ))}
                </div>

                <div className="grid grid-cols-7 gap-y-1" >
                    {Array.from({ length: firstDay }).map((_, i) => (
                        <div key={`empty-${i}`} />
                    ))}

                    {Array.from({ length: daysInMonth }).map((_, i) => {
                        const day = i + 1;
                        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                        const isToday = todayStr === dateStr;
                        const isLogged = loggedDates.has(dateStr);

                        return (
                            <div key={day} className='flex items-center justify-center p-1'>
                                <div className={`
                                    w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium
                                    ${isLogged ? 'bg-orange-500 text-white' : isToday ? 'ring-2 ring-pink-300 text-slate-700' : 'text-slate-500'}
                                `}>                                    {day}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>


            <div className="grid grid-cols-2 gap-3 mt-4">
                <div className="bg-white rounded-2xl p-4 shadow-sm">
                    <p className="text-xs text-slate-400 mb-1">Total logs</p>
                    <p className="text-2xl font-bold text-slate-800">{habit.logDatesStr?.length ?? 0}</p>
                </div>
                <div className="bg-white rounded-2xl p-4 shadow-sm">
                    <p className="text-xs text-slate-400 mb-1">This month</p>
                    <p className="text-2xl font-bold text-slate-800">
                        {habit.logDatesStr?.filter(d => d.startsWith(`${year}-${String(month + 1).padStart(2, '0')}`)).length ?? 0}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default HabitDetailPage;