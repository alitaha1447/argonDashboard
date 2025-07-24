// import Index from "views/Index.js";
// // import Profile from "views/examples/Profile.js";
// // import Maps from "views/examples/Maps.js";
// import Register from "views/examples/Register.js";
// import Login from "views/examples/Login.js";
// // import Tables from "views/examples/Tables.js";
// import Enquiry from "views/examples/Enquiry";
// import List from "views/examples/List";
// // import Icons from "views/examples/Icons.js";
// // import Test from "views/examples/Test";
// import ContentMaster from "views/master/ContentMaster";
// import CourseMaster from "views/master/CourseMaster";
// import ContentType from "views/master/ContentType";
// import EnquiryType from "views/master/EnquiryType";
// import FeesMaster from "views/master/FeesMaster";
// import UserCreation from "views/master/UserCreation";
// import Attendance from "views/transaction/Attendance";
// import Certificate from "views/transaction/Certificate";
// import CourseStructure from "views/transaction/CourseStructure";
// import HRPayment from "views/transaction/HRPayment";
// import Payable from "views/transaction/Payable";
// import Appointmentletter from "views/employee/Appointmentletter";
// import ExperienceCertificate from "views/employee/ExperienceCertificate";
// import Achievement from "views/employee/Achievement";
// import Relieving from "views/employee/Relieving";
// import AnuallIncrement from "views/employee/AnuallIncrement";
// import InternFulltime from "views/employee/InternFulltime";
// import Item from "views/inventory/Item";
// import Group from "views/inventory/Group";
// import Purchase from "views/inventory/Purchase";
// import Sale from "views/inventory/Sale";
// import Billing from "views/inventory/Billing";
// import EFilling from "views/main_menu/EFilling";
// import Support from "views/main_menu/Support";
// import Village from "views/master/Village";
// import GramPanchayat from "views/master/GramPanchayat";
// import Block from "views/master/Block";
// import District from "views/master/District";
// import State from "views/master/State";
// import EnquiryDashboard from "views/dashboard/EnquiryDashboard";
// import FeesDashboard from "views/dashboard/FeesDashboard";
// import Test from "views/master/Test";
// import DailyCollection from "views/transaction/report/fees/DailyCollection";
// import DueBalance from "views/transaction/report/fees/DueBalance";
// import FacultyCourses from "views/reports/course/FacultyCourses";
// import BatchStudent from "views/transaction/course/BatchStudent";
// import ReceiptList from "views/reports/fees/ReceiptList";

// var routes = [
//   {
//     name: "Enquiry Dashboard", // 👈 just a label, no path
//     isLabel: true,
//   },
//   // {
//   //   path: "/index",
//   //   name: "Dashboard",
//   //   icon: "ni ni-tv-2 text-primary",
//   //   component: <Index />,
//   //   layout: "/admin",
//   // },

//   {
//     path: "/enquiryDashboard",
//     name: "Enquiry Dashboard",
//     icon: "ni ni-tv-2 text-primary",
//     component: <EnquiryDashboard />,
//     layout: "/admin",
//   },
//   {
//     path: "/feesDashboard",
//     name: "Fees Dashboard",
//     icon: "ni ni-tv-2 text-primary",
//     component: <FeesDashboard />,
//     layout: "/admin",
//   },
//   // {
//   //   path: "/enquiry",
//   //   name: "Enquiry Form",
//   //   icon: "ni ni-ungroup text-red",
//   //   component: <Enquiry />,
//   //   layout: "/admin",
//   // },
//   // {
//   //   path: "/list",
//   //   name: "List",
//   //   icon: "ni ni-bullet-list-67 text-red",
//   //   component: <List />,
//   //   layout: "/admin",
//   // },
//   {
//     path: "/login",
//     name: "Login",
//     icon: "ni ni-key-25 text-info",
//     component: <Login />,
//     layout: "/auth",
//   },
//   {
//     path: "/register",
//     name: "Register",
//     icon: "ni ni-circle-08 text-pink",
//     component: <Register />,
//     layout: "/auth",
//   },

