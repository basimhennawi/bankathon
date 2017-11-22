Bankathon
=========

This is a simple web server of REST APIs with ES6 and Express, that connect to Coinbase API and provide data back as BAPI-schemed.

- ES6 support via [babel](https://babeljs.io)
- REST resources as middleware via [resource-router-middleware](https://github.com/developit/resource-router-middleware)
- CORS support via [cors](https://github.com/troygoode/node-cors)
- Body Parsing via [body-parser](https://github.com/expressjs/body-parser)

Getting Started
---------------
- For run it locally:

```sh
# Clone it
git clone git@github.com:basimhennawi/bankathon
cd bankathon

# Install dependencies
npm install

# Start development live-reload server
PORT=8080 npm run dev

# Start production server:
PORT=8080 npm start
```
- To be hosted on Heroku (soon)

Docker Support
------
```sh
cd bankathon

# Build your docker
docker build -t bankathon/api-service .
#            ^            ^           ^
#          tag        tag name      Dockerfile location

# run your docker
docker run -p 8080:8080 bankathon/api-service
#                 ^               ^
#          bind the port        container tag
#          to your host
#          machine port   

```

License
-------

MIT
