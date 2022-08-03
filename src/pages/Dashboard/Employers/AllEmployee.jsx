import React from "react";
import { AiFillEdit, AiOutlineMail } from "react-icons/ai";
import { MdLocationOn } from "react-icons/md";
import "./EmployersCss/Employers.css";
const AllEmployee = ({ employe }) => {
  const { id, name, location, email } = employe;

  return (
    <div>
      <div class="empoyeeContainer h-60 bg-base-100 shadow-md rounded-md p-2">
        <input type="checkbox" className="checkbox" />
        <div class="text-center">
          <div class="avatar placeholder mx-auto mb-4 ">
            <div class=" bg-cyan-600 text-white font-bold rounded-full w-32 avaterInfo">
              <span class="text-3xl">{name.slice(0, 1)}</span>
            </div>
          </div>
          <p class=" text-indigo-600">{name}</p>
        </div>
        <div className="employeInfo ">
          <AiFillEdit className="editBtn" />
          <div className="mt-24">
            <p>{name}</p>
            <p>{id}</p>
            <hr />
            <p className="fontInfo flex items-center text-xs">
              <AiOutlineMail className="mr-3" />
              {email}
            </p>
            <p className="fontInfo flex items-center text-xs">
              <MdLocationOn className="mr-3" />
              {location}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllEmployee;
