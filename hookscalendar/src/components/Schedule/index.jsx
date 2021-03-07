import React from "react";

import * as styles from "./style.module.css";

const Schedule = ({ schedule }) => {
    // console.log("schedule:", schedule);
    return <div className={styles.schedule}>{schedule.title}</div>;
};

export default Schedule;
