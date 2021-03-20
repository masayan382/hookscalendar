import { UPDATE_SCHEDULE_VALUE, UPDATE_SCHEDULE_CLOSE_DIALOG, UPDATE_SCHEDULE_OPEN_DIALOG } from "./actions";
import dayjs from "dayjs";

const init = {
    form: {
        title: "",
        description: "",
        date: dayjs(),
        location: "",
    },
    isDialogOpen: false,
    isStartEdit: false,
};

const upDateScheduleReducer = (state = init, action) => {
    const { type, payload } = action;

    switch (type) {
        case UPDATE_SCHEDULE_VALUE:
            return { ...state, item: payload };
        case UPDATE_SCHEDULE_OPEN_DIALOG:
            return { ...state, isDialogOpen: true };
        case UPDATE_SCHEDULE_CLOSE_DIALOG:
            return { ...state, isDialogOpen: false };
        default:
            return state;
    }
};

export default upDateScheduleReducer;
