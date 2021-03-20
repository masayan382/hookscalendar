export const UPDATE_SCHEDULE_VALUE = "UPDATE_SCHEDULE_VALUE";
export const UPDATE_SCHEDULE_OPEN_DIALOG = "UPDATE_SCHEDULE_OPEN_DIALOG";
export const UPDATE_SCHEDULE_CLOSE_DIALOG = "UPDATE_SCHEDULE_CLOSE_DIALOG";

export const upDateScheduleValue = (payload) => ({
    type: UPDATE_SCHEDULE_VALUE,
    payload,
});

export const upDateScheduleOpenDialog = () => ({
    type: UPDATE_SCHEDULE_OPEN_DIALOG,
});

export const upDateScheduleCloseDialog = () => ({
    type: UPDATE_SCHEDULE_CLOSE_DIALOG,
});
