import React from "react";
import { useSelector, useDispatch } from "react-redux"
import {
    Dialog,
    DialogContent,
    TextField,
    DialogActions,
    Button,
    Input,
    Grid,
    IconButton
} from "@material-ui/core";
import { LocationOnOutlined, NotesOutlined, AccessTime, Close } from "@material-ui/icons";
import { withStyles } from "@material-ui/styles";
import {
    addScheduleCloseDialog,
    addScheduleSetValue
} from "../../redux/addSchedule/actions";
import { DatePicker } from "@material-ui/pickers";
import * as styles from "./style.module.css";
import { schedulesAddItem } from "../../redux/schedules/actions";

const spacer = { margin: "4px 0" };

const Title = withStyles({
    root: { marginBottom: 32, fontSize: 22 }
})(Input);

const AddScheduleDialog = ({ }) => {
    const stateOrigin = useSelector(state => state);
    console.log(stateOrigin);
    const state = useSelector(state => state.addSchedule);
    // console.log(state);
    const schedule = useSelector(state => state.schedules);
    // console.log(schedule);
    const isDialogOpen = state.isDialogOpen
    const form = state.form;
    console.log(form);
    const title = form.title;
    const description = form.description;
    const location = form.location;
    const date = form.date;

    const dispatch = useDispatch();

    const closeDialog = () => {
        dispatch(addScheduleCloseDialog());
    }
    const setSchedule = (value) => {
        console.log(`value:${value}`);
        dispatch(addScheduleSetValue(value));
    }

    const saveSchedule = () => {
        dispatch(schedulesAddItem(form));
        console.log(`${form}`);
        dispatch(addScheduleCloseDialog());
    }
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
                <Title
                    autoFocus
                    fullWidth
                    placeholder="タイトルと日時を追加"
                    value={title}
                    onChange={e => setSchedule({ title: e.target.value })}
                />
                <Grid container spacing={1} alignItems="center" justify="space-between">
                    <Grid item>
                        <AccessTime />
                    </Grid>
                    <Grid item xs={10}>
                        <DatePicker
                            value={date}
                            onChange={d => setSchedule({ date: d })}
                            variant="inline"
                            format="YYYY年M月D日"
                            animateYearScrolling
                            disableToolbar
                            fullWidth
                            style={spacer}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={1} alignItems="center" justify="space-between">
                    <Grid item>
                        <LocationOnOutlined />
                    </Grid>
                    <Grid item xs={10}>
                        <TextField
                            style={spacer}
                            fullWidth
                            placeholder="場所を追加"
                            value={location}
                            onChange={e => setSchedule({ location: e.target.value })}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={1} alignItems="center" justify="space-between">
                    <Grid item>
                        <NotesOutlined />
                    </Grid>
                    <Grid item xs={10}>
                        <TextField
                            style={spacer}
                            fullWidth
                            placeholder="説明を追加"
                            value={description}
                            onChange={e => setSchedule({ description: e.target.value })}
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button color="primary" variant="outlined" onClick={saveSchedule}>
                    保存
        </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddScheduleDialog;
