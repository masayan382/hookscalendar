import React from "react";
import { useSelector, useDispatch } from "react-redux"
import {
    Dialog,
    DialogContent,
    TextField,
    DialogActions,
    Button,
    Input,
    Grid

} from "@material-ui/core";
import { LocationOnOutlined, NotesOutlined } from "@material-ui/icons";
import { withStyles } from "@material-ui/styles";
import { addScheduleCloseDialog } from "../../redux/addSchedule/actions";

const spacer = { margin: "4px 0" };

const Title = withStyles({
    root: { marginBottom: 32, fontSize: 22 }
})(Input);

const AddScheduleDialog = ({ }) => {
    const isDialogOpen = useSelector(state => state.addSchedule.isDialogOpen);
    const dispatch = useDispatch();
    const closeDialog = () => {
        dispatch(addScheduleCloseDialog());
    }
    return (
        <Dialog open={isDialogOpen} onClose={closeDialog} maxWidth="xs" fullWidth>
            <DialogContent>
                <Title autoFocus fullWidth placeholder="タイトルと日時を追加" />
                <Grid container spacing={1} alignItems="center" justify="space-between">
                    <Grid item>
                        <LocationOnOutlined />
                    </Grid>
                    <Grid item xs={10}>
                        <TextField style={spacer} fullWidth placeholder="場所を追加" />
                    </Grid>
                </Grid>
                <Grid container spacing={1} alignItems="center" justify="space-between">
                    <Grid item>
                        <NotesOutlined />
                    </Grid>
                    <Grid item xs={10}>
                        <TextField style={spacer} fullWidth placeholder="説明を追加" />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button color="primary" variant="outlined">
                    保存
        </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddScheduleDialog;
