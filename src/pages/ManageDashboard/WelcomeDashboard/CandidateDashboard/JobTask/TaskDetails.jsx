import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../../../../components/Loading/Loading";
import { BASE_API } from "../../../../../config";
import SubmitTaskModal from "./SubmitTaskModal";
const TaskDetails = () => {
  const { taskId } = useParams();
  const [singleTask, setSingleTask] = useState({});
  // const [singleSubmittedTask, setSingleSubmittedTask] = useState({});
  const { isLoading } = useQuery(["singleId"], () =>
    fetch(`${BASE_API}/singleTask/${taskId}`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setSingleTask(data))
  );

  const { data } = useQuery(["candidateSubmission"], () =>
    axios.get(`${BASE_API}/submittedTask`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
  );

  const submissionData = data?.data;

  // console.log(submissionData)

  const filtered = submissionData?.filter((data) => {
    return data?.email === singleTask?.candidateEmail;
  });

  const {
    companyName,
    taskDate,
    taskDiscriptioin,
    timeDuration,
    taskName,
    taskTime,
  } = singleTask;
  // console.log(filtered)

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className="mt-8 ">
      <div className="info  bg-[#01022ee6] mt-4 text-white rounded-md ">
        <p className="cName text-2xl font-bold text-center py-4">
          {companyName}
        </p>
        <hr />
        <div className="taskDetails flex items-center justify-between px-5 py-3">
          <div className="task text-[20px] font-bold font-[monospace]">
            <p>
              <span className="text-[#62ccd7]">Task For: </span>
              {taskName}
            </p>
            <p>
              <span className="text-[#62ccd7]">Task Date: </span>
              {taskDate?.slice(0, 10)}
            </p>
            <p>
              <span className="text-[#62ccd7]">Task Time: </span>
              {taskTime}
            </p>
            <p>
              <span className="text-[#62ccd7]">Task Duration: </span>
              {timeDuration}
            </p>
          </div>
          <div>
            <SubmitTaskModal singleTask={singleTask} />
          </div>
        </div>
      </div>

      <div>
        <p className="text-center font-bold my-5 text-xl">Task Description</p>
        <p className="px-10">{taskDiscriptioin}</p>
      </div>
    </section>
  );
};

export default TaskDetails;
