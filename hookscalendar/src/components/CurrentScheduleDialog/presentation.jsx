import React from "react";
import {
    Dialog,
    DialogContent,
    IconButton,
    DialogActions,
    Grid,
    Typography
} from "@material-ui/core";
import { Close, LocationOnOutlined, NotesOutlined } from "@material-ui/icons";

import styles from "./style.module.css";
import { currentScheduleCloseDialog } from "../../redux/currentSchedule/actions";
import { useSelector, useDispatch } from "react-redux"

const spacer = (top, bottom) => ({
    margin: `${top}px 0 ${bottom}px 0`
});

const CurrentScheduleDialog = () => {
    const dispatch = useDispatch();
    const state = useSelector(state => state);
    // console.log("state:", state);
    const schedule = state.currentSchedule;
    // console.log("schedule:", schedule);
    const closeDialog = () => {
        dispatch(currentScheduleCloseDialog());
    }
    const isDialogOpen = state.currentSchedule.isDialogOpen;
    // console.log("isDialogOpen:", isDialogOpen);
    const item = schedule.item;
    // console.log("item:", item);
    return (
        <Dialog open={isDialogOpen} onClose={closeDialog} maxWidth="xs" fullWidth>
            <DialogActions>
                <div className={styles.closeButton}>
                    <IconButton onClick={closeDialog} size="small">
                        <Close />
                    </IconButton>
                </div>
            </DialogActions>

            <DialogContent>
                {item && (
                    <>
                        <div>
                            <Grid
                                container
                                spacing={1}
                                alignItems="center"
                                justify="space-between"
                                style={spacer(0, 30)}
                            >
                                <Grid item>
                                    <span className={styles.box}></span>
                                </Grid>
                                <Grid item xs={10}>
                                    <Typography variant="h5" component="h2">
                                        {item.title}
                                    </Typography>
                                    <Typography color="textSecondary">
                                        {item.date.format("M月 D日")}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </div>

                        {item.location && (
                            <Grid
                                container
                                spacing={1}
                                alignItems="center"
                                justify="space-between"
                                style={spacer(0, 4)}
                            >
                                <Grid item>
                                    <LocationOnOutlined />
                                </Grid>
                                <Grid item xs={10}>
                                    <Typography>{item.location}</Typography>
                                </Grid>
                            </Grid>
                        )}
                        {item.description && (
                            <Grid
                                container
                                spacing={1}
                                alignItems="center"
                                justify="space-between"
                                style={spacer(0, 4)}
                            >
                                <Grid item>
                                    <NotesOutlined />
                                </Grid>
                                <Grid item xs={10}>
                                    <Typography>{item.description}</Typography>
                                </Grid>
                            </Grid>
                        )}
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default CurrentScheduleDialog;