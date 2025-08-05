export const products = [
  { value: "erp", label: "ERP" },
  { value: "onlineTest", label: "Online Test" },
  { value: "lms", label: "LMS" },
  { value: "e-commerce", label: "E-Commerce" },
];

export const enquiry = [
  { value: 1, label: "Course Enquiry" },
  { value: 2, label: "Product Enquiry" },
  { value: 3, label: "Internship Enquiry" },
];
export const qualificationOptions = [
  { value: "10th", label: "10th" },
  { value: "12th", label: "12th" },
  { value: "Diploma", label: "Diploma" },
  { value: "Graduate", label: "Graduate" },
  { value: "Post Graduate", label: "Post Graduate" },
];
export const options = [
  { value: "MERN", label: "MERN" },
  { value: "MEAN", label: "BaMEANnana" },
  { value: "Full Stack Web Development", label: "Full Stack Web Development" },
  { value: "C/C++/Data Structures", label: "C/C++/Data Structures" },
  { value: "Java Full Stack", label: "Java Full Stack" },
  { value: "Python ", label: "Python" },
  { value: "PHP ", label: "PHP" },
  { value: "Artificial Intelligence ", label: "Artificial Intelligence" },
  { value: "Machine Learning ", label: "Machine Learning" },
  { value: "Big Data ", label: "Big Data" },
  { value: "Data Science ", label: "Data Science" },
  { value: "Data Analytics ", label: "Data Analytics" },
  {
    value: "IT Security & Ethical Hacking ",
    label: "IT Security & Ethical Hacking",
  },
  { value: "Cloud Computing ", label: "Cloud Computing" },
  { value: "Devops ", label: "Devops" },
  { value: "AWS ", label: "AWS" },
  { value: "Other ", label: "Other" },
];
export const genderOptions = [
  { value: 1, label: "Male" },
  { value: 2, label: "Female" },
  { value: 3, label: "Prefer not to say" },
];
export const refOptions = [
  { value: 1, label: "Social Media" },
  { value: 2, label: "Friends / Relatives" },
  { value: 3, label: "Website" },
  { value: 4, label: "Telecalling" },
  { value: 5, label: "Other" },
];

export const enquiryType = [
  { value: "internShip", label: "Internship" },
  { value: "fullTime", label: "Full Time" },
];

export const studentFeeData = [
  {
    name: "TAHA",
    phone: "9981341447",
    totalFees: "55000",
    feeReceived: "25000",
    dueFee: "30000",
    collectionDate: "02-02-2025",
  },
  {
    name: "Ali",
    phone: "9876543210",
    totalFees: "55000",
    feeReceived: "20000",
    dueFee: "15000",
    collectionDate: "15-03-2025",
  },
  {
    name: "Zoya",
    phone: "9123456780",
    totalFees: "55000",
    feeReceived: "35000",
    dueFee: "5000",
    collectionDate: "22-01-2025",
  },
  {
    name: "Ravi",
    phone: "9999999999",
    totalFees: "55000",
    feeReceived: "18000",
    dueFee: "12000",
    collectionDate: "10-04-2025",
  },
];

export const paymentMode = [
  { value: 0, label: "Cash" },
  { value: 1, label: "Online" },
  { value: 2, label: "Check" },
];

export const questionType = [
  { value: 1, label: "MCQ" },
  { value: 2, label: "Descriptive" },
  { value: 3, label: "Coding Challenge" },
];

export const Type = [
  { label: "Create Manually", value: "CreateManually" },
  { label: "Bulk Upload", value: "BulkUpload" },
];

export const pageNum = [
  { value: 10, label: "10" },
  { value: 25, label: " 25" },
  { value: 50, label: "50" },
  { value: 100, label: "100" },
  { value: 5, label: "5" },
];

export const typeModeClass = [
  { value: "online", label: "Online" },
  { value: "offline", label: "Offline" },
];
export const paymentOptions = [
  { value: 1, label: "Individual" },
  { value: 2, label: "Paid Organization" },
];

export const organizationOptions = [
  { value: 1, label: "Truba" },
  { value: 2, label: "LNCT" },
  { value: 3, label: "NGO" },
];
export const modeOptions = [
  { value: 0, label: "Offline" },
  { value: 1, label: "Online" },
  { value: 2, label: "Hybrid" },
];

export const durationOptions = [
  // { value: 0, label: "Hours" },
  { value: 1, label: "Day" },
  { value: 2, label: "Week" },
  { value: 3, label: "Month" },
  { value: 4, label: "Year" },
];

export const course = [
  {
    id: 0,
    title: "Python",
    topics: [
      {
        label: "Topic 1 - You Tude Video",
        type: "youtube",
        mediaUrl: "https://www.youtube.com/watch?v=LXb3EKWsInQ",
        time: "2:30",
      },
      {
        label: "Topic 2 - MP 4 Video",
        type: "video",
        mediaUrl:
          "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        time: "8:30",
      },
      { label: "Topic 3 - PDF", type: "pdf" },
      {
        label: "Topic 4 - Image",
        type: "image",
        mediaUrl: require("assets/img/ship-7643503_1280.png"),
      },
      {
        label: "Topic 5 - Ppt",
        type: "ppt",
      },
    ],
  },
  {
    id: 1,
    title: "React JS",
    topics: [
      {
        label: "Topic 1 - You Tude Video",
        type: "youtube",
        mediaUrl: "https://www.youtube.com/watch?v=s2skans2dP4",
        time: "8:30",
      },
      {
        label: "Topic 2 - MP 4 Video",
        type: "video",
        mediaUrl:
          "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        time: "8:30",
      },
      { label: "Topic 3 - PDF", type: "pdf" },
      {
        label: "Topic 4 - Image",
        type: "image",
        mediaUrl: require("assets/img/ship-7643503_1280.png"),
      },
      {
        label: "Topic 5 - Ppt",
        type: "ppt",
      },
    ],
  },
  {
    id: 2,
    title: "Full Stack Developer",
    topics: [
      {
        label: "Topic 1 - You Tude Video",
        type: "youtube",
        mediaUrl: "https://www.youtube.com/watch?v=IIDuE0dnXlo&t=78s",
        time: "8:30",
      },
      {
        label: "Topic 2 - MP 4 Video",
        type: "video",
        mediaUrl:
          "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        time: "8:30",
      },
      { label: "Topic 3 - PDF", type: "pdf" },
      {
        label: "Topic 4 - Image",
        type: "image",
        mediaUrl: require("assets/img/ship-7643503_1280.png"),
      },
      {
        label: "Topic 5 - Ppt",
        type: "ppt",
      },
    ],
  },
  {
    id: 3,
    title: "Node JS",
    topics: [
      {
        label: "Topic 1 - You Tude Video",
        type: "youtube",
        mediaUrl: " https://www.youtube.com/watch?v=ENrzD9HAZK4",
        time: "8:30",
      },
      {
        label: "Topic 2 - MP 4 Video",
        type: "video",
        mediaUrl:
          "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        time: "8:30",
      },
      { label: "Topic 3 - PDF", type: "pdf" },
      {
        label: "Topic 4 - Image",
        type: "image",
        mediaUrl: require("assets/img/ship-7643503_1280.png"),
      },
      {
        label: "Topic 5 - Ppt",
        type: "ppt",
      },
    ],
  },
];