//   // {
//   //   path: "/icons",
//   //   name: "Icons",
//   //   icon: "ni ni-planet text-blue",
//   //   component: <Icons />,
//   //   layout: "/admin",
//   // },
//   // {
//   //   path: "/maps",
//   //   name: "Maps",
//   //   icon: "ni ni-pin-3 text-orange",
//   //   component: <Maps />,
//   //   layout: "/admin",
//   // },
//   // {
//   //   path: "/user-profile",
//   //   name: "User Profile",
//   //   icon: "ni ni-single-02 text-yellow",
//   //   component: <Profile />,
//   //   layout: "/admin",
//   // },
//   // {
//   //   path: "/tables",
//   //   name: "Tables",
//   //   icon: "ni ni-bullet-list-67 text-red",
//   //   component: <Tables />,
//   //   layout: "/admin",
//   // },
//   {
//     name: "Master", // 👈 just a label, no path
//     isLabel: true,
//   },
//   {
//     id: "master-user",
//     name: "User",
//     icon: "ni ni-folder-17 text-orange",
//     layout: "/admin",
//     children: [
//       {
//         path: "/userCreation",
//         name: "User Creation",
//         icon: "ni ni-single-copy-04 text-red",
//         component: <UserCreation />,
//         layout: "/admin",
//       },
//     ],
//   },
//   {
//     id: "master-course",
//     name: "Course",
//     icon: "ni ni-folder-17 text-orange",
//     layout: "/admin",
//     children: [
//       {
//         path: "/courseStructure",
//         name: "CourseStructure",
//         icon: "ni ni-single-copy-04 text-red",
//         component: <CourseStructure />,
//         layout: "/admin",
//       },
//       {
//         path: "/courseMaster",
//         name: "CourseMaster",
//         icon: "ni ni-ungroup text-red",
//         component: <CourseMaster />,
//         layout: "/admin",
//       },
//     ],
//   },
//   {
//     id: "master-inventory",
//     name: "Inventory",
//     icon: "ni ni-folder-17 text-orange",
//     layout: "/admin",
//     children: [
//       {
//         path: "/item",
//         name: "Item",
//         icon: "ni ni-single-copy-04 text-red",
//         component: <Item />,
//         layout: "/admin",
//       },
//       {
//         path: "/group",
//         name: "Group",
//         icon: "ni ni-single-copy-04 text-red",
//         component: <Group />,
//         layout: "/admin",
//       },
//     ],
//   },
//   {
//     id: "master-content",
//     name: "Content",
//     icon: "ni ni-folder-17 text-orange",
//     layout: "/admin",
//     children: [
//       {
//         path: "/contentMaster",
//         name: "Content Master",
//         icon: "ni ni-single-copy-04 text-red",
//         component: <ContentMaster />,
//         layout: "/admin",
//       },
//       {
//         path: "/contentType",
//         name: "Content Type",
//         icon: "ni ni-single-copy-04 text-red",
//         component: <ContentType />,
//         layout: "/admin",
//       },
//     ],
//   },
//   {
//     id: "master-enquiry",
//     name: "Enquiry",
//     icon: "ni ni-folder-17 text-orange",
//     layout: "/admin",
//     children: [
//       {
//         path: "/enquiryType",
//         name: "Enquiry Type",
//         icon: "ni ni-single-copy-04 text-red",
//         component: <EnquiryType />,
//         layout: "/admin",
//       },
//       {
//         path: "/group",
//         name: "Group",
//         icon: "ni ni-single-copy-04 text-red",
//         component: <Group />,
//         layout: "/admin",
//       },
//     ],
//   },
//   {
//     id: "master-test",
//     name: "Test",
//     icon: "ni ni-folder-17 text-orange",
//     layout: "/admin",
//     children: [
//       {
//         path: "/test",
//         name: "Test",
//         icon: "ni ni-single-copy-04 text-red",
//         component: <Test />,
//         layout: "/admin",
//       },
//     ],
//   },
//   {
//     id: "master-fees",
//     name: "Fees",
//     icon: "ni ni-folder-17 text-orange",
//     layout: "/admin",
//     children: [
//       {
//         path: "/feesMaster",
//         name: "Fees Master",
//         icon: "ni ni-single-copy-04 text-red",
//         component: <FeesMaster />,
//         layout: "/admin",
//       },
//     ],
//   },
//   {
//     id: "master-branch",
//     name: "Branch",
//     icon: "ni ni-folder-17 text-orange",
//     layout: "/admin",
//     children: [
//       {
//         path: "/state",
//         name: "State",
//         icon: "ni ni-single-copy-04 text-red",
//         component: <State />,
//         layout: "/admin",
//       },
//       {
//         path: "/district",
//         name: "District",
//         icon: "ni ni-single-copy-04 text-red",
//         component: <District />,
//         layout: "/admin",
//       },
//       {
//         path: "/block",
//         name: "Block",
//         icon: "ni ni-single-copy-04 text-red",
//         component: <Block />,
//         layout: "/admin",
//       },
//       {
//         path: "/gramPanchayat",
//         name: "Gram Panchayat",
//         icon: "ni ni-single-copy-04 text-red",
//         component: <GramPanchayat />,
//         layout: "/admin",
//       },
//       {
//         path: "/village",
//         name: "Village",
//         icon: "ni ni-single-copy-04 text-red",
//         component: <Village />,
//         layout: "/admin",
//       },
//     ],
//   },
//   // {
//   //   path: "/contentMaster",
//   //   name: "ContentMaster",
//   //   icon: "ni ni-ungroup text-red",
//   //   component: <ContentMaster />,
//   //   layout: "/admin",
//   // },

