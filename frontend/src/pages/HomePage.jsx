import Header from "./Header";
import { useState, useEffect } from "react";
import AddHabit from "./AddHabit";
import HabitCard from "./HabitCard";
import api from '../lib/api'
import WeekStrip from "./WeekStrip";


function HomePage() {

    const [showModal, setShowModal] = useState(false);
    const [habits, setHabits] = useState([]);
    const [selectedHabitId, setSelectedHabitId] = useState(null);

    const handleHabitAdded = (newHabit) => {
        console.log("New habit created:", newHabit);
        setHabits((oldHabit) => ([...oldHabit, newHabit]))
    };

    const fetchHabits = async () => {
        try {
            const response = await api.get("/");
            const habitsData = response.data;

            setHabits(habitsData);
            console.log(habitsData.length)
            if (habitsData.length > 0 && selectedHabitId === null) {
                setSelectedHabitId(habitsData[0].id);
            }

        } catch (error) {
            console.error("Error fetching habits:", error);
        }
    };

    useEffect(() => {
        fetchHabits();
    }, [])

    const handleHabitUpdated = () => {
        fetchHabits();
    };

    const selectedHabit = habits.find((habit) => habit.id === selectedHabitId)

    return (
        <>
            <Header onAddClick={() => setShowModal(true)} />
            <div>
                {habits.length === 0 && <p>Habits will appear here...</p>}
                {selectedHabit && <WeekStrip habit={selectedHabit} />}

                {habits.map((habit) => (<HabitCard key={habit.id}
                    habit={habit}
                    isSelected={habit.id === selectedHabitId}
                    onSelect={setSelectedHabitId}
                    onHabitUpdated={handleHabitUpdated}
                />
                ))}
            </div>

            {showModal && (
                <div>
                    <AddHabit
                        onClose={() => setShowModal(false)}
                        onHabitAdded={handleHabitAdded}
                    />
                </div>
            )}
        </>
    );

}

export default HomePage;