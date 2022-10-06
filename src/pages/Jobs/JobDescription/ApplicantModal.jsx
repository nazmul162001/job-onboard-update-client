import emailjs from "@emailjs/browser";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import auth from "../../../Auth/Firebase/Firebase.init";
import Loading from "../../../components/Loading/Loading";
import { BASE_API } from "../../../config";
import useCandidateInfo from "../../../hooks/useCandidateInfo";
const ApplicantModal = ({ job }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const { data, isLoading } = useCandidateInfo();
  const navigate = useNavigate();
  const form = useRef();

  const userInfo = data?.data?.result;
  // console.log(userInfo);
  const [profileUrl, setProfileUrl] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfFileError, setPdfFileError] = useState("");

  // for submit event

  const fileType = ["application/pdf"];
  const handlePdfFileChange = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && fileType.includes(selectedFile.type)) {
        let reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = (e) => {
          setPdfFile(e.target.result);
          setPdfFileError("");
        };
      } else {
        setPdfFile(null);
        setPdfFileError("Please select valid pdf file");
      }
    } else {
      console.log("select your file");
    }
  };
  const candidateResume = pdfFile;
  console.log(candidateResume);
  useEffect(() => {
    if (userInfo?.profileUrl) {
      setProfileUrl(userInfo?.profileUrl);
    } else if (!userInfo?.profileUrl) {
      setProfileUrl("https://i.ibb.co/xY0rfV4/avatar.jpg");
    }
  }, [userInfo?.profileUrl]);

  // console.log(profileUrl);
  if (isLoading) {
    return <Loading />;
  }

  const displayName = auth?.currentUser?.displayName;
  // console.log(displayName);
  const email = auth?.currentUser?.email;

  // console.log(job);
  const { category, companyName, hrEmail, hrName, jobTitle } = job;
  const jobPostId = job?._id;
  const createdDate = job?.createdDate;
  var time = new Date().getTime();
  var date = new Date(time);
  var appliedDate = date;

  const onSubmit = async (data, e) => {
    // e.preventDefault();
    // console.log(e.target.userName.value, e.target.userEmail.value);
    emailjs
      .sendForm(
        "jobonboard",
        "template_rl0besf",
        form.current,
        "lRS8nTIq8vSGv3U0Y"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );

    const applicantData = {
      ...data,
      candidateResume: candidateResume,
      displayName,
      email,
      category,
      companyName,
      hrEmail,
      hrName,
      jobTitle,
      jobPostId,
      createdDate,
      appliedDate,
      profileUrl,
      job,
      userInfo,
    };
    // console.log(applicantData);
    await fetch(`${BASE_API}/applicants`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(applicantData),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log('Success:', data);
        if (data.insertedId) {
          Swal.fire({
            text: "Your application has been submitted successfully. ",
            icon: "success",
            confirmButtonText: "Okay",
          });
          reset();
          navigate("/dashboard/appliedJobs");
        } else {
          Swal.fire({
            text: `Something is wrong`,
            icon: "error",
            confirmButtonText: "Try Again",
          });
        }
      });
  };

  return (
    <div>
      <input type="checkbox" id="applicant-modal" className="modal-toggle " />
      <div className="modal ">
        <div className="modal-box w-11/12 max-w-5xl">
          <label
            htmlFor="applicant-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h2 className="text-lg md:text-2xl lg:text-4xl pt-8 pb-12 font-mono">
            Apply For {job?.jobTitle}
          </h2>
          <div>
            <form
              ref={form}
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-2"
            >
              {/* name filed  */}
              <div className="grid grid-cols-1 ">
                <div className="flex flex-col space-y-1 gap-y-1">
                  <label className="text-lg pl-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={auth?.currentUser?.displayName}
                    name="userName"
                    placeholder="Full Name"
                    className="border rounded-lg py-1 text-lg pl-3 hover:border-primary duration-300"
                  />
                </div>
              </div>
              {/* name filed end */}

              <div className="flex flex-col space-y-1 gap-y-1 py-2">
                <label className="text-lg pl-2">
                  Your email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={auth?.currentUser?.email}
                  name="userEmail"
                  className="border rounded-lg py-2 text-lg pl-3 "
                />
              </div>

              <div className="flex flex-col space-y-1 gap-y-1 ">
                <label className="text-lg pl-2">
                  Contact number <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  placeholder="Phone number"
                  defaultValue={userInfo?.number}
                  className="border rounded-lg text-black py-1 text-lg pl-3 hover:border-primary duration-300"
                  {...register("number", {
                    required: {
                      value: true,
                      message: "This field is required",
                    },
                  })}
                />
                <p className="text-[13px] text-red-500 pl-3">
                  {errors.number?.message}
                </p>
              </div>

              <div className="flex flex-col space-y-1 gap-y-1 py-2">
                <label className="md:text-lg pl-2">
                  Your Resume/CV (provide google drive link){" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  required
                  onChange={handlePdfFileChange}
                  type="file"
                  name=""
                  id=""
                />

                {pdfFileError && (
                  <div className="error-msg">{pdfFileError}</div>
                )}
                <p className="text-[13px] text-red-500 pl-3">
                  {errors.resume?.message}
                </p>
              </div>

              {/* social link  */}

              <h3 className="text-lg md:text-xl lg:text-2xl pl-2">
                Social Links
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex flex-col space-y-1 gap-y-1">
                  <input
                    type="text"
                    placeholder="portfolioUrl"
                    defaultValue={userInfo?.portfolioUrl}
                    className="text-black border rounded-lg py-1 text-lg pl-3 hover:border-primary duration-300"
                    {...register("portfolioUrl", {
                      required: {
                        value: true,
                        message: "This field is required",
                      },
                    })}
                  />
                  <p className="text-[13px] text-red-500 pl-3">
                    {errors.portfolioUrl?.message}
                  </p>
                </div>

                <div className="flex flex-col space-y-1 gap-y-1">
                  <input
                    type="text"
                    placeholder="Linkedin"
                    defaultValue={userInfo?.linkedinUrl}
                    className="text-[#4e4c4c] border rounded-lg py-1 text-lg pl-3 hover:border-primary duration-300"
                    {...register("linkedinUrl", {
                      required: {
                        value: true,
                        message: "This field is required",
                      },
                    })}
                  />
                  <p className="text-[13px] text-red-500 pl-3">
                    {errors.linkedinUrl?.message}
                  </p>
                </div>
              </div>

              {/* social link end */}

              <div className="flex flex-col space-y-1 gap-y-1 py-5">
                <h4 className="pl-2 md:text-lg">
                  Why should you be hired for this role?{" "}
                  <span className="text-red-500">*</span>
                </h4>
                <textarea
                  type="text"
                  rows={4}
                  placeholder="Add a cover letter"
                  className="text-black border rounded-lg py-1 text-xl pl-3 hover:border-primary duration-300"
                  {...register("coverLetter", {
                    required: {
                      value: true,
                      message: "This field is required",
                    },
                  })}
                />
                <p className="text-[13px] text-red-500 pl-3">
                  {errors.coverLetter?.message}
                </p>
              </div>

              <div className="pb-5 lg:pb-2 text-center lg:text-start">
                <button className="px-5 py-3  border bg-primary duration-300 hover:bg-[#6f49c7] rounded-lg text-lg  text-white">
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicantModal;
