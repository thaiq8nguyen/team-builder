import React, { useState } from "react";
import { departments, roles } from "../../company_data";

const AddMember = () => {
  const [member, setMember] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    departmentID: "1",
    roleID: "0",
    workLocation: ""
  });

  const [departmentRoles, setDepartmentRoles] = useState([]);

  const radioInputStyles = {
    marginRight: "5px"
  };

  const handleInput = event => {
    //event.persist();

    setMember({
      ...member,
      [event.target.name]: event.target.value
    });
  };

  const handleDepartmentInput = event => {
    handleInput(event);

    const departmentID = event.target.value;

    const departmentRoles = roles.filter(role => {
      return role.department_id === departmentID;
    });

    setDepartmentRoles(departmentRoles);
  };

  const handleSubmit = event => {
    event.preventDefault();

    const members = JSON.parse(localStorage.getItem("members") || "[]");

    members.push(member);

    localStorage.setItem("members", JSON.stringify(members));
  };

  console.log(member);
  return (
    <div className="notification">
      <form action="#" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="firstName" className="label">
            First Name
          </label>
          <div className="control">
            <input
              type="text"
              className="input"
              name="firstName"
              value={member.firstName}
              onChange={handleInput}
            />
          </div>
        </div>
        <div className="field">
          <label htmlFor="lastName" className="label">
            Last Name
          </label>
          <div className="control">
            <input
              type="text"
              className="input"
              name="lastName"
              value={member.lastName}
              onChange={handleInput}
            />
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <div className="field">
              <label htmlFor="phone" className="label">
                Phone
              </label>
              <div className="control">
                <input
                  type="text"
                  className="input"
                  name="phone"
                  value={member.phone}
                  onChange={handleInput}
                />
              </div>
            </div>
          </div>
          <div className="column">
            <div className="field">
              <label htmlFor="email" className="label">
                Email
              </label>
              <div className="control">
                <input
                  type="text"
                  className="input"
                  name="email"
                  value={member.email}
                  onChange={handleInput}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="columns">
          <div className="column is-3">
            <div className="field">
              <label htmlFor="departmentID" className="label">
                Departments
              </label>
              <div className="control">
                <div className="select">
                  <select
                    value={member.departmentID}
                    onChange={handleDepartmentInput}
                    name="departmentID"
                  >
                    <option>--Select--</option>
                    {departments.map(department => (
                      <option
                        value={department.department_id}
                        key={department.department_id}
                      >
                        {department.department_name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="column is-3">
            <div className="field">
              <label htmlFor="roleID" className="label">
                Roles
              </label>
              <div className="control">
                <div className="select">
                  <select
                    value={member.roleID}
                    onChange={handleInput}
                    name="roleID"
                  >
                    {!member.departmentID && (
                      <option>--Select a department first--</option>
                    )}
                    {departmentRoles.map(departmentRole => (
                      <option
                        value={departmentRole.role_id}
                        key={departmentRole.role_id}
                      >
                        {departmentRole.role_name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="column is-4">
            <p>Work Location</p>
            <div className="field">
              <div className="control">
                <label className="radio">
                  <input
                    type="radio"
                    name="workLocation"
                    style={radioInputStyles}
                    onChange={handleInput}
                    value="Remote"
                  />
                  Remote
                </label>
                <label className="radio">
                  <input
                    type="radio"
                    name="workLocation"
                    style={radioInputStyles}
                    onChange={handleInput}
                    value="On-Site"
                  />
                  On-Site
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="field is-grouped">
          <div className="control">
            <button className="button is-link" type="submit">
              Submit
            </button>
          </div>
          <div className="control">
            <button className="button is-text">Cancel</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddMember;
