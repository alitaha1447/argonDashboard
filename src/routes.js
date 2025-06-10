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
import EnquiryType from "views/master/EnquiryType";
import FeesMaster from "views/master/FeesMaster";
import UserCreation from "views/master/UserCreation";
import Attendance from "views/transaction/Attendance";
import Certificate from "views/transaction/Certificate";
import CourseStructure from "views/transaction/CourseStructure";
import HR_Payment from "views/transaction/HR_Payment";
import Payable from "views/transaction/Payable";
import Appointment_letter from "views/employee/Appointment_letter";
import Experience_Certificate from "views/employee/Experience_Certificate";
import Achievement from "views/employee/Achievement";
import Relieving from "views/employee/Relieving";
import Anuall_Increment from "views/employee/Anuall_Increment";
import Intern_Fulltime from "views/employee/Intern_Fulltime";
import Item from "views/inventory/Item";
import Group from "views/inventory/Group";
import Purchase from "views/inventory/Purchase";
import Sale from "views/inventory/Sale";
import Billing from "views/inventory/Billing";
import E_Filling from "views/main_menu/E_Filling";
import Support from "views/main_menu/Support";



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
    path: "/contentMaster",
    name: "ContentMaster",
    icon: "ni ni-ungroup text-red",
    component: <ContentMaster />,
    layout: "/admin",
  },

  {
    path: "/courseMaster",
    name: "CourseMaster",
    icon: "ni ni-ungroup text-red",
    component: <CourseMaster />,
    layout: "/admin",
  },
  {
    path: "/enquiryType",
    name: "EnquiryType",
    icon: "ni ni-ungroup text-red",
    component: <EnquiryType />,
    layout: "/admin",
  },
  {
    path: "/feesMaster",
    name: "FeesMaster",
    icon: "ni ni-ungroup text-red",
    component: <FeesMaster />,
    layout: "/admin",
  },
  {
    path: "/userCreation",
    name: "UserCreation",
    icon: "ni ni-ungroup text-red",
    component: <UserCreation />,
    layout: "/admin",
  },
  {
    name: "Transaction", // 👈 just a label, no path
    isLabel: true,
  },
  {
    path: "/attendance",
    name: "Attendance",
    icon: "ni ni-ungroup text-red",
    component: <Attendance />,
    layout: "/admin",
  },
  {
    path: "/certificate",
    name: "Certificate",
    icon: "ni ni-ungroup text-red",
    component: <Certificate />,
    layout: "/admin",
  },
  {
    path: "/courseStructure",
    name: "CourseStructure",
    icon: "ni ni-ungroup text-red",
    component: <CourseStructure />,
    layout: "/admin",
  },
  {
    path: "/hrPayment",
    name: "HR_Payment",
    icon: "ni ni-ungroup text-red",
    component: <HR_Payment />,
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
    name: "Project Monitoring", // 👈 just a label, no path
    isLabel: true,
  },
  {
    name: "Employee", // 👈 just a label, no path
    isLabel: true,
  },
  {
    path: "/appointmentLetter",
    name: "Appointment letter",
    icon: "ni ni-ungroup text-red",
    component: <Appointment_letter />,
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
    component: <Experience_Certificate />,
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
    component: <Anuall_Increment />,
    layout: "/admin",
  },
  {
    path: "/internFulltime",
    name: "Intern Fulltime",
    icon: "ni ni-ungroup text-red",
    component: <Intern_Fulltime />,
    layout: "/admin",
  },
  {
    name: "Inventory", // 👈 just a label, no path
    isLabel: true,
  },

  {
    path: "/item",
    name: "Item",
    icon: "ni ni-ungroup text-red",
    component: <Item />,
    layout: "/admin",
  },
  {
    path: "/group",
    name: "Group",
    icon: "ni ni-ungroup text-red",
    component: <Group />,
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
    path: "/sale",
    name: "Sale",
    icon: "ni ni-ungroup text-red",
    component: <Sale />,
    layout: "/admin",
  },
  {
    path: "/billing",
    name: "Billing",
    icon: "ni ni-ungroup text-red",
    component: <Billing />,
    layout: "/admin",
  },
  {
    name: "Main Menu", // 👈 just a label, no path
    isLabel: true,
  },

  {
    path: "/eFilling",
    name: "E Filling",
    icon: "ni ni-ungroup text-red",
    component: <E_Filling />,
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
