import React from "react";
import AddMember from "../../components/AddMember/AddMember";
import Members from "../../components/Members/Members";

const Home = () => {
  return (
    <div>
      <section className="section">
        <div className="container">
          <div className="card">
            <header className="card-header">
              <p className="card-header-title">Add Member</p>
            </header>
            <div className="card-content">
              <AddMember />
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <Members />
        </div>
      </section>
    </div>
  );
};

export default Home;
