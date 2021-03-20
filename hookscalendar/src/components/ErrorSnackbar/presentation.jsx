import React from "react";
import { useSelector, useDispatch } from "react-redux"
import { Snackbar, IconButton } from "@material-ui/core";
import { Close, Warning } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { schedulesResetError } from "../../redux/schedules/actions";

const useStyles = makeStyles(theme => ({
    message: {
        display: "flex",
        alignItems: "center"
    },
    icon: {
        fontSize: 20
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing(1)
    }
}));

const ErrorSnackbar = () => {
    const classes = useStyles();
    const error = useSelector(state => state.schedules.error);
    const dispatch = useDispatch();
    const handleClose = () => {
        dispatch(schedulesResetError());
    }

    return (
        <Snackbar
            open={!!error}
            onClose={handleClose}
            autoHideDuration={3000}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            message={
                <span className={classes.message}>
                    <Warning className={[classes.icon, classes.iconVariant].join(" ")} />
                    {error}
                </span>
            }
            action={
                <IconButton color="inherit" onClick={handleClose}>
                    <Close className={classes.icon} />
                </IconButton>
            }
        />
    );
};

export default ErrorSnackbar;