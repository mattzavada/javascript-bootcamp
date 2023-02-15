const printTeam = (teamName, coach, ...teamMembers) => {
  const members = teamMembers.join(", ");

  return `Team: ${teamName}
  Coach: ${coach}
  Members: ${members}`;
};

console.log(
  printTeam("Liberty", "Casey Penn", "Marge", "Aiden", "Herbert", "Sherry")
);

const person = {
  name: "Matt",
  age: 42,
};

const location = {
  city: "Alpharetta",
  country: "US",
};

const overview = {
  ...person,
  ...location,
};

console.log(overview);
