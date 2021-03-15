import {
    // schedulesSetLoading,
    // schedulesFetchItem,
    schedulesDeleteItem,
} from "./actions";
import { formatSchedule } from "../../services/schedule";
import { db } from "../../firebase";
import dayjs from "dayjs";

// export const asyncSchedulesFetchItem = () => async (dispatch) => {
//     dispatch(schedulesSetLoading());
//     const list = [];
//     const getPost = await db
//         .collection(`2021`)
//         .doc(`3`)
//         .collection("20")
//         .get()
//         .then((snapshot) => {
//             snapshot.forEach((doc) => {
//                 const postData = doc.data();
//                 const timestamp = postData.selectDate.toDate();
//                 const newSelectDate = { selectDate: timestamp };
//                 const newPostData = Object.assign(postData, newSelectDate);
//                 list.push(newPostData);
//             });
//         });
//     console.log("list:", list);
//     const formatedSchedule = list.map((r) => formatSchedule(r));
//     dispatch(schedulesFetchItem(formatedSchedule));
// };

export const deleteRequest = async () => {
    await db
        .collection("post")
        .doc(`${selectedDate.$y}`)
        .collection(`${selectedDate.$M + 1}`)
        .doc(`${selectedDate.$D}`)
        .delete()
        .catch((error) => {
            throw new Error(error);
        });
};

export const asyncSchedulesDeleteItem = (id) => async (dispatch, getState) => {
    dispatch(schedulesSetLoading());
    const currentSchedules = getState().schedules.items;

    await deleteRequest();

    // 成功したらローカルのstateを削除
    const newSchedules = currentSchedules.filter((s) => s.id !== id);
    dispatch(schedulesDeleteItem(newSchedules));
};
