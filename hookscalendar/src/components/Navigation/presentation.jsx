import React, { useState, useEffect } from "react";
import { IconButton, Toolbar, Typography, withStyles } from "@material-ui/core";
import { DatePicker } from "@material-ui/pickers";
import ArrowBackIos from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIos from "@material-ui/icons/ArrowForwardIos";
import DehazeIcon from "@material-ui/icons/Dehaze";
import { useSelector, useDispatch } from "react-redux"
import {
    getNextMonth,
    getPreviousMonth,
    getMonth,
    formatMonth
} from "../../services/calendar";
import { calendarSetMonth } from "../../redux/calendar/actions";
import dayjs from "dayjs";
import { asyncSchedulesFetchItem } from "../../redux/schedules/effects";


const StyledToolbar = withStyles({
    root: { padding: "0" }
})(Toolbar);

const StyledTypography = withStyles({
    root: { margin: "0 30px 0 10px" }
})(Typography);

const StyledDatePicker = withStyles({
    root: { marginLeft: 30 }
})(DatePicker);

const Navigation = () => {
    const [selectedDate, handleDateChange] = useState(new Date());

    const dispatch = useDispatch();
    const data = useSelector(state => state.calendar)

    const month = getMonth(data);

    const setNextMonth = () => {
        const nextMonth = getNextMonth(data);
        dispatch(calendarSetMonth(nextMonth));
    }

    const setPreviousMonth = () => {
        const previousMonth = getPreviousMonth(data);
        dispatch(calendarSetMonth(previousMonth));
    }

    // const setMonth = () => {
    //     const setMonthForm = formatMonth(month);
    //     dispatch(calendarSetMonth(setMonthForm))
    // };

    const fetchItem = (month) => {
        dispatch(asyncSchedulesFetchItem(month));
    }

    useEffect(() => {
        const day = dayjs(selectedDate)
        const dayFormat = formatMonth(day);
        dispatch(calendarSetMonth(dayFormat));
    }, [selectedDate]);

    return (
        <StyledToolbar>
            <IconButton>
                <DehazeIcon />
            </IconButton>
            <img src="/images/calendar_icon.png" width="40" height="40" />
            <StyledTypography color="textSecondary" variant="h5" component="h1">
                カレンダー
            </StyledTypography>
            <IconButton size="small" onClick={setPreviousMonth}>
                <ArrowBackIos />
            </IconButton>
            <IconButton size="small" onClick={setNextMonth}>
                <ArrowForwardIos />
            </IconButton>
            <StyledDatePicker
                value={month}
                onChange={handleDateChange}
                variant="inline"
                format="YYYY年 M月"
                animateYearScrolling
                disableToolbar
            />
        </StyledToolbar >
    );
};

export default Navigation;