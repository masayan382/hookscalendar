import {
    schedulesSetLoading,
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

// export const deleteRequest = async () => {
//     await db
//         .collection("post")
//         .doc(`${selectedDate.$y}`)
//         .collection(`${selectedDate.$M + 1}`)
//         .doc(`${selectedDate.$D}`)
//         .delete()
//         .catch((error) => {
//             throw new Error(error);
//         });
// };

// export const asyncSchedulesDeleteItem = (id) => async (dispatch, getState) => {
//     dispatch(schedulesSetLoading());
//     const currentSchedules = getState().schedules.items;
//     console.log("currentSchedules:", currentSchedules);
//     const deleteYear = currentSchedules[0].date.$y;
//     console.log("dYear:", deleteYear);
//     const deleteMonth = currentSchedules[0].date.$M + 1;
//     console.log("dMonth:", deleteMonth);

//     const deleteId = currentSchedules[0].id;
//     console.log("dId:", deleteId);

//     await db
//         .collection("post")
//         .doc(deleteYear)
//         .collection(deleteMonth)
//         .doc(deleteId)
//         .delete()
//         .then(() => {
//             console.log("deleted!");
//         })
//         .catch((error) => {
//             throw new Error(error);
//         });

//     // 成功したらローカルのstateを削除
//     const newSchedules = currentSchedules.filter((s) => s.id !== id);
//     console.log("newSchedules:", newSchedules);
//     dispatch(schedulesDeleteItem(newSchedules));
// };
