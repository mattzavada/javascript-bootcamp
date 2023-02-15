let studentsScore = "matt";
let totalScore = 20;

function getGrade(ss, ts) {
  if (typeof ss !== "number" || typeof ts !== "number") {
    throw Error("Both values supplied to function must be a number");
  }
  let percent = (ss / ts) * 100;
  let grade;

  switch (true) {
    case percent >= 90:
      grade = "A";
      break;
    case percent >= 80:
      grade = "B";
      break;
    case percent >= 70:
      grade = "C";
      break;
    case percent >= 60:
      grade = "D";
      break;
    case percent < 60:
      grade = "F";
  }

  return `You got a ${grade} (${percent}%)`;
}

try {
  console.log(getGrade(studentsScore, totalScore));
} catch (e) {
  console.log(e);
}
