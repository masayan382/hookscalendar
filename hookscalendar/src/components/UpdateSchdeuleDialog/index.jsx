import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"
import {
    Dialog,
    DialogContent,
    TextField,
    DialogActions,
    Button,
    Input,
    Grid,
    IconButton,
    Typography,
    Tooltip
} from "@material-ui/core";
import { LocationOnOutlined, NotesOutlined, AccessTime, Close } from "@material-ui/icons";
import { withStyles } from "@material-ui/styles";
import { schedulesAsyncFailure } from "../../redux/schedules/actions"
import { DatePicker } from "@material-ui/pickers";
import * as styles from "./style.module.css";
import {
    db,
    FirebaseTimestamp
} from "../../firebase.js";
import { formatSchedule, isCloseDialog } from "../../services/schedule";
import { schedulesAddItem, schedulesFetchItem } from "../../redux/schedules/actions"
import { upDateScheduleCloseDialog, upDateScheduleSetItem } from "../../redux/UpdateSchedule/actions"
const spacer = { margin: "4px 0" };

const Title = withStyles({
    root: { fontSize: 22 }
})(Input);


const UpdateScheduleDialog = () => {
    const state = useSelector(state => state);
    console.log(state);
    const isDialogOpen = state.update.isDialogOpen;
    const upDateItem = useSelector(state => state.update.item);
    const dispatch = useDispatch();

    const closeDialog = () => {
        initDialog();
        dispatch(upDateScheduleCloseDialog());
    }

    const saveSchedule = async () => {
        await postBase();
        // console.log('post')
        await dispatch(upDateScheduleCloseDialog());
        // console.log('post close');
        initDialog();
        console.log('post init');
    }

    const postBase = async () => {
        const timestamp = FirebaseTimestamp.now();
        const postData = {
            title: inputTitle,
            date: selectedDate.$d,
            location: inputLocation,
            description: inputDescription,
            createdAt: timestamp,
            id: postId
        };
        const postDataRef = db.collection('post').doc(`${selectedDate.$y}`).collection(`${selectedDate.$M + 1}`);
        const ref = postDataRef.doc();
        try {
            await postDataRef.doc(postId).set(postData, { merge: true }).catch((error) => {
                throw new Error(error);
            });
            const newSchedule = formatSchedule(postData);
            dispatch(upDateScheduleSetItem(newSchedule));
        } catch (err) {
            console.error(err);
            dispatch(schedulesAsyncFailure(err.message));
        }
    }

    const initDialog = () => {
        setInputTitle("");
        handleDateChange();
        setInputLocation("");
        setinputDescription("");
        setPostId("");
    }
    const [inputTitle, setInputTitle] = useState();
    const [selectedDate, handleDateChange] = useState();
    const [inputLocation, setInputLocation] = useState();
    const [inputDescription, setinputDescription] = useState();
    const [postId, setPostId] = useState();

    useEffect(() => {
        if (upDateItem.length !== 0) {
            setInputTitle(upDateItem.title);
            handleDateChange(upDateItem.date);
            setInputLocation(upDateItem.location);
            setinputDescription(upDateItem.description)
            setPostId(upDateItem.id);
        }
    }, [upDateItem]);

    return (
        <Dialog open={isDialogOpen} onClose={closeDialog} maxWidth="xs" fullWidth>
            <DialogActions>
                <div className={styles.closeButton}>
                    <Tooltip title="閉じる" placement="bottom">
                        <IconButton onClick={closeDialog} size="small">
                            <Close />
                        </IconButton>
                    </Tooltip>
                </div>
            </DialogActions>
            <DialogContent>
                <Title
                    autoFocus
                    fullWidth
                    placeholder="タイトルと日時を追加"
                    value={inputTitle}
                    onChange={e => setInputTitle(e.target.value)}
                />
                {/* <div className={styles.validation}>
                    <Typography variant="caption" component="div" color="error">
                        タイトルは必須です。
                        </Typography>
                </div> */}
                <Grid container spacing={1} alignItems="center" justify="space-between">
                    <Grid item>
                        <AccessTime />
                    </Grid>
                    <Grid item xs={10}>
                        <DatePicker
                            value={selectedDate}
                            onChange={handleDateChange}
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
                            value={inputLocation}
                            onChange={e => setInputLocation(e.target.value)}
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
                            value={inputDescription}
                            onChange={e => setinputDescription(e.target.value)}
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button color="primary" variant="outlined" onClick={saveSchedule} disabled={!inputTitle}>
                    保存
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default UpdateScheduleDialog;
