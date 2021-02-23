import React from "react";
import { IconButton, Toolbar, Typography, withStyles } from "@material-ui/core";

import ArrowBackIos from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIos from "@material-ui/icons/ArrowForwardIos";
import DehazeIcon from "@material-ui/icons/Dehaze";
import { useSelector, useDispatch } from "react-redux"
const StyledToolbar = withStyles({
    root: { padding: "0" }
})(Toolbar);

const StyledTypography = withStyles({
    root: { margin: "0 30px 0 10px" }
})(Typography);


const Navigation = () => {
    const dispatch = useDispatch();
    const selector = useSelector(state => state);

    return (
        <StyledToolbar>
            <IconButton>
                <DehazeIcon />
            </IconButton>
            <img src="/images/calendar_icon.png" width="40" height="40" />
            <StyledTypography color="textSecondary" variant="h5" component="h1">
                カレンダー
      </StyledTypography>
            <IconButton size="small">
                <ArrowBackIos />
            </IconButton>
            <IconButton size="small">
                <ArrowForwardIos />
            </IconButton>
        </StyledToolbar>
    );
};

export default Navigation;