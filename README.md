# CurrencyRates



# INFO
## **Database** (PostgreSQL)

## **Backend** (Java OpenJdk 16/Maven/Spring Boot/Liquibase) - https://github.com/AralovArtur/CurrencyRates/tree/master/backend

## **Frontend** (React) - https://github.com/AralovArtur/CurrencyRates/tree/master/frontend


BE healthcheck monitoring  [backendi url:port]/actuator URL-il.

- "http://localhost:8080/actuator/httptrace"



# BUILD
## **Build back-end**
mvn package <br>
java -jar backend/target/CurrencyRates-0.0.1-SNAPSHOT.jar

## **Build front-end**
npm install <br>
npm start
