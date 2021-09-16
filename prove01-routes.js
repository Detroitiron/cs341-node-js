const users = [
    "Tom",
    "Jim",
    "Teancum",
    "Moroni",
]
const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;
    res.setHeader('Content-Type', 'text/html');
    if (url === '/') {
        res.write('<html>');
        res.write('<head><title>My First Page</title></head>');
        res.write('<body><h1>Hi nice to meet you.</h1>');
        res.write('<form action="/create-user" method="POST"><input type="text" name="username"><button type="submit">Send</button></form>')
        res.write('</html>');
        return res.end();
    } else if (url === '/users') {
        res.write('<html>');
        res.write('<head><title>My First Page</title></head>');
        res.write('<body><h1>Hi nice to meet you.</h1>');
        res.write('<li>')
        for (let user of users) {
            res.write('<ul>'+user+'</ul>');
        }
        res.write('</li>')
        res.write('</body>')
        res.write('</html>');
        return res.end();
    } else if (url === '/create-user' && method === "POST") {
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        })
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const username = parsedBody.split('=')[1];
            console.log(username);
            users.push(username);
            res.statusCode = 302;
            res.setHeader('Location', '/')
            return res.end()
        })
    }
}

module.exports = requestHandler;