//   // {
//   //   path: "/courseMaster",
//   //   name: "CourseMaster",
//   //   icon: "ni ni-ungroup text-red",
//   //   component: <CourseMaster />,
//   //   layout: "/admin",
//   // },
//   // {
//   //   path: "/enquiryType",
//   //   name: "EnquiryType",
//   //   icon: "ni ni-ungroup text-red",
//   //   component: <EnquiryType />,
//   //   layout: "/admin",
//   // },
//   // {
//   //   path: "/feesMaster",
//   //   name: "FeesMaster",
//   //   icon: "ni ni-ungroup text-red",
//   //   component: <FeesMaster />,
//   //   layout: "/admin",
//   // },
//   // {
//   //   path: "/userCreation",
//   //   name: "UserCreation",
//   //   icon: "ni ni-ungroup text-red",
//   //   component: <UserCreation />,
//   //   layout: "/admin",
//   // },
//   // {
//   //   name: "Forms",
//   //   icon: "ni ni-folder-17 text-orange",
//   //   layout: "/admin",
//   //   children: [
//   //     {
//   //       path: "/enquiry",
//   //       name: "Enquiry Form",
//   //       icon: "ni ni-single-copy-04 text-red",
//   //       component: <Enquiry />,
//   //       layout: "/admin",
//   //     },
//   //     {
//   //       path: "/list",
//   //       name: "List",
//   //       icon: "ni ni-bullet-list-67 text-blue",
//   //       component: <List />,
//   //       layout: "/admin",
//   //     }
//   //   ]
//   // },

//   {
//     name: "Transaction", // 👈 just a label, no path
//     isLabel: true,
//   },
//   {
//     id: "transaction-hr",
//     name: "HR",
//     icon: "ni ni-folder-17 text-orange",
//     layout: "/admin",
//     children: [
//       {
//         path: "/attendance",
//         name: "Attendance",
//         icon: "ni ni-ungroup text-red",
//         component: <Attendance />,
//         layout: "/admin",
//       },
//       {
//         path: "/hrPayment",
//         name: "HR_Payment",
//         icon: "ni ni-ungroup text-red",
//         component: <HRPayment />,
//         layout: "/admin",
//       },
//       {
//         path: "/payable",
//         name: "Payable",
//         icon: "ni ni-ungroup text-red",
//         component: <Payable />,
//         layout: "/admin",
//       },

