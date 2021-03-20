import { schedulesSetLoading, schedulesFetchItem, schedulesAddItem } from "./actions";

export const asyncSchedulesAddItem = (schedule) => async (dispatch) => {
    dispatch(schedulesSetLoading());
    const result = await post("schedules", body);
    const newSchedule = formatSchedule(result);
    dispatch(schedulesAddItem(newSchedule));
};
