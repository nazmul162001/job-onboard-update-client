import { createContext, useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import RequireAdmin from "./Auth/RequireAdmin/RequireAdmin";
import RequireAuth from "./Auth/RequireAuth/RequireAuth";
import RequireHr from "./Auth/RequireHr/RequireHr";
import ScrollButton from "./components/ScrollButton/ScrollButton";
import useImage from "./hooks/useImage";
import AboutUs from "./pages/AboutUs/AboutUs";
import ApplicantTracking from "./pages/ApplicantTracking/ApplicantTracking";
import Login from "./pages/Authentication/Login/Login";
import ResetPassword from "./pages/Authentication/ResetPassword/ResetPassword";
import SignUp from "./pages/Authentication/SignUp/SignUp";
import SignUpForHrManager from "./pages/Authentication/SignUpForHrManager/SignUpForHrManager";
import Blog from "./pages/Blog/Blog";
import BlogsDetail from "./pages/Blog/BlogsDetail";
import Contact from "./pages/ContactUs/Contact";
import Home from "./pages/Home/Home/Home";
import AllJob from "./pages/Jobs/AllJob/AllJob";
import JobDescription from "./pages/Jobs/JobDescription/JobDescription";
import AppliedJobs from "./pages/ManageDashboard/AppliedJobs/AppliedJobs";
import Candidates from "./pages/ManageDashboard/Candidates/Candidates";
import SingleCandidates from "./pages/ManageDashboard/Candidates/SingleCandidates";

import CompanyDetails from "./pages/ManageDashboard/CompanyDetails/CompanyDetails";
import Dashboard from "./pages/ManageDashboard/Dashboard/Dashboard";
import EmployeeDetails from "./pages/ManageDashboard/EmployeeRoot/EmployeeDetails";
import EmployeesRoot from "./pages/ManageDashboard/EmployeeRoot/EmployeesRoot";
import HrJob from "./pages/ManageDashboard/HrJob/HrJob";
import Inbox from "./pages/ManageDashboard/Inbox/Inbox";
import AddNewJob from "./pages/ManageDashboard/Jobs/AddNewJob";
import ManageAllJobs from "./pages/ManageDashboard/ManageAllJobs/ManageAllJobs";
import AllHr from "./pages/ManageDashboard/ManageHr/AllHr";
import Profile from "./pages/ManageDashboard/Profile/Profile";
import Recruitment from "./pages/ManageDashboard/Recruitment/Recruitment";
import SendMailCandidates from "./pages/ManageDashboard/Recruitment/SendMailCandidates";
import SingleJobCandidates from "./pages/ManageDashboard/Recruitment/SingleJobCandidates/SingleJobCandidates";
import ViewSubmission from "./pages/ManageDashboard/Recruitment/SingleJobCandidates/ViewSubmission/ViewSubmission";
import JobTask from "./pages/ManageDashboard/WelcomeDashboard/CandidateDashboard/JobTask/JobTask";
import TaskDetails from "./pages/ManageDashboard/WelcomeDashboard/CandidateDashboard/JobTask/TaskDetails";
import AllRecentApplicants from "./pages/ManageDashboard/WelcomeDashboard/HrDashboard/AllRecentApplicants/AllRecentApplicants";
import WelcomeDashboard from "./pages/ManageDashboard/WelcomeDashboard/WelcomeDashboard";
import Payment from "./pages/PaymentSystem/Payment/Payment";
import Pricing from "./pages/PaymentSystem/Pricing/Pricing";
import Navbar from "./Shared/Navbar/Navbar";
import NotFound from "./Shared/NotFound/NotFound";

export const InitializeContext = createContext(null);

function App() {
  const [theme, setTheme] = useState(false);
  const [profileUrl] = useImage();

  useEffect(() => {
    setTheme(JSON.parse(window.localStorage.getItem("theme")));
  }, []);

  const handleThemeChange = () => {
    setTheme(!theme);
    window.localStorage.setItem("theme", !theme);
  };
  return (
    <div data-theme={theme && "night"}>
      <InitializeContext.Provider
        value={{ handleThemeChange, theme, profileUrl }}
      >
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Job Route Start */}

          <Route path="/jobs" element={<AllJob />} />
          <Route path="/job/:jobId" element={<JobDescription />} />

          {/* Job Route End  */}

          <Route
            path="applicant-tracking"
            element={<ApplicantTracking />}
          ></Route>
          <Route path="/blog" element={<Blog />}></Route>
          <Route path="/blog/:blogId" element={<BlogsDetail />}></Route>
          <Route path="contact-us" element={<Contact />}></Route>
          <Route path="/about" element={<AboutUs />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/signUp/hr" element={<SignUpForHrManager />} />
          <Route path="/resetPassword" element={<ResetPassword />} />
          <Route
            path="/dashboard"
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          >
            <Route index element={<WelcomeDashboard />} />
            <Route
              path="job/addNew"
              element={
                <RequireHr>
                  <AddNewJob />
                </RequireHr>
              }
            />

            <Route
              path="hr-jobs"
              element={
                <RequireHr>
                  <HrJob />
                </RequireHr>
              }
            />

            <Route path="profile" element={<Profile />} />
            <Route
              path="employee"
              element={
                <RequireHr>
                  <EmployeesRoot />
                </RequireHr>
              }
            />

            <Route path="employee/:detailsId" element={<EmployeeDetails />} />

            <Route path="appliedJobs" element={<AppliedJobs />} />
            <Route path="jobs" element={<ManageAllJobs />} />
            <Route path="task" element={<JobTask />} />
            <Route path="task/:taskId" element={<TaskDetails />} />
            <Route
              path="recruitment"
              element={
                <RequireHr>
                  <Recruitment />
                </RequireHr>
              }
            />
            <Route
              path="candidates/mail/:candidatesID"
              element={
                <RequireHr>
                  <SendMailCandidates />
                </RequireHr>
              }
            />
            <Route
              path="recruitment/job/:jobId"
              element={
                <RequireHr>
                  <SingleJobCandidates />
                </RequireHr>
              }
            />
            <Route
              path="submittedTask/candidate/:applicantId"
              element={<ViewSubmission />}
            />
            <Route path="candidates" element={<Candidates />} />
            <Route
              path="candidates/:candidatesID"
              element={<SingleCandidates />}
            />
            <Route
              path="allRecentApplicants"
              element={<AllRecentApplicants />}
            />
            <Route path="mails" element={<Inbox />} />
            <Route path="company" element={<CompanyDetails />} />
            <Route
              path="allUsers"
              element={
                <RequireAdmin>
                  <AllHr />
                </RequireAdmin>
              }
            />
          </Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
        <ScrollButton />
        <Toaster />
      </InitializeContext.Provider>
    </div>
  );
}

export default App;
