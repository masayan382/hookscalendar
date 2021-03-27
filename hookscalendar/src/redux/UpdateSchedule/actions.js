export const UPDATE_SCHEDULE_SET_ITEM = "UPDATE_SCHEDULE_SET_ITEM";
export const UPDATE_SCHEDULE_OPEN_DIALOG = "UPDATE_SCHEDULE_OPEN_DIALOG";
export const UPDATE_SCHEDULE_CLOSE_DIALOG = "UPDATE_SCHEDULE_CLOSE_DIALOG";

export const upDateScheduleSetItem = (payload) => ({
    type: UPDATE_SCHEDULE_SET_ITEM,
    payload,
});

export const upDateScheduleOpenDialog = () => ({
    type: UPDATE_SCHEDULE_OPEN_DIALOG,
});

export const upDateScheduleCloseDialog = () => ({
    type: UPDATE_SCHEDULE_CLOSE_DIALOG,
});
