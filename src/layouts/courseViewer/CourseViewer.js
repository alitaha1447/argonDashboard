import React from "react";
import { BiChevronDown, BiPlay, BiLockAlt } from "react-icons/bi";
import ReactPlayer from "react-player";

const CourseViewer = () => {
  return (
    <div className="container-fluid p-5" style={{}}>
      <div className="container px-0 px-md-4 pt-3"></div>

      <div className="container px-3" style={{}}>
        <div
          className="row g-0 shadow-sm rounded overflow-hidden"
          style={{ height: "100%" }}
        >
          <div className="col-12 col-lg-7 p-2">
            <div className="p-2" style={{ height: "100%", width: "100%" }}>
              <ReactPlayer
                src="https://www.youtube.com/watch?v=DtYrxTp_1fA"
                controls
                width="100%"
                height="100%"
              />
              {/* <video
                width="600"
                height="350"
                controls
                autoplay
                controlsList="nodownload"
                oncontextmenu="return false"
              >
                <source
                  src="https://www.youtube.com/watch?v=u4yGpeunVAA&list=RDu4yGpeunVAA&start_radio=1"
                  type="video/mp4"
                />
              </video> */}

              {/* <iframe
                width="600"
                height="350"
                src="https://www.youtube.com/embed/u4yGpeunVAA?autoplay=1&controls=1&modestbranding=1"
                frameborder="0"
                allow="autoplay; encrypted-media"
                allowfullscreen
              ></iframe> */}

              {/* <img
                src={require("assets/img/81kJPl8jmiL._SY741_.jpg")}
                class="img-fluid"
                style={{ height: "450px", width: "100%", objectFit: "contain" }}
              /> */}
            </div>
          </div>

          {/* Course Content Column - Full width on mobile, 1/3 on larger screens */}
          <div className="col-12 col-lg-5 border-start p-2">
            <div className="p-3">
              <h1 className="fw-bold mb-1">Course content</h1>
              <div className="mb-3">
                <ul
                  className="list-group list-group-flush"
                  style={{
                    maxHeight: "100%",
                    overflowY: "auto",
                  }}
                >
                  {[
                    {
                      title: "Video 1",
                    },

                    {
                      title: "Video 1",
                    },
                    {
                      title: "Video 1",
                    },
                    // {
                    //   title:
                    //     "Day 1 Goals: what we will make by the end of the day",
                    //   time: "02:30",
                    // },
                    // {
                    //   title: "Download and Setup PyCharm for Learning",
                    //   time: "01:34",
                    // },
                    // {
                    //   title: "Printing to the Console in Python",
                    //   time: "11:25",
                    // },
                    {
                      title: "Video 1",
                    },
                    {
                      title: "Video 1",
                    },
                    {
                      title: "Video 1",
                    },
                  ].map((item, idx) => (
                    <li
                      key={idx}
                      className="list-group-item border-0 py-2 px-3 d-flex justify-content-between align-items-center"
                    >
                      <div
                        className="d-flex align-items-center"
                        style={{ maxWidth: "80%" }}
                      >
                        {/* {item.preview ? (
                          <BiPlay className="text-primary me-2 flex-shrink-0" />
                        ) : (
                          <BiLockAlt className="text-muted me-2 flex-shrink-0" />
                        )} */}
                        <span
                          className={`${
                            item.preview ? "text-primary" : ""
                          } text-truncate`}
                        >
                          {item.title}
                        </span>
                        {item.question && (
                          <span className="badge bg-light text-dark border ms-2 small flex-shrink-0">
                            1 question
                          </span>
                        )}
                      </div>
                      <span className="text-muted small flex-shrink-0">
                        {item.preview ? "Preview" : item.time || ""}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseViewer;
