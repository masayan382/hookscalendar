import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"
import { GridList, Typography } from "@material-ui/core";
import CalendarElement from "../CalendarElement";
import * as styles from "./style.module.css";
import { createCalendar } from "../../services/calendar";
import {
    addScheduleOpenDialog,
    addScheduleSetValue
} from "../../redux/addSchedule/actions";
import { setSchedules } from "../../services/schedule";
import { currentScheduleSetItem, currentScheduleOpenDialog } from "../../redux/currentSchedule/actions";
import { schedulesSetLoading, schedulesFetchItem, schedulesAsyncFailure } from "../../redux/schedules/actions";
import { formatSchedule } from "../../services/schedule";
import { db } from "../../firebase";

const days = ["日", "月", "火", "水", "木", "金", "土"];

const CalendarBoard = () => {
    const dispatch = useDispatch();

    const state = useSelector(state => state)
    const month = state.calendar;
    const schedules = state.schedules.items;
    const update = state.update.item.length;
    const calendar = setSchedules(createCalendar(month), schedules);
    const openAddScheduleDialog = (d) => {
        dispatch(addScheduleOpenDialog());
        dispatch(addScheduleSetValue({ date: d }));
    };
    const openCurrentScheduleDialog = (schedule, e) => {
        e.stopPropagation();
        dispatch(currentScheduleSetItem(schedule));
        dispatch(currentScheduleOpenDialog());
    }
    const fetchSchedule = (month) => {
        dispatch(asyncSchedulesFetchItem(month));
    };
    const asyncSchedulesFetchItem = () => async (dispatch) => {
        dispatch(schedulesSetLoading());
        const list = [];
        try {
            await db
                .collection(`post`)
                .doc(`${month.year}`)
                .collection(`${month.month}`)
                .get()
                .then((snapshot) => {
                    snapshot.forEach((doc) => {
                        const postData = doc.data();
                        const timestamp = postData.date.toDate();
                        const newSelectDate = { date: timestamp };
                        const newPostData = Object.assign(postData, newSelectDate);
                        list.push(newPostData);
                    });
                });
            const formatedSchedule = list.map((r) => formatSchedule(r));
            dispatch(schedulesFetchItem(formatedSchedule));
        } catch (err) {
            console.error(err);
            dispatch(schedulesAsyncFailure(err.message));
        }
    };

    useEffect(() => {
        if (update === 0) {
            fetchSchedule();
        }
    }, [update]);

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
                        <CalendarElement day={date} month={month} schedules={schedules} onClickSchedule={openCurrentScheduleDialog} />
                    </li>
                ))}
            </GridList>
        </div>
    );
};

export default CalendarBoard;
