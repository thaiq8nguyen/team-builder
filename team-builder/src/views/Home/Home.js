import React, { useState, useEffect } from "react";
import Form from "../../components/Form/Form";
import Members from "../../components/Members/Members";

const Home = () => {
  const [members, setMembers] = useState([]);
  const [memberToEditID, setMemberToEditID] = useState(0);
  const [refreshData, setRefreshData] = useState(false);
  useEffect(() => {
    const getAllMembers = () => {
      const storedMembers = JSON.parse(localStorage.getItem("members") || "[]");
      setMembers(storedMembers);
    };

    getAllMembers();
  }, [refreshData]);

  const handleRefreshData = () => {
    setRefreshData(!refreshData);
    if (memberToEditID > 0) {
      setMemberToEditID(0);
    }
  };
  return (
    <div>
      <section className="section">
        <div className="container">
          <div className="card">
            <header className="card-header">
              <p className="card-header-title">Add Member</p>
            </header>
            <div className="card-content">
              <Form
                members={members}
                memberToEditID={memberToEditID}
                refresh={handleRefreshData}
              />
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <Members
            members={members}
            editMember={memberID => setMemberToEditID(memberID)}
          />
        </div>
      </section>
    </div>
  );
};

export default Home;