//       {
//         path: "/appointmentLetter",
//         name: "Appointment letter",
//         icon: "ni ni-ungroup text-red",
//         component: <Appointmentletter />,
//         layout: "/admin",
//       },
//       {
//         path: "/relieving",
//         name: "Relieving Letter",
//         icon: "ni ni-ungroup text-red",
//         component: <Relieving />,
//         layout: "/admin",
//       },
//       {
//         path: "/experienceCertificate",
//         name: "Experience Certificate",
//         icon: "ni ni-ungroup text-red",
//         component: <ExperienceCertificate />,
//         layout: "/admin",
//       },
//       {
//         path: "/achievement",
//         name: "Achievement",
//         icon: "ni ni-ungroup text-red",
//         component: <Achievement />,
//         layout: "/admin",
//       },
//       {
//         path: "/anuallIncrement",
//         name: "Anuall Increment",
//         icon: "ni ni-ungroup text-red",
//         component: <AnuallIncrement />,
//         layout: "/admin",
//       },
//       {
//         path: "/internFulltime",
//         name: "Intern Fulltime",
//         icon: "ni ni-ungroup text-red",
//         component: <InternFulltime />,
//         layout: "/admin",
//       },
//     ],
//   },

//   // {
//   //   name: "Course",
//   //   icon: "ni ni-folder-17 text-orange",
//   //   layout: "/admin",
//   //   children: [
//   //     {
//   //       path: "/courseStructure",
//   //       name: "CourseStructure",
//   //       icon: "ni ni-ungroup text-red",
//   //       component: <CourseStructure />,
//   //       layout: "/admin",
//   //     },
//   //   ],
//   // },
//   {
//     id: "transaction-certifcate",
//     name: "Certifcate",
//     icon: "ni ni-folder-17 text-orange",
//     layout: "/admin",
//     children: [
//       {
//         path: "/certificate",
//         name: "Certificate",
//         icon: "ni ni-ungroup text-red",
//         component: <Certificate />,
//         layout: "/admin",
//       },
//     ],
//   },
//   {
//     id: "transaction-inventory",
//     name: "Inventory",
//     icon: "ni ni-folder-17 text-orange",
//     layout: "/admin",
//     children: [
//       {
//         path: "/sale",
//         name: "Sale",
//         icon: "ni ni-ungroup text-red",
//         component: <Sale />,
//         layout: "/admin",
//       },
//       {
//         path: "/purchase",
//         name: "Purchase",
//         icon: "ni ni-ungroup text-red",
//         component: <Purchase />,
//         layout: "/admin",
//       },
//       {
//         path: "/billing",
//         name: "Billing",
//         icon: "ni ni-ungroup text-red",
//         component: <Billing />,
//         layout: "/admin",
//       },
//     ],
//   },
//   {
//     id: "transaction-course",
//     name: "Course",
//     icon: "ni ni-folder-17 text-orange",
//     layout: "/admin",
//     children: [
//       {
//         path: "/batchStudent",
//         name: "Batch Student",
//         icon: "ni ni-single-copy-04 text-red",
//         component: <BatchStudent />,
//         layout: "/admin",
//       },
//     ],
//   },
//   {
//     name: "Report", // 👈 just a label, no path
//     isLabel: true,
//   },
//   {
//     id: "report-fees",
//     name: "Fees",
//     icon: "ni ni-folder-17 text-orange",
//     layout: "/admin",
//     children: [
//       {
//         path: "/dailyCollection",
//         name: "Daily Collection",
//         icon: "ni ni-single-copy-04 text-red",
//         component: <DailyCollection />,
//         layout: "/admin",
//       },
//       {
//         path: "/dueBalance",
//         name: "Due Balance",
//         icon: "ni ni-single-copy-04 text-red",
//         component: <DueBalance />,
//         layout: "/admin",
//       },
//       {
//         path: "/receiptList",
//         name: "Receipt List",
//         icon: "ni ni-single-copy-04 text-red",
//         component: <ReceiptList />,
//         layout: "/admin",
//       },
//     ],
//   },
//   {
//     id: "report-course",
//     name: "Course",
//     icon: "ni ni-folder-17 text-orange",
//     layout: "/admin",
//     children: [
//       {
//         path: "/facultyCourses",
//         name: "Faculty Courses",
//         icon: "ni ni-single-copy-04 text-red",
//         component: <FacultyCourses />,
//         layout: "/admin",
//       },
//     ],
//   },

