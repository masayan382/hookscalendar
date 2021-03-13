import { schedulesSetLoading, schedulesFetchItem } from "./actions";
import { formatSchedule } from "../../services/schedule";
import { db } from "../../firebase";

export const asyncSchedulesFetchItem = () => async (dispatch) => {
    dispatch(schedulesSetLoading());

    // const result = await get(`schedules?month=${month}&year=${year}`);
    const list = [];
    const formatedSchedule = list.map((r) => formatSchedule(r));
    const getPost = await db
        .collection("post")
        .get()
        .then((snapshots) => {
            snapshots.forEach((snapshot) => {
                const data = snapshot.data();
                list.push(data);
            });
        });
    // .then(console.log("list:", list));
    dispatch(schedulesFetchItem(formatedSchedule));
};
