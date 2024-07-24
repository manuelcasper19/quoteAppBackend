
# Book Loan Backend

## Overview
The Book Loan Backend is a Node.js application designed for managing book loans. This service supports functionalities for handling books, novels, authors, and operations related to book loans and returns.


## Technologies

The application uses Node.js with the following dependencies:

* bcryptjs - For hashing passwords.
* cors - For Cross-Origin Resource Sharing.
* dotenv - For environment variable management.
* express - Web framework for Node.js.
* express-validator - Validators and sanitizers for Express.js.
* inversify- Inversion of Control (IoC) container for TypeScript and JavaScript.
* jsonwebtoken - For JSON Web Token management.
* mongoose - MongoDB object modeling tool.
* nodemailer - For sending emails.

## Architecture
The application follows Hexagonal Architecture (also known as Ports and Adapters Architecture). This pattern maintains separation between core business logic and external systems.

### Principles and Patterns

* SOLID Principles:

   * Single Responsibility Principle: Each class/module has a single responsibility.
   * Open/Closed Principle: System is open for extension, closed for modification.
   * Dependency Inversion Principle: High-level modules depend on abstractions.

* Design Patterns:
  * Builder Pattern: Used with the Director to construct complex objects like books and novels.

