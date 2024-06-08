import React, { useState, useEffect } from "react";
import { getUsers } from "../../api";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  const loadUsers = (pageNumber) => {
    getUsers(pageNumber)
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    loadUsers(page);
  }, [page]);

  return <div></div>;
};

export default UserList;
