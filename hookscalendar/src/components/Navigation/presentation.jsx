import React from "react";
import { IconButton, Toolbar, Typography, withStyles } from "@material-ui/core";

import ArrowBackIos from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIos from "@material-ui/icons/ArrowForwardIos";
import DehazeIcon from "@material-ui/icons/Dehaze";
import { useSelector, useDispatch } from "react-redux"
import { getNextMonth, getPreviousMonth } from "../../services/calendar";
import { calendarSetMonth } from "../../redux/calendar/actions";

const StyledToolbar = withStyles({
    root: { padding: "0" }
})(Toolbar);

const StyledTypography = withStyles({
    root: { margin: "0 30px 0 10px" }
})(Typography);


const Navigation = () => {
    const dispatch = useDispatch();
    const data = useSelector(state => state)
    console.log(data);

    const setMonth = (month) => {
        dispatch(calendarSetMonth(month));
    }

    const setNextMonth = () => {
        const nextMonth = getNextMonth(data);
        dispatch(setMonth(nextMonth));
    }
    const setPreviousMonth = () => {
        const previousMonth = getPreviousMonth(data);
        dispatch(setMonth(previousMonth))
    }


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
        </StyledToolbar>
    );
};

export default Navigation;