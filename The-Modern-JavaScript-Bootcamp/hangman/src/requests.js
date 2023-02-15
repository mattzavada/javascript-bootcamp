// Obtain new word for puzzle, async with callback

const getPuzzle = async (wordCount) => {
  const response = await fetch(
    `http://puzzle.mead.io/puzzle?wordCount=${wordCount}`,
    {
      status: 200,
      method: "GET",
      dataType: "json",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      }
    })
    .then((data) => {
      return data.puzzle;
    })
    .catch((err) => console.log(err));
  return response;
};

const getCurrentCountry = async () => {
  let currentLocation;
  const token = "208|Gy8hgBTBmqOntkSv4yMPPp2AjzzAWcBG7sgf2B7z";

  const responseCurrentLocation = await fetch(
    "https://ipinfo.io/json?token=06e8bff04a4e96",
    {}
  );
  if (responseCurrentLocation.status === 200) {
    currentLocation = await responseCurrentLocation.json();
  } else {
    throw new Error("Unable to fetch data");
  }

  // Call fetch with token in the header; this returns a promise
  const responseCountries = await fetch("https://restcountries.com/v3.1/all", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  // Run this once the fetch has completed
  if (responseCountries.status === 200) {
    // Verify that fetch was successful
    const data = await responseCountries.json(); // json returns array of country objects
    return data.find((country) => country.cca2 === currentLocation.country); // find country that matches country code parameter; return single country object
  } else {
    throw new Error("Unable to fetch the data"); // Throw error for the catch function
  }
};
export { getPuzzle as default };
