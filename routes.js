const fs = require("fs"); //file System

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;
  res.setHeader("Content-Type", "text/html");
  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>Node Js course</title></head>");
    res.write(
      '<body><form action="/message" method="POST"><input type="text" name="message" /><button type="submit">Send</button></form></body>'
    );
    res.write("</html>");
    return res.end();
  }
  if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", chunk => {
      console.log(chunk);
      body.push(chunk);
    });
    req.on("end", () => {
      const parseBody = Buffer.concat(body).toString();
      console.log(parseBody);
      const message = parseBody.split("=")[1];
      //Change writeFileAsync to writeFile instead because we don't want to hold excecution in system, and then we using callback
      //This is Event driven code excecution architecture
      return fs.writeFile("message.txt", message, error => {
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  }
  res.write("<html>");
  res.write("<head><title>Node Js course</title></head>");
  res.write("<body><h1></h1></body>");
  res.write("</html>");
  res.end();
};

//exports.handlers = requestHandler;
module.exports = requestHandler;
