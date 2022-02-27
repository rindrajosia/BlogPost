const http = require('http');

const server = http.createServer((req, resp) => {
  const { headers, url, method } = req;
  console.log(headers, url, method);
  res.end();
});

const PORT = 5000;
 server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
