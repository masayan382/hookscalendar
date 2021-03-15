import React, { useState, useEffect } from "react";
import { GridList, Typography } from "@material-ui/core";

import CalendarElement from "../CalendarElement";
import * as styles from "./style.module.css";
import { createCalendar } from "../../services/calendar";
import { useSelector, useDispatch } from "react-redux"
import {
    addScheduleOpenDialog,
    // addScheduleCloseDialog,
    addScheduleSetValue
} from "../../redux/addSchedule/actions";
import { setSchedules } from "../../services/schedule";
import { currentScheduleSetItem, currentScheduleOpenDialog } from "../../redux/currentSchedule/actions";
// import { asyncSchedulesFetchItem } from "../../redux/schedules/effects";
import { schedulesSetLoading, schedulesFetchItem } from "../../redux/schedules/actions";
import { formatSchedule } from "../../services/schedule";
import { db } from "../../firebase";
// import dayjs from "dayjs";

const days = ["日", "月", "火", "水", "木", "金", "土"];

const CalendarBoard = () => {
    const dispatch = useDispatch();


    const data = useSelector(state => state)
    // console.log("state", data);
    const month = data.calendar;
    // console.log("month:", month);
    const schedules = data.schedules.items
    // console.log("schedules:", schedules);
    const calendar = setSchedules(createCalendar(month), schedules);
    // console.log("calendar:", calendar);
    const openAddScheduleDialog = (d) => {
        dispatch(addScheduleOpenDialog());
        dispatch(addScheduleSetValue({ date: d }));
    };
    // const closeDialog = () => {
    //     dispatch(addScheduleCloseDialog());
    // }
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
        await db
            .collection(`post`)
            .doc(`${month.year}`)
            .collection(`${month.month}`)
            .get()
            .then((snapshot) => {
                snapshot.forEach((doc) => {
                    const postData = doc.data();
                    console.log("postData:", postData);
                    const timestamp = postData.date.toDate();
                    const newSelectDate = { date: timestamp };
                    const newPostData = Object.assign(postData, newSelectDate);
                    list.push(newPostData);
                });
            });
        console.log("list:", list);
        const formatedSchedule = list.map((r) => formatSchedule(r));
        dispatch(schedulesFetchItem(formatedSchedule));
    };

    useEffect(() => {
        fetchSchedule();
    }, []);

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