//   // {
//   //   path: "/courseStructure",
//   //   name: "CourseStructure",
//   //   icon: "ni ni-ungroup text-red",
//   //   component: <CourseStructure />,
//   //   layout: "/admin",
//   // },

//   // {
//   //   name: "Project Monitoring",
//   //   isLabel: true,
//   // },
//   // {
//   //   name: "Employee",
//   //   isLabel: true,
//   // },

//   // {
//   //   name: "Inventory", // 👈 just a label, no path
//   //   isLabel: true,
//   // },
//   // {
//   //   path: "/billing",
//   //   name: "Billing",
//   //   icon: "ni ni-ungroup text-red",
//   //   component: <Billing />,
//   //   layout: "/admin",
//   // },
//   {
//     name: "Main Menu", // 👈 just a label, no path
//     isLabel: true,
//   },

//   {
//     path: "/eFilling",
//     name: "E Filling",
//     icon: "ni ni-ungroup text-red",
//     component: <EFilling />,
//     layout: "/admin",
//   },
//   {
//     path: "/support",
//     name: "Support",
//     icon: "ni ni-ungroup text-red",
//     component: <Support />,
//     layout: "/admin",
//   },
// ];
// export default routes;

// --------------------------------------

import Index from "views/Index.js";
// import Profile from "views/examples/Profile.js";
// import Maps from "views/examples/Maps.js";
import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
// import Tables from "views/examples/Tables.js";
import Enquiry from "views/examples/Enquiry";
import List from "views/examples/List";
// import Icons from "views/examples/Icons.js";
// import Test from "views/examples/Test";
import ContentMaster from "views/master/ContentMaster";

import CourseMaster from "views/master/course/CourseMaster";
import ContentType from "views/master/ContentType";
import EnquiryType from "views/master/EnquiryType";
import FeesMaster from "views/master/FeesMaster";
import UserCreation from "views/master/UserCreation";
import Attendance from "views/transaction/hr/Attendance";
import Certificate from "views/transaction/Certificate";
import CourseStructure from "views/master/course/CourseStructure";
import HRPayment from "views/transaction/HRPayment";
import Payable from "views/transaction/Payable";
import Appointmentletter from "views/employee/Appointmentletter";
import ExperienceCertificate from "views/employee/ExperienceCertificate";
import Achievement from "views/employee/Achievement";
import Relieving from "views/employee/Relieving";
import AnuallIncrement from "views/employee/AnuallIncrement";
import InternFulltime from "views/employee/InternFulltime";
import Item from "views/inventory/Item";
import Group from "views/inventory/Group";
import Purchase from "views/inventory/Purchase";
import Sale from "views/inventory/Sale";
import Billing from "views/inventory/Billing";
import EFilling from "views/main_menu/EFilling";
import Support from "views/main_menu/Support";
import Village from "views/master/Village";
import GramPanchayat from "views/master/GramPanchayat";
import Block from "views/master/Block";
import District from "views/master/District";
import State from "views/master/State";
import EnquiryDashboard from "views/dashboard/EnquiryDashboard";
import FeesDashboard from "views/dashboard/FeesDashboard";
import Test from "views/master/Test";
import DailyCollection from "views/transaction/report/fees/DailyCollection";
import DueBalance from "views/transaction/report/fees/DueBalance";
import FacultyCourses from "views/reports/course/FacultyCourses";
import BatchStudent from "views/transaction/course/BatchStudent";
import ReceiptList from "views/reports/fees/ReceiptList";
import BatchUserCreation from "views/examples/BatchUserCreation";
import UserList from "views/master/user/UserList";
import LeaveRequest from "views/transaction/hr/LeaveRequest";
import LeaveDashboard from "views/transaction/hr/LeaveDashboard";

