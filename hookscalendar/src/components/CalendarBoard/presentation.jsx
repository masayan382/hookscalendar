import React from "react";
import { GridList, Typography } from "@material-ui/core";

import CalendarElement from "../CalendarElement";
import * as styles from "./style.module.css";
import { createCalendar } from "../../services/calendar";
import { useSelector, useDispatch } from "react-redux"
import { addScheduleOpenDialog, addScheduleCloseDialog, addScheduleSetValue } from "../../redux/addSchedule/actions";
import { setSchedules } from "../../services/schedule";

const days = ["日", "月", "火", "水", "木", "金", "土"];

const CalendarBoard = () => {
    const dispatch = useDispatch();
    const data = useSelector(state => state)
    // const calendar = createCalendar(data.calendar);
    const month = data.calendar;
    const schedules = data.schedules.items
    const calendar = setSchedules(createCalendar(month), schedules);
    // console.log("calendar:", calendar);
    const openAddScheduleDialog = (d) => {
        dispatch(addScheduleOpenDialog());
        dispatch(addScheduleSetValue({ date: d }));
    };
    const closeDialog = () => {
        dispatch(addScheduleCloseDialog());
    }

    return (
        <div className={styles.container}>
            <GridList className={styles.grid} cols={7} spacing={0} cellHeight="auto">
                {days.map(d => (
                    <li key={d}>
                        <Typography
                            className={styles.days}
                            color="textSecondary"
                            align="center"
                            variant="caption"
                            component="div"
                        >
                            {d}
                        </Typography>
                    </li>
                ))}
                {calendar.map(({ date, schedules }) => (
                    <li key={date.toISOString()} onClick={() => openAddScheduleDialog(date)}>
                        <CalendarElement day={date} month={month} schedules={schedules} />
                    </li>
                ))}
            </GridList>
        </div>
    );
};

export default CalendarBoard;
