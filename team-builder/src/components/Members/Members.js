import React, { useState, useEffect } from "react";

const Members = () => {
  const [members, setMembers] = useState([]);
  const buttonStyles = {
    margin: "0 5px"
  };
  useEffect(() => {
    const getAllMembers = () => {
      if (localStorage.getItem("members")) {
        setMembers(JSON.parse(localStorage.getItem("members")));
      }
    };

    getAllMembers();
  }, []);

  console.log(members);

  return (
    <div className="notification">
      <table className="table is-fullwidth is-hoverable">
        <thead>
          <tr>
            <th>No.</th>
            <th>Name</th>
            <th>Last Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Department</th>
            <th>Role</th>
            <th>Work Loc.</th>
            <th className="has-text-centered">Actions</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member, index) => (
            <tr key={index}>
              <th>{index}</th>
              <td>{member.firstName}</td>
              <td>{member.lastName}</td>
              <td>{member.phone}</td>
              <td>{member.email}</td>
              <td>{member.departmentID}</td>
              <td>{member.roleID}</td>
              <td>{member.workLocation}</td>
              <td className="has-text-centered">
                <button className="button is-info" style={buttonStyles}>
                  Edit
                </button>
                <button className="button is-danger" style={buttonStyles}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot></tfoot>
      </table>
    </div>
  );
};

export default Members;
