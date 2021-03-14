import { schedulesSetLoading, schedulesFetchItem } from "./actions";
import { formatSchedule } from "../../services/schedule";
import { db } from "../../firebase";
import dayjs from "dayjs";

export const asyncSchedulesFetchItem = () => async (dispatch) => {
    dispatch(schedulesSetLoading());

    // const result = await get(`schedules?month=${month}&year=${year}`);
    const list = [];

    const getPost = await db
        .collection(`2021`)
        .doc(`3`)
        .collection("20")
        .get()
        .then((snapshot) => {
            snapshot.forEach((doc) => {
                const postData = doc.data();
                const timestamp = postData.selectDate.toDate();
                const newSelectDate = { selectDate: timestamp };
                const newPostData = Object.assign(postData, newSelectDate);
                list.push(newPostData);
            });
        });
    console.log("list:", list);
    const formatedSchedule = list.map((r) => formatSchedule(r));
    dispatch(schedulesFetchItem(formatedSchedule));
};
