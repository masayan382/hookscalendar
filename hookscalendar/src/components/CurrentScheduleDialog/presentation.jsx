import React, { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    IconButton,
    DialogActions,
    Grid,
    Typography,
    Tooltip
} from "@material-ui/core";
import { Close, LocationOnOutlined, NotesOutlined, DeleteOutlineOutlined } from "@material-ui/icons";

import styles from "./style.module.css";
import { currentScheduleCloseDialog } from "../../redux/currentSchedule/actions";
import { useSelector, useDispatch } from "react-redux"
import {
    schedulesSetLoading,
    schedulesDeleteItem,
    schedulesAsyncFailure
} from "../../redux/schedules/actions";
import { db } from "../../firebase";

const spacer = (top, bottom) => ({
    margin: `${top}px 0 ${bottom}px 0`
});

const CurrentScheduleDialog = () => {
    const dispatch = useDispatch();
    const state = useSelector(state => state);
    const schedule = state.currentSchedule;
    const closeDialog = () => {
        dispatch(currentScheduleCloseDialog());
    }
    const isDialogOpen = state.currentSchedule.isDialogOpen;
    const item = schedule.item;

    const [id, setId] = useState(null);
    const asyncSchedulesDeleteItem = (id) => async (dispatch, getState) => {
        dispatch(schedulesSetLoading());
        const currentSchedules = getState().schedules.items;
        const deleteYear = currentSchedules[0].date.$y;
        const deleteMonth = currentSchedules[0].date.$M + 1;
        try {
            await db
                .collection("post")
                .doc(`${deleteYear}`)
                .collection(`${deleteMonth}`)
                .doc(`${id}`)
                .delete()
                .catch((error) => {
                    throw new Error(error);
                });
            const newSchedules = currentSchedules.filter((s) => s.id !== id);
            console.log("newSchedules:", newSchedules);
            dispatch(schedulesDeleteItem(newSchedules));
        } catch (err) {
            console.error(err);
            dispatch(schedulesAsyncFailure(err.message));
        }
    };

    const deleteItem = (id) => {
        dispatch(asyncSchedulesDeleteItem(id));
        dispatch(currentScheduleCloseDialog());
    };

    useEffect(() => {
        if (item !== null) {
            setId(item.id);
        } else {
            setId(null);
        }
    }, [item]);

    return (
        <Dialog open={isDialogOpen} onClose={closeDialog} maxWidth="xs" fullWidth>
            <DialogActions>
                <div className={styles.closeButton}>
                    <Tooltip title="削除" placement="bottom">
                        <IconButton onClick={() => deleteItem(id)} size="small">
                            <DeleteOutlineOutlined />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="閉じる" placement="bottom">
                        <IconButton onClick={closeDialog} size="small">
                            <Close />
                        </IconButton>
                    </Tooltip>
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