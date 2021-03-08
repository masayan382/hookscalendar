import { isSameDay } from "./calendar";
import dayjs from "dayjs";

export const setSchedules = (calendar, schedules) =>
    calendar.map((c) => ({
        date: c,
        schedules: schedules.filter((e) => isSameDay(e.date, c)),
    }));

export const formatSchedule = (schedule) => ({
    ...schedule,
    date: dayjs(schedule.date),
});
