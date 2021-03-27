import { UPDATE_SCHEDULE_SET_ITEM, UPDATE_SCHEDULE_CLOSE_DIALOG, UPDATE_SCHEDULE_OPEN_DIALOG } from "./actions";
// import dayjs from "dayjs";

const init = {
    item: [],
    isDialogOpen: false,
};

const upDateScheduleReducer = (state = init, action) => {
    const { type, payload } = action;

    switch (type) {
        case UPDATE_SCHEDULE_SET_ITEM:
            return { ...state, item: payload };
        case UPDATE_SCHEDULE_OPEN_DIALOG:
            return { ...state, isDialogOpen: true };
        case UPDATE_SCHEDULE_CLOSE_DIALOG:
            return init;
        default:
            return state;
    }
};

export default upDateScheduleReducer;
