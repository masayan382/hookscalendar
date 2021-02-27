import React from "react";
import { GridList, Typography } from "@material-ui/core";

import CalendarElement from "../CalendarElement";
import * as styles from "./style.module.css";
import { createCalendar } from "../../services/calendar";
import { useSelector, useDispatch } from "react-redux"
import { addScheduleOpenDialog, addScheduleCloseDialog, addScheduleSetValue } from "../../redux/addSchedule/actions";

const days = ["日", "月", "火", "水", "木", "金", "土"];

const CalendarBoard = () => {
    const dispatch = useDispatch();
    const data = useSelector(state => state)
    const calendar = createCalendar(data.calendar);
    const month = data.calendar;
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
                {calendar.map(c => (
                    <li key={c.toISOString()} onClick={() => openAddScheduleDialog(c)}>
                        <CalendarElement day={c} month={month} />
                    </li>
                ))}
            </GridList>
        </div>
    );
};

export default CalendarBoard;
