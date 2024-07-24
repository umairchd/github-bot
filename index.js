const jsonfile = require("jsonfile");
const moment = require("moment");
const simpleGit = require("simple-git");
const random = require("random");
const FILE_PATH = "./data.json";

const makeCommit = (n) => {
  if (n === 0) return simpleGit().push();

  const startYear = 2022;
  const endYear = 2023;
  const totalDaysInRange = (endYear - startYear + 1) * 365;

  // Randomize a number of days within the range of startYear to endYear
  const daysToAdd = random.int(0, totalDaysInRange - 1);

  const DATE = moment()
    .year(startYear)
    .startOf("year")
    .add(daysToAdd, "days")
    .format();

  const data = {
    date: DATE,
  };

  jsonfile.writeFile(FILE_PATH, data, () => {
    simpleGit()
      .add([FILE_PATH])
      .commit(DATE, { "--date": DATE }, makeCommit.bind(this, --n));
  });
};

makeCommit(500);
