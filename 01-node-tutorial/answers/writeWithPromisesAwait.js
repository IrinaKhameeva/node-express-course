const { writeFile, readFile } = require("fs").promises;


const readWrite = async () => {
  try {
    const first = await readFile("./content/first.txt", "utf8");
    const second = await readFile("./content/second.txt", "utf8");
    
    await writeFile(
      "./content/temp.txt",
      `THIS IS AWESOME: ${first}, ${second}`,
        { flag: "a" }
    );
    console.log(first, second);
  } catch (error) {
    console.error(error);
  }
}  



readWrite()
