<h1>CRUDAPI clone trello functions</h1>


<h2>A NestJS-based project featuring user authentication, CRUD operations, and comprehensive data validation, leveraging PostgreSQL for database management.</h2>

<h3>Introduction</h3>

***This project is a full-fledged backend application built with NestJS, providing robust user authentication, comprehensive CRUD operations, and meticulous data validation. The project uses PostgreSQL as the database and integrates Swagger for detailed API documentation.***

<h3>Features</h3>

***User Authentication***

***Email and password-based authentication***

***JWT token generation and validation***

***Secure API endpoints with JWT authorization headers***

***Database Integration***


``
PostgreSQL database with TypeORM
Entities: User, Column, Card, Comment
Relationships:
One-to-many between User and Columns
One-to-many between Column and Cards
One-to-many between Card and Comments
CRUD Operations
``

RESTful CRUD endpoints for all entities
Manual implementation without NestJS CRUD module
Data Validation

Validation pipes for incoming data
Field validation for email, string length, numerical values
Authorization Guards

Permission checks for modifying/deleting entities
Owner verification for update/delete operations
Swagger Documentation

API documentation with detailed endpoint descriptions
Models documented with ApiProperty, ApiTags, and ApiOperation
Tech Stack
Framework: NestJS
Language: TypeScript
Database: PostgreSQL
ORM: TypeORM
Authentication: JWT
Documentation: Swagger
Installation
Clone the repository:


