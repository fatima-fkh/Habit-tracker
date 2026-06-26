const express = require("express")
const prisma = require("../lib/prisma")
const { history7days, dateStr, habitDetails, calculateStreak } = require("../lib/utils")
const router = express.Router()

// fetch habits
router.get("/", async (req, res) => {
    try {
        const habits = await prisma.habit.findMany({
            include: {
                habitLogs: true
            }
        });
        const habitStreak = habits.map((habit) => {
            const details = habitDetails(habit);
            const { logDatesStr, ...rest } = details;
            return rest;
        });

        res.json(habitStreak)
    } catch (error) {
        console.error("Error: ", error)
        res.status(500).json({ error: "Could not get habits" })
    }
});

// add new habit
router.post("/", async (req, res) => {
    const { name } = req.body;
    if (!name || typeof name !== "string") {
        return res.status(400).json({ error: "Give Habit Name!!!" })
    }
    try {
        const habit = await prisma.habit.create({
            data: {
                name: name.trim()
            }
        });
        res.status(200).json({ habit })
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Could not create habit" })
    }
});

// log a habit
router.post("/:id/log", async (req, res) => {
    const habitId = Number(req.params.id)
    const loggedOn = new Date();

    try {
        const log = await prisma.habitLog.create({
            data: {
                habitId: habitId,
                addedAt: loggedOn
            },
        });
        res.status(200).json({ log })
    } catch (error) {
        if (error.code === "P2002") {
            return res.status(409).json({ error: "ALready logged in" })
        }
        console.log(error);
        res.status(500).json({ error: "Couldn't log habit" })
    }

});

// undo todays logging (undoing previous logging not allowed)
router.delete("/:id/log/today", async (req, res) => {
    const habitId = Number(req.params.id);
    const today = dateStr((new Date()));

    try {
        await prisma.habitLog.delete({
            where: {
                addedAt_habitId: {
                    addedAt: new Date(today),
                    habitId
                },
            }
        });
        res.status(200).send("Reversed todays streak status")

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Could not delete todays log" })
    }
})

// delete a habit 
router.delete("/:id", async (req, res) => {
    const habitId = Number(req.params.id);
    try {
        await prisma.habit.delete({
            where: {
                id: habitId
            }
        });
        res.status(200).send({ message: "Habit deleted successfully" })

    } catch (error) {
        if (error.code === "P2025") {
            return res.status(404).json({ error: "Habit does not exist" })
        }
        console.error(error);
        res.status(500).json({ error: "Couldn't delete habit" })
    }
})

router.get("/:id", async (req, res) => {
    const habitId = Number(req.params.id);

    try {
        const habit = await prisma.habit.findUnique({
            where: {
                id: habitId,
            },
            include: {
                habitLogs: true,
            }
        });
        if (!habit) {
            return res.status(404).json({ error: "Could not find habit" })
        }

        const details = habitDetails(habit);
        return res.json(details)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Habit not found" })
    }
})

module.exports = router