const http = require('http');
const mysql = require('mysql');

const server = http.createServer();

const db  = mysql.createPool({
    connectionLimit : 10,
    host            : '127.0.0.1',
    user            : 'battlecat',
    password        : '0388Vast!',
    database        : 'stark_battlecat'
  });

const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Headers, Authorization',
    'Content-Type': 'application/json'
};

server.on('request', (request, response) => {
    if (request.url == '/users') {
        if (request.method == "GET") {
            db.query('SELECT * FROM users', function (error, results, fields) {
                if (error) {
                    response.writeHead(500, 'Internal Server Error');
                    response.end();
                } 
                else {
                    response.writeHead(200, headers);
                    response.write(JSON.stringify(results));
                    response.end();
                } 
            });
        }
        else if (request.method == "OPTIONS") {
            response.writeHead(200, headers);
            response.end();
        } 
        else if (request.method == "POST") {
            request.on('data', chunk => {
                data = chunk.toString();
            });
            request.on('end', () => {
                data = JSON.parse(data);

                db.query('INSERT INTO users (username, password, date_creation) VALUES (?, ?, now())', [data.username, data.password], function (error, results, fields) {
                    if (error) {
                        response.writeHead(500, 'Internal Server Error');
                        console.log('error');
                        response.end();
                    } 
                    else {
                        response.writeHead(200, headers);
                        response.write(JSON.stringify(results));
                        response.end();
                    } 
                });
            });
        }
        else {
            response.writeHead(405, 'Method not allowed');
            response.end();
        }
    }
    else if (matches = request.url.match(/^\/users\/([0-9]+)$/)) {
        if (request.method == "GET") {
            db.query('SELECT * FROM users WHERE id = ' + matches[1], function (error, results, fields) {
                if (error) {
                    response.writeHead(500, 'Internal Server Error');
                    response.end();
                } 
                else {
                    response.writeHead(200, headers);
                    response.write(JSON.stringify(results));
                    response.end();
                }
            });
        }
        else if (request.method == "OPTIONS") {
            response.writeHead(200, headers);
            response.end();
        } 
        else if (request.method == "DELETE") {
            db.query('DELETE FROM users WHERE id = ' + matches[1], function (error, results, fields) {
                if (error) {
                    response.writeHead(500, 'Internal Server Error');
                    response.end();
                } 
                else {
                    response.writeHead(200, {headers});
                    response.write(JSON.stringify(results.affectedRows == 1) + '\n');
                    response.end();
                }
            });
        }
        else if (request.method == "PUT") {
            let data = '';
            request.on('data', chunk => {
                data += chunk.toString();
            });
            request.on('end', () => {
                data = JSON.parse(data);
                
                db.query('UPDATE users SET points = ? WHERE id = ?', [data.points, matches[1]], function (error, results, fields) {
                    if (error) {
                        response.writeHead(500, 'Internal Server Error');
                        console.log('error');
                        response.end();
                    } 
                    else {
                        response.writeHead(200, headers);
                        response.write(JSON.stringify(results));
                        response.end();
                    } 
                });
            });
        }
        else {
            response.writeHead(404, 'Not found');
            response.end();
        }
    }
    else if (matches = request.url.match(/^\/users\/([0-9]+)\/cats$/)) {
        if (request.method == "GET") {
            db.query('SELECT * FROM cats WHERE current_user_id = ' + matches[1], function (error, results, fields) {
                if (error) {
                    response.writeHead(500, 'Internal Server Error');
                    response.end();
                } 
                else {
                    response.writeHead(200, headers);
                    response.write(JSON.stringify(results));
                    response.end();
                }
            });
        }
        else {
            response.writeHead(404, 'Not found');
            response.end();
        }
    }
    else if (matches = request.url.match(/^\/users\/(.+)\/(.+)$/)) {
        if (request.method == "GET") {
            db.query('SELECT * FROM users WHERE username = "' + matches[1] + '" AND password = "' + matches[2] + '"', function (error, results, fields) {
                if (error) {
                    response.writeHead(500, 'Internal Server Error');
                    response.end();
                } 
                else {
                    response.writeHead(200, headers);
                    response.write(JSON.stringify(results));
                    response.end();
                }
            });
        }
        else {
            response.writeHead(405, 'Method not allowed');
            response.end();
        }
       
    }
    else if (request.url == '/cats') {
        if (request.method == "GET") {
            db.query('SELECT * FROM cats', function (error, results, fields) {
                if (error) {
                    response.writeHead(500, 'Internal Server Error');
                    response.end();
                } 
                else {
                    response.writeHead(200, headers);
                    response.write(JSON.stringify(results));
                    response.end();
                } 
            });
        }
        else if (request.method == "OPTIONS") {
            response.writeHead(200, headers);
            response.end();
        } 
        else if (request.method == "POST") {
            request.on('data', chunk => {
                data = chunk.toString();
            });
            request.on('end', () => {
                data = JSON.parse(data);

                db.query(
                    'INSERT INTO cats (breed, name, image_url, strength, hp_max, in_team, date_summoned, original_user_id, current_user_id) VALUES (?, ?, ?, ?, ?, ?, now(), ?, ?)', 
                    [data.breed, data.name, data.image_url, data.strength, data.hp_max, data.in_team, data.user_id, data.user_id], function (error, results, fields) {
                    if (error) {
                        response.writeHead(500, 'Internal Server Error');
                        response.write(error);
                        response.end();
                    } 
                    else {
                        response.writeHead(200, headers);
                        response.write(JSON.stringify(results));
                        response.end();
                    } 
                });
            });
        }
        else {
            response.writeHead(405, 'Method not allowed');
            response.end();
        }
    }
    else if (matches = request.url.match(/^\/cats\/([0-9]+)$/)) {
        if (request.method == "GET") {
            db.query('SELECT * FROM cats WHERE id = ' + matches[1], function (error, results, fields) {
                if (error) {
                    response.writeHead(500, 'Internal Server Error');
                    response.end();
                } 
                else {
                    response.writeHead(200, headers);
                    response.write(JSON.stringify(results));
                    response.end();
                }
            });
        }
        else if (request.method == "OPTIONS") {
            response.writeHead(200, headers);
            response.end();
        } 
        else if (request.method == "DELETE") {
            db.query('DELETE FROM cats WHERE id = ' + matches[1], function (error, results, fields) {
                if (error) {
                    response.writeHead(500, 'Internal Server Error');
                    response.end();
                } 
                else {
                    response.writeHead(200, {headers});
                    response.write(JSON.stringify(results.affectedRows == 1) + '\n');
                    response.end();
                }
            });
        }
        else {
            response.writeHead(404, 'Not found');
            response.end();
        }
    }
    else {
        response.writeHead(404, 'Not found');
        response.end();
    }
});

server.listen(25565);