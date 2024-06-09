import React, { useState, useEffect } from "react";
import { getGroups } from "../../api/index";
import GroupCard from "./GroupCard";
import "./style.css";
import GroupCardModal from "./GroupCardModal";

const GroupList = () => {
  const [groups, setGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // info about group
  const [isModalAddOpen, setIsModalAddOpen] = useState(false); // add group

  const loadGroups = () => {
    getGroups()
      .then((data) => {
        setGroups(data);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    loadGroups();
  }, []);

  const renderGroups = () => {
    return groups.map((group) => (
      <GroupCard
        group={group}
        key={group.id}
        onClick={() => {
          setSelectedGroup(group);
          setIsModalOpen(true);
        }}
      />
    ));
  };

  return (
    <>
      <h1>Group List</h1>

      {isLoading && <h2 className="loading">Loading....</h2>}
      <section className="card-container">{groups.length > 0 ? renderGroups() : <h2 className="error">Groups not found</h2>}</section>

      <GroupCardModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} selectedGroup={selectedGroup} />
    </>
  );
};

export default GroupList;
