## Launch docker-compose
docker-compose up -d

## Stop and remove all containers of eindopdracht
docker-compose down



## Description

Api for Emotify. A company that will let other companies upload their promo videos.

## Getting Started

### Dependencies

    cors
    dotenv
    express
    express-fileupload
    faker
    fs
    jest
    join-js
    knex
    nodemon
    pg
    supertest

### Installing

Download program via https://github.com/soufyannajjar/eindopdracht

### Executing program

* Launch docker-compose
* Run docker-compose up -d

* Endpoints:
GET /companies
Returns all the companies from the database

PUT /videos

Updates a video from the database

DELETE /videos

Deletes a video from the database

### Stop program 
* Stop and remove all containers of eindopdracht
* Run docker-compose down

## Authors

Soufyan Najjar

## License

This project is licensed under the Eindopdracht License - see the LICENSE.md file for details

