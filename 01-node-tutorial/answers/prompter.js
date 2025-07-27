const http = require("http");
var StringDecoder = require("string_decoder").StringDecoder;

const getBody = (req, callback) => {
  const decode = new StringDecoder("utf-8");
  let body = "";
  req.on("data", function (data) {
    body += decode.write(data);
  });
  req.on("end", function () {
    body += decode.end();
    const body1 = decodeURI(body);
    const bodyArray = body1.split("&");
    const resultHash = {};
    bodyArray.forEach((part) => {
      const partArray = part.split("=");
      resultHash[partArray[0]] = partArray[1];
    });
    callback(resultHash);
  });
};

// here, you could declare one or more variables to store what comes back from the form.

let item = "Enter your number below (1-100).";

// here, you can change the form below to modify the input fields and what is displayed.
// This is just ordinary html with string interpolation.
const form = () => {
  return `
  <body background="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80">

  <h1 style="color:white">Guess your number (1-100)</h1>

  <p style="color:white">${item}</p>


  <form method="POST">

  <label style="color:white" for="item" >Number:</label>
  <input name="item"></input><br> 
  
  <button type="submit">Submit</button>
  
 
  </form>

  </body>
  `;
};

const server = http.createServer((req, res) => {
  console.log("req.method is ", req.method);
  console.log("req.url is ", req.url);
  if (req.method === "POST") {
    getBody(req, (body) => {
      console.log("The body of the post is ", body);
      // here, you can add your own logic
      const minNumber = 1;
      const maxNumber = 100;  
      const randomNumber = Math.floor(
        Math.random() * (maxNumber - minNumber + 1) + minNumber
      );
      console.log("The random number is ", randomNumber);
      if (body["item"]) {
        item = body["item"];
        itemNum = Number(item);
        if (isNaN(itemNum)) {
          console.log ("Please enter a valid number.");
        }else{
          if (itemNum < randomNumber){
            console.log("The number is too low.");     
          } else if (itemNum > randomNumber){
            console.log("The number is too high.");
          }else{
            console.log("Congratulations! You guessed the number.");       
          }
        }
      }
       
      // Your code changes would end here
      res.writeHead(303, {
        Location: "/",
      });
      res.end();
    });
  } else {
    res.end(form());
  }
});

server.listen(3000);
console.log("The server is listening on port 3000.");
