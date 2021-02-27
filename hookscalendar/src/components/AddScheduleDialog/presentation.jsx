import React from "react";
import { useSelector, useDispatch } from "react-redux"
import { Dialog, DialogContent } from "@material-ui/core";
import { addScheduleCloseDialog } from "../../redux/addSchedule/actions";

const AddScheduleDialog = ({ }) => {
    const isDialogOpen = useSelector(state => state.addSchedule.isDialogOpen);
    const dispatch = useDispatch();
    const closeDialog = () => {
        dispatch(addScheduleCloseDialog());
    }
    return (
        <Dialog open={isDialogOpen} onClose={closeDialog} maxWidth="xs" fullWidth>
            <DialogContent>dialog</DialogContent>
        </Dialog>
    );
};

export default AddScheduleDialog;
