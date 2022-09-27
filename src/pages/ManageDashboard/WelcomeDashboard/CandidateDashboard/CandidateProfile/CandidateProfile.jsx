import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../../../Auth/Firebase/Firebase.init";
const CandidateProfile = () => {
  const [user, isLoading] = useAuthState(auth);
  console.log(user);
  return (
    <section>
      <div className="userProfile flex items-center justify-center gap-16 py-4">
        <div className="userName text-4xl font-bold uppercase text-[#1f1f48]">
          {user.displayName}
        </div>
        <div className="avatar online">
          <div className="w-24 rounded-full">
            {user.photoURL ? (
              <div className="avatar online ring-primary ring-offset-base-100 ring-offset-2">
                <div className="w-24 rounded-full">
                  <img
                    src="https://png.pngitem.com/pimgs/s/522-5220445_anonymous-profile-grey-person-sticker-glitch-empty-profile.png"
                    alt=""
                  />
                </div>
              </div>
            ) : (
              <div className="avatar online ring-primary ring-offset-base-100 ring-offset-2">
                <div className="w-24 rounded-full">
                  <img
                    src="https://png.pngitem.com/pimgs/s/522-5220445_anonymous-profile-grey-person-sticker-glitch-empty-profile.png"
                    alt=""
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="userInfoContainer mx-12 border border-1 border-red-500">
        <div className="userEducation">
         <p>Education</p>

        </div>
      </div>
    </section>
  );
};

export default CandidateProfile;
