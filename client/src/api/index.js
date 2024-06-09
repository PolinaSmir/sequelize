export const getUsers = async (pageNumber) => {
  const limit = 5;

  const offset = pageNumber > 1 ? limit * (pageNumber - 1) : 0;

  const url = `http://localhost:5000/api/users?limit=${limit}&offset=${offset}`;

  const response = await fetch(url);
  const data = await response.json();

  return data;
};

export const createUser = async (userData) => {
  const url = "http://localhost:5000/api/users";

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  };

  const response = await fetch(url, requestOptions);
  const data = await response.json();

  return data;
};

export const getGroups = async () => {
  const url = "http://localhost:5000/api/groups";

  const response = await fetch(url);
  const data = await response.json();

  return data;
};

export const createGroup = async (groupData) => {
  const url = "http://localhost:5000/api/groups";

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(groupData),
  };

  const response = await fetch(url, requestOptions);
  const data = await response.json();

  return data;
};

export const createGroupImage = async (image, groupId) => {
  const url = `http://localhost:5000/api/groups/${groupId}`;

  const requestOptions = {
    method: "POST",
    body: image,
  };

  const response = await fetch(url, requestOptions);
  const data = await response.json();

  return data;
};
