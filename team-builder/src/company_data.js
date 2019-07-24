const departments = [
  { department_id: "1", department_name: "Accounting" },
  { department_id: "2", department_name: "Finance" },
  { department_id: "3", department_name: "Technology" },
  { department_id: "4", department_name: "Quality Control" },
  { department_id: "5", department_name: "Shipping" }
];

const roles = [
  { role_id: "1", department_id: "3", role_name: "Frontend" },
  { role_id: "2", department_id: "3", role_name: "Backend" },
  { role_id: "3", department_id: "3", role_name: "User Interface" },
  { role_id: "4", department_id: "3", role_name: "Security" },
  { role_id: "5", department_id: "1", role_name: "Analyst" },
  { role_id: "6", department_id: "2", role_name: "Underwriter" },
  { role_id: "7", department_id: "4", role_name: "QC Manager" },
  { role_id: "8", department_id: "5", role_name: "Shipping Lead" }
];

export { departments, roles };
