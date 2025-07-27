const { writeFile, readFile } = require("fs").promises;

writeFile("./content/temp.txt", "Hello this is first text file", { flag: "a" })
  .then(() => {
    return writeFile("./content/temp.txt", "Hello this is second text file", { flag: "a" });
    })
  .then(() => {
    return readFile("./content/temp.txt", "utf8");
})
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.log("An error occured: ", error);
  });