var routes = [
  {
    name: "Enquiry Dashboard", // 👈 just a label, no path
    isLabel: true,
  },

  {
    id: 1,
    path: "/enquiryDashboard",
    name: "Enquiry Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: <EnquiryDashboard />,
    layout: "/admin",
  },
  {
    id: 2,
    path: "/feesDashboard",
    name: "Fees Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: <FeesDashboard />,
    layout: "/admin",
  },

  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: <Login />,
    layout: "/auth",
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: <Register />,
    layout: "/auth",
  },

  {
    id: 3,
    name: "Master", // 👈 just a label, no path
    isLabel: true,
  },
  {
    id: 4,
    name: "User",
    icon: "ni ni-folder-17 text-orange",
    layout: "/admin",
    children: [
      {
        id: 5,
        path: "/userCreation",
        name: "User Creation",
        icon: "ni ni-single-copy-04 text-red",
        component: <UserCreation />,
        layout: "/admin",
      },
      {
        // id: 5,
        path: "/batchUserCreation",
        name: "Batch User Creation",
        icon: "ni ni-single-copy-04 text-red",
        component: <BatchUserCreation />,
        layout: "/admin",
        showInSidebar: false, // ❌ hide from sidebar
      },
      {
        // id: 5,
        path: "/userList",
        name: "User List",
        icon: "ni ni-single-copy-04 text-red",
        component: <UserList />,
        layout: "/admin",
        // showInSidebar: false, // ❌ hide from sidebar
      },
    ],
  },
  {
    id: 6,
    name: "Course",
    icon: "ni ni-folder-17 text-orange",
    layout: "/admin",
    children: [
      {
        id: 7,
        path: "/courseStructure",
        name: "CourseStructure",
        icon: "ni ni-single-copy-04 text-red",
        component: <CourseStructure />,
        layout: "/admin",
      },
      {
        id: 8,
        path: "/courseMaster",
        name: "CourseMaster",
        icon: "ni ni-ungroup text-red",
        component: <CourseMaster />,
        layout: "/admin",
      },
    ],
  },
  {
    id: 9,
    name: "Inventory",
    icon: "ni ni-folder-17 text-orange",
    layout: "/admin",
    children: [
      {
        id: 10,

        path: "/item",
        name: "Item",
        icon: "ni ni-single-copy-04 text-red",
        component: <Item />,
        layout: "/admin",
      },
      {
        id: 11,
        path: "/group",
        name: "Group",
        icon: "ni ni-single-copy-04 text-red",
        component: <Group />,
        layout: "/admin",
      },
    ],
  },
  {
    id: 12,
    name: "Content",
    icon: "ni ni-folder-17 text-orange",
    layout: "/admin",
    children: [
      {
        id: 13,

        path: "/contentMaster",
        name: "Content Master",
        icon: "ni ni-single-copy-04 text-red",
        component: <ContentMaster />,
        layout: "/admin",
      },
      {
        id: 14,
        path: "/contentType",
        name: "Content Type",
        icon: "ni ni-single-copy-04 text-red",
        component: <ContentType />,
        layout: "/admin",
      },
    ],
  },
  {
    id: 15,
    name: "Enquiry",
    icon: "ni ni-folder-17 text-orange",
    layout: "/admin",
    children: [
      {
        id: 16,

        path: "/enquiryType",
        name: "Enquiry Type",
        icon: "ni ni-single-copy-04 text-red",
        component: <EnquiryType />,
        layout: "/admin",
      },
      {
        id: 17,
        path: "/group",
        name: "Group",
        icon: "ni ni-single-copy-04 text-red",
        component: <Group />,
        layout: "/admin",
      },
    ],
  },
  {
    id: 18,
    name: "Test",
    icon: "ni ni-folder-17 text-orange",
    layout: "/admin",
    children: [
      {
        id: 19,
        path: "/test",
        name: "Test",
        icon: "ni ni-single-copy-04 text-red",
        component: <Test />,
        layout: "/admin",
      },
    ],
  },
  {
    id: 20,
    name: "Fees",
    icon: "ni ni-folder-17 text-orange",
    layout: "/admin",
    children: [
      {
        id: 21,
        path: "/feesMaster",
        name: "Fees Master",
        icon: "ni ni-single-copy-04 text-red",
        component: <FeesMaster />,
        layout: "/admin",
      },
    ],
  },
  {
    id: 22,
    name: "Branch",
    icon: "ni ni-folder-17 text-orange",
    layout: "/admin",
    children: [
      {
        id: 23,
        path: "/state",
        name: "State",
        icon: "ni ni-single-copy-04 text-red",
        component: <State />,
        layout: "/admin",
      },
      {
        id: 24,
        path: "/district",
        name: "District",
        icon: "ni ni-single-copy-04 text-red",
        component: <District />,
        layout: "/admin",
      },
      {
        id: 25,
        path: "/block",
        name: "Block",
        icon: "ni ni-single-copy-04 text-red",
        component: <Block />,
        layout: "/admin",
      },
      {
        id: 26,
        path: "/gramPanchayat",
        name: "Gram Panchayat",
        icon: "ni ni-single-copy-04 text-red",
        component: <GramPanchayat />,
        layout: "/admin",
      },
      {
        id: 27,
        path: "/village",
        name: "Village",
        icon: "ni ni-single-copy-04 text-red",
        component: <Village />,
        layout: "/admin",
      },
    ],
  },

  {
    id: 28,
    name: "Transaction", // 👈 just a label, no path
    isLabel: true,
  },
  {
    id: 29,
    name: "HR",
    icon: "ni ni-folder-17 text-orange",
    layout: "/admin",
    children: [
      {
        id: 30,
        path: "/attendance",
        name: "Attendance",
        icon: "ni ni-ungroup text-red",
        component: <Attendance />,
        layout: "/admin",
      },
      {
        // id: 30,
        path: "/leaveRequest",
        name: "Leave Request",
        icon: "ni ni-ungroup text-red",
        component: <LeaveRequest />,
        layout: "/admin",
      },
      {
        // id: 30,
        path: "/leaveDashboard",
        name: "Leave Dashboard",
        icon: "ni ni-ungroup text-red",
        component: <LeaveDashboard />,
        layout: "/admin",
      },
      {
        id: 31,
        path: "/hrPayment",
        name: "HR_Payment",
        icon: "ni ni-ungroup text-red",
        component: <HRPayment />,
        layout: "/admin",
      },
      {
        id: 32,
        path: "/payable",
        name: "Payable",
        icon: "ni ni-ungroup text-red",
        component: <Payable />,
        layout: "/admin",
      },

      {
        id: 33,
        path: "/appointmentLetter",
        name: "Appointment letter",
        icon: "ni ni-ungroup text-red",
        component: <Appointmentletter />,
        layout: "/admin",
      },
      {
        id: 34,
        path: "/relieving",
        name: "Relieving Letter",
        icon: "ni ni-ungroup text-red",
        component: <Relieving />,
        layout: "/admin",
      },
      {
        id: 35,
        path: "/experienceCertificate",
        name: "Experience Certificate",
        icon: "ni ni-ungroup text-red",
        component: <ExperienceCertificate />,
        layout: "/admin",
      },
      {
        id: 36,
        path: "/achievement",
        name: "Achievement",
        icon: "ni ni-ungroup text-red",
        component: <Achievement />,
        layout: "/admin",
      },
      {
        id: 37,
        path: "/anuallIncrement",
        name: "Anuall Increment",
        icon: "ni ni-ungroup text-red",
        component: <AnuallIncrement />,
        layout: "/admin",
      },
      {
        id: 38,
        path: "/internFulltime",
        name: "Intern Fulltime",
        icon: "ni ni-ungroup text-red",
        component: <InternFulltime />,
        layout: "/admin",
      },
    ],
  },

  {
    id: 39,
    name: "Certifcate",
    icon: "ni ni-folder-17 text-orange",
    layout: "/admin",
    children: [
      {
        id: 40,
        path: "/certificate",
        name: "Certificate",
        icon: "ni ni-ungroup text-red",
        component: <Certificate />,
        layout: "/admin",
      },
    ],
  },
  {
    id: 41,
    name: "Inventory",
    icon: "ni ni-folder-17 text-orange",
    layout: "/admin",
    children: [
      {
        id: 42,
        path: "/sale",
        name: "Sale",
        icon: "ni ni-ungroup text-red",
        component: <Sale />,
        layout: "/admin",
      },
      {
        id: 43,
        path: "/purchase",
        name: "Purchase",
        icon: "ni ni-ungroup text-red",
        component: <Purchase />,
        layout: "/admin",
      },
      {
        id: 44,
        path: "/billing",
        name: "Billing",
        icon: "ni ni-ungroup text-red",
        component: <Billing />,
        layout: "/admin",
      },
    ],
  },
  {
    id: 45,
    name: "Course",
    icon: "ni ni-folder-17 text-orange",
    layout: "/admin",
    children: [
      {
        id: 46,
        path: "/batchStudent",
        name: "Batch Student",
        icon: "ni ni-single-copy-04 text-red",
        component: <BatchStudent />,
        layout: "/admin",
      },
    ],
  },
  {
    id: 47,
    name: "Report", // 👈 just a label, no path
    isLabel: true,
  },
  {
    id: 48,
    name: "Fees",
    icon: "ni ni-folder-17 text-orange",
    layout: "/admin",
    children: [
      {
        id: 49,
        path: "/dailyCollection",
        name: "Daily Collection",
        icon: "ni ni-single-copy-04 text-red",
        component: <DailyCollection />,
        layout: "/admin",
      },
      {
        id: 50,
        path: "/dueBalance",
        name: "Due Balance",
        icon: "ni ni-single-copy-04 text-red",
        component: <DueBalance />,
        layout: "/admin",
      },
      {
        id: 51,
        path: "/receiptList",
        name: "Receipt List",
        icon: "ni ni-single-copy-04 text-red",
        component: <ReceiptList />,
        layout: "/admin",
      },
    ],
  },
  {
    id: 52,
    name: "Course",
    icon: "ni ni-folder-17 text-orange",
    layout: "/admin",
    children: [
      {
        id: 53,
        path: "/facultyCourses",
        name: "Faculty Courses",
        icon: "ni ni-single-copy-04 text-red",
        component: <FacultyCourses />,
        layout: "/admin",
      },
    ],
  },

  {
    name: "Main Menu", // 👈 just a label, no path
    isLabel: true,
  },

  {
    path: "/eFilling",
    name: "E Filling",
    icon: "ni ni-ungroup text-red",
    component: <EFilling />,
    layout: "/admin",
  },
  {
    path: "/support",
    name: "Support",
    icon: "ni ni-ungroup text-red",
    component: <Support />,
    layout: "/admin",
  },
];
export default routes;
