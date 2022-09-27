import { Viewer } from "@react-pdf-viewer/core"; // install this library
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_API } from "../../../../../config";
// Plugins
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout"; // install this library
// Import the styles
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
// Worker
import { Worker } from "@react-pdf-viewer/core"; // install this library
const ViewResume = () => {
  const { resumeId } = useParams();
  const [seeResume, setSeeResume] = useState(null);
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  useEffect(() => {
    fetch(`${BASE_API}/applicants/cndidateResume/${resumeId}`)
      .then((res) => res.json())
      .then((data) => setSeeResume(data?.candidateResume));
  }, [resumeId]);

  return (
    <div>
      {seeResume && (
        <>
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.15.349/build/pdf.worker.min.js">
            <Viewer
              fileUrl={seeResume}
              plugins={[defaultLayoutPluginInstance]}
            />
          </Worker>
        </>
      )}
    </div>
  );
};

export default ViewResume;
