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
import CourseMaster from "views/master/CourseMaster";
import ContentType from "views/master/ContentType";
import EnquiryType from "views/master/EnquiryType";
import FeesMaster from "views/master/FeesMaster";
import UserCreation from "views/master/UserCreation";
import Attendance from "views/transaction/Attendance";
import Certificate from "views/transaction/Certificate";
import CourseStructure from "views/transaction/CourseStructure";
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

var routes = [
  {
    name: "Enquiry Dashboard", // 👈 just a label, no path
    isLabel: true,
  },
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: <Index />,
    layout: "/admin",
  },

  {
    path: "/enquiryDashboard",
    name: "Enquiry Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: <EnquiryDashboard />,
    layout: "/admin",
  },
  {
    path: "/feesDashboard",
    name: "Fees Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: <FeesDashboard />,
    layout: "/admin",
  },
  {
    path: "/enquiry",
    name: "Enquiry Form",
    icon: "ni ni-ungroup text-red",
    component: <Enquiry />,
    layout: "/admin",
  },
  {
    path: "/list",
    name: "List",
    icon: "ni ni-bullet-list-67 text-red",
    component: <List />,
    layout: "/admin",
    // children: [
    //   {

    //     path: "/list",
    //     name: "List",
    //     icon: "ni ni-single-copy-04 text-red",
    //     component: <List />,
    //     layout: "/admin",
    //   }, {

    //     path: "/test",
    //     name: "Test",
    //     icon: "ni ni-single-copy-04 text-red",
    //     component: <Test />,
    //     layout: "/admin",
    //   }
    // ]
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

  // {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: "ni ni-planet text-blue",
  //   component: <Icons />,
  //   layout: "/admin",
  // },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   icon: "ni ni-pin-3 text-orange",
  //   component: <Maps />,
  //   layout: "/admin",
  // },
  // {
  //   path: "/user-profile",
  //   name: "User Profile",
  //   icon: "ni ni-single-02 text-yellow",
  //   component: <Profile />,
  //   layout: "/admin",
  // },
  // {
  //   path: "/tables",
  //   name: "Tables",
  //   icon: "ni ni-bullet-list-67 text-red",
  //   component: <Tables />,
  //   layout: "/admin",
  // },
  {
    name: "Master", // 👈 just a label, no path
    isLabel: true,
  },
  {
    name: "User",
    icon: "ni ni-folder-17 text-orange",
    layout: "/admin",
    children: [
      {
        path: "/userCreation",
        name: "User Creation",
        icon: "ni ni-single-copy-04 text-red",
        component: <UserCreation />,
        layout: "/admin",
      },
    ],
  },
  {
    name: "Course",
    icon: "ni ni-folder-17 text-orange",
    layout: "/admin",
    children: [
      {
        path: "/courseStructure",
        name: "CourseStructure",
        icon: "ni ni-single-copy-04 text-red",
        component: <CourseStructure />,
        layout: "/admin",
      },
      {
        path: "/courseMaster",
        name: "CourseMaster",
        icon: "ni ni-ungroup text-red",
        component: <CourseMaster />,
        layout: "/admin",
      },
    ],
  },
  {
    name: "Inventory",
    icon: "ni ni-folder-17 text-orange",
    layout: "/admin",
    children: [
      {
        path: "/item",
        name: "Item",
        icon: "ni ni-single-copy-04 text-red",
        component: <Item />,
        layout: "/admin",
      },
      {
        path: "/group",
        name: "Group",
        icon: "ni ni-single-copy-04 text-red",
        component: <Group />,
        layout: "/admin",
      },
    ],
  },
  {
    name: "Content",
    icon: "ni ni-folder-17 text-orange",
    layout: "/admin",
    children: [
      {
        path: "/contentMaster",
        name: "Content Master",
        icon: "ni ni-single-copy-04 text-red",
        component: <ContentMaster />,
        layout: "/admin",
      },
      {
        path: "/contentType",
        name: "Content Type",
        icon: "ni ni-single-copy-04 text-red",
        component: <ContentType />,
        layout: "/admin",
      },
    ],
  },
  {
    name: "Enquiry",
    icon: "ni ni-folder-17 text-orange",
    layout: "/admin",
    children: [
      {
        path: "/enquiryType",
        name: "Enquiry Type",
        icon: "ni ni-single-copy-04 text-red",
        component: <EnquiryType />,
        layout: "/admin",
      },
      {
        path: "/group",
        name: "Group",
        icon: "ni ni-single-copy-04 text-red",
        component: <Group />,
        layout: "/admin",
      },
    ],
  },
  {
    name: "Test",
    icon: "ni ni-folder-17 text-orange",
    layout: "/admin",
    children: [
      {
        path: "/test",
        name: "Test",
        icon: "ni ni-single-copy-04 text-red",
        component: <Test />,
        layout: "/admin",
      },
    ],
  },
  {
    name: "Fees",
    icon: "ni ni-folder-17 text-orange",
    layout: "/admin",
    children: [
      {
        path: "/feesMaster",
        name: "Fees Master",
        icon: "ni ni-single-copy-04 text-red",
        component: <FeesMaster />,
        layout: "/admin",
      },
    ],
  },
  {
    name: "Branch",
    icon: "ni ni-folder-17 text-orange",
    layout: "/admin",
    children: [
      {
        path: "/state",
        name: "State",
        icon: "ni ni-single-copy-04 text-red",
        component: <State />,
        layout: "/admin",
      },
      {
        path: "/district",
        name: "District",
        icon: "ni ni-single-copy-04 text-red",
        component: <District />,
        layout: "/admin",
      },
      {
        path: "/block",
        name: "Block",
        icon: "ni ni-single-copy-04 text-red",
        component: <Block />,
        layout: "/admin",
      },
      {
        path: "/gramPanchayat",
        name: "Gram Panchayat",
        icon: "ni ni-single-copy-04 text-red",
        component: <GramPanchayat />,
        layout: "/admin",
      },
      {
        path: "/village",
        name: "Village",
        icon: "ni ni-single-copy-04 text-red",
        component: <Village />,
        layout: "/admin",
      },
    ],
  },
  // {
  //   path: "/contentMaster",
  //   name: "ContentMaster",
  //   icon: "ni ni-ungroup text-red",
  //   component: <ContentMaster />,
  //   layout: "/admin",
  // },

  // {
  //   path: "/courseMaster",
  //   name: "CourseMaster",
  //   icon: "ni ni-ungroup text-red",
  //   component: <CourseMaster />,
  //   layout: "/admin",
  // },
  // {
  //   path: "/enquiryType",
  //   name: "EnquiryType",
  //   icon: "ni ni-ungroup text-red",
  //   component: <EnquiryType />,
  //   layout: "/admin",
  // },
  // {
  //   path: "/feesMaster",
  //   name: "FeesMaster",
  //   icon: "ni ni-ungroup text-red",
  //   component: <FeesMaster />,
  //   layout: "/admin",
  // },
  // {
  //   path: "/userCreation",
  //   name: "UserCreation",
  //   icon: "ni ni-ungroup text-red",
  //   component: <UserCreation />,
  //   layout: "/admin",
  // },
  // {
  //   name: "Forms",
  //   icon: "ni ni-folder-17 text-orange",
  //   layout: "/admin",
  //   children: [
  //     {
  //       path: "/enquiry",
  //       name: "Enquiry Form",
  //       icon: "ni ni-single-copy-04 text-red",
  //       component: <Enquiry />,
  //       layout: "/admin",
  //     },
  //     {
  //       path: "/list",
  //       name: "List",
  //       icon: "ni ni-bullet-list-67 text-blue",
  //       component: <List />,
  //       layout: "/admin",
  //     }
  //   ]
  // },

  {
    name: "Transaction", // 👈 just a label, no path
    isLabel: true,
  },
  {
    name: "HR",
    icon: "ni ni-folder-17 text-orange",
    layout: "/admin",
    children: [
      {
        path: "/attendance",
        name: "Attendance",
        icon: "ni ni-ungroup text-red",
        component: <Attendance />,
        layout: "/admin",
      },
      {
        path: "/hrPayment",
        name: "HR_Payment",
        icon: "ni ni-ungroup text-red",
        component: <HRPayment />,
        layout: "/admin",
      },
      {
        path: "/payable",
        name: "Payable",
        icon: "ni ni-ungroup text-red",
        component: <Payable />,
        layout: "/admin",
      },

      {
        path: "/appointmentLetter",
        name: "Appointment letter",
        icon: "ni ni-ungroup text-red",
        component: <Appointmentletter />,
        layout: "/admin",
      },
      {
        path: "/relieving",
        name: "Relieving Letter",
        icon: "ni ni-ungroup text-red",
        component: <Relieving />,
        layout: "/admin",
      },
      {
        path: "/experienceCertificate",
        name: "Experience Certificate",
        icon: "ni ni-ungroup text-red",
        component: <ExperienceCertificate />,
        layout: "/admin",
      },
      {
        path: "/achievement",
        name: "Achievement",
        icon: "ni ni-ungroup text-red",
        component: <Achievement />,
        layout: "/admin",
      },
      {
        path: "/anuallIncrement",
        name: "Anuall Increment",
        icon: "ni ni-ungroup text-red",
        component: <AnuallIncrement />,
        layout: "/admin",
      },
      {
        path: "/internFulltime",
        name: "Intern Fulltime",
        icon: "ni ni-ungroup text-red",
        component: <InternFulltime />,
        layout: "/admin",
      },
    ],
  },
  // {
  //   name: "Course",
  //   icon: "ni ni-folder-17 text-orange",
  //   layout: "/admin",
  //   children: [
  //     {
  //       path: "/courseStructure",
  //       name: "CourseStructure",
  //       icon: "ni ni-ungroup text-red",
  //       component: <CourseStructure />,
  //       layout: "/admin",
  //     },
  //   ],
  // },
  {
    name: "Certifcate",
    icon: "ni ni-folder-17 text-orange",
    layout: "/admin",
    children: [
      {
        path: "/certificate",
        name: "Certificate",
        icon: "ni ni-ungroup text-red",
        component: <Certificate />,
        layout: "/admin",
      },
    ],
  },
  {
    name: "Inventory",
    icon: "ni ni-folder-17 text-orange",
    layout: "/admin",
    children: [
      {
        path: "/sale",
        name: "Sale",
        icon: "ni ni-ungroup text-red",
        component: <Sale />,
        layout: "/admin",
      },
      {
        path: "/purchase",
        name: "Purchase",
        icon: "ni ni-ungroup text-red",
        component: <Purchase />,
        layout: "/admin",
      },
      {
        path: "/billing",
        name: "Billing",
        icon: "ni ni-ungroup text-red",
        component: <Billing />,
        layout: "/admin",
      },
    ],
  },
  {
    name: "Report",
    icon: "ni ni-folder-17 text-orange",
    layout: "/admin",
    children: [
      {
        name: "Fees",
        icon: "ni ni-folder-17 text-orange",
        layout: "/admin",
        children: [
          {
            path: "/dailyCollection",
            name: "Daily Collection",
            icon: "ni ni-single-copy-04 text-red",
            component: <DailyCollection />,
            layout: "/admin",
          },
          {
            path: "/dueBalance",
            name: "Due Balance",
            icon: "ni ni-single-copy-04 text-red",
            component: <DueBalance />,
            layout: "/admin",
          },
        ],
      },
    ],
  },

  // {
  //   path: "/courseStructure",
  //   name: "CourseStructure",
  //   icon: "ni ni-ungroup text-red",
  //   component: <CourseStructure />,
  //   layout: "/admin",
  // },

  // {
  //   name: "Project Monitoring",
  //   isLabel: true,
  // },
  // {
  //   name: "Employee",
  //   isLabel: true,
  // },

  // {
  //   name: "Inventory", // 👈 just a label, no path
  //   isLabel: true,
  // },
  // {
  //   path: "/billing",
  //   name: "Billing",
  //   icon: "ni ni-ungroup text-red",
  //   component: <Billing />,
  //   layout: "/admin",
  // },
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
