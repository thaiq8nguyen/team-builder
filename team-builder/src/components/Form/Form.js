import React, { useState, useEffect } from "react";
import { departments, roles } from "../../company_data";

const Form = ({ members, memberToEditID, refresh }) => {
  const [isEditing, setIsEditting] = useState(false);

  const [member, setMember] = useState({
    memberID: "",
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    departmentID: 1,
    roleID: 0,
    workLocation: "Remote"
  });

  const defaultMember = {
    memberID: "",
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    departmentID: 1,
    roleID: 0,
    workLocation: "On-Site"
  };

  const [departmentRoles, setDepartmentRoles] = useState([]);

  const radioInputStyles = {
    marginRight: "5px"
  };
  useEffect(() => {
    if (memberToEditID > 0) {
      setIsEditting(true);

      if (members.length > 0) {
        const memberToEdit = members.find(
          member => member.memberID === memberToEditID
        );

        setMember(memberToEdit);
      }
    }
  }, [members, member.memberID, memberToEditID]);

  useEffect(() => {
    const departmentRoles = roles.filter(role => {
      return role.department_id === member.departmentID;
    });

    setDepartmentRoles(departmentRoles);
  }, [member.departmentID]);

  const handleInput = event => {
    setMember({
      ...member,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = event => {
    event.preventDefault();

    const members = JSON.parse(localStorage.getItem("members") || "[]");
    let newMembersArray = [];

    if (!isEditing) {
      newMembersArray = addMember(members);
    } else {
      newMembersArray = editMember(members);
    }

    localStorage.setItem("members", JSON.stringify(newMembersArray));

    refresh();
    resetForm();
  };

  const addMember = members => {
    member.memberID = generateMemberID(members);

    members.push(member);

    return members;
  };

  const editMember = members => {
    const memberIndex = members.findIndex(
      member => member.memberID === memberToEditID
    );

    members[memberIndex] = member;
    setIsEditting(false);
    return members;
  };

  const generateMemberID = members => {
    let maxMemberID = 1;

    if (members.length > 0) {
      maxMemberID = members[0].memberID;
      members.forEach(member => {
        member.memberID > maxMemberID ? (maxMemberID = member.memberID) : null;
      });

      maxMemberID = maxMemberID + 1;
    }

    return maxMemberID;
  };

  const resetForm = () => {
    console.log("reset");
    setMember(defaultMember);
  };

  return (
    <div className="notification">
      {isEditing && <p className="has-text-info is-size-4">Editing</p>}
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
                    onChange={handleInput}
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
                    checked={member.workLocation === "Remote"}
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
                    checked={member.workLocation === "On-Site"}
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

export default Form;
