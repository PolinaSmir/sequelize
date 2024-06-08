export const getUsers = async (pageNumber) => {
  const limit = 5;

  const offset = pageNumber > 1 ? limit * (pageNumber - 1) : 0;

  const url = `http://localhost:5000/api/users?limit=${limit}&offset=${offset}`;

  const response = await fetch(url);
  const data = await response.json();

  return data;
};
