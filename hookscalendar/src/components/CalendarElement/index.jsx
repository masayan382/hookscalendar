import React from "react";
import { Typography } from "@material-ui/core"

import * as styles from "./style.module.css";
import dayjs from "dayjs";

import {
    isSameDay,
    isSameMonth,
    isFirstDay,
    getMonth
} from "../../services/calendar"
import Schedule from "../Schedule/index";

const CalendarElement = ({ day, month, schedules, ...props }) => {

    const currentMonth = getMonth(month);
    const isCurrentMonth = isSameMonth(day, currentMonth);
    const textColor = isCurrentMonth ? "textPrimary" : "textSecondary";
    const format = isFirstDay(day) ? "M月D日" : "D";
    const today = dayjs();
    const isToday = isSameDay(day, today);

    return (
        <div className={styles.element}>
            <Typography
                className={styles.date}
                color={textColor}
                align="center"
                variant="caption"
                component="div"
            >
                <span className={isToday ? styles.today : ""}>
                    {day.format(format)}
                </span>
            </Typography>
            <div className={styles.schedules}>
                {schedules.map(e => (
                    <Schedule key={e.id} schedule={e} {...props} />
                ))}
            </div>
        </div>
    );
};

export default CalendarElement;
