-<>-<>-<>-YaYa-<>-<>-<>-
<Interledger-2025>
A microservices-based system that integrates WhatsApp messaging, peer-to-peer payments, and product data management — built to scale and orchestrate under containerized deployment.

   \(@^0^@)/

++++++Overview++++++
This repository implements a distributed system composed of three primary capabilities:

1. Messaging operations via the WAHA service (WhatsApp integration)
2. Payment transactions via the Interledger protocol / Open Payments network
3. Product data management via a REST API backed by MongoDB
   Each capability is encapsulated in an independent service, orchestrated together with Docker Compose. The architecture is designed with extensibility in mind — e.g., messaging-triggered payments, unified data persistence, and LLM integration via OLLAMA in future roadmap.

(o゜▽゜)o☆

°°°°°°Service Components°°°°°°
Service			| Container Name 	| Port 				| Purpose
WAHA Service		| waha 			| 3000 (localhost-bound) 	| WhatsApp API integration: session management, media handling
Interledger Service 	| interledger_service 	| 3005 				| Payment processing using Interledger / Open Payments
Data Service 		| mongo_service 	| 3000 (separate compose) 	| RESTful Product CRUD API backed by MongoDB
MongoDB 		| mongodb 		| 27017 			| Document database for product data
OLLAMA LLM		| OLLAMA		| 11434				| Intelligent automation into the messaging/payment loop
OLLAMA Service		| ollama-service	| 3000				| Frontend and service communication for the LLM processing

Note: A multi-instance WhatsApp orchestrator, and a unified data / transaction storage service.

Technology Stack & Key Dependencies
WAHA Service

* Pre-built image: devlikeapro/waha:latest
  Interledger Service
* @interledger/open-payments
* express, cors, dotenv
  Data Service
* express, mongoose (MongoDB ODM), cors, dotenv
  Configuration via .env files on each service, excluded from version control.

Data Persistence Strategy
WAHA: File-based persistence — sessions directory (./waha/sessions) and media directory (./waha/media) mounted as host bind-mounts
Data Service: MongoDB document store, accessed via Mongoose, using a named Docker volume for persistence
.gitignore excludes node_modules/, IDE config, .env files, and runtime session/media files.

(∩^o^)⊃━☆

------Getting Started------

1. Clone the repository:
   git clone [https://github.com/ChaboCode/interledger-2025](https://github.com/ChaboCode/interledger-2025)
2. Create the required .env files for each service (see service specific docs)
3. Start the system:
   docker-compose up -d
4. Verify:
   curl [http://localhost:3000](http://localhost:3000)   # WAHA service
   curl [http://localhost:3005](http://localhost:3005)   # Interledger service
   Each service supports further configuration; see the Environment Configuration section for details.

******Project Structure******

* compose.yml — Multi-service definition (Docker Compose v3.9) with restart policies (restart: always) and logging configuration
* waha/, interledger_service/, data_service/ — Service directories, each with Dockerfiles or base images, and .env templates
* .gitignore — Excludes runtime and sensitive files (see above)
* Additional folders for service-specific code, schema definitions, API endpoints, data models, etc.

_-_-_-Network Architecture and Port Strategy-_-_-_

* Services are segregated by port to enforce isolation and security boundaries
* WAHA binds to 127.0.0.1:3000 (internal only)
* Interledger binds to external :3005 to accept payment requests
* MongoDB listens on :27017, accessible to data service container only
  All network mappings are defined in compose.yml.

´´´´´´´´Roadmap & Planned Enhancements´´´´´´´´´´´´

* Build multi-instance orchestrator for WAHA (whatsapp service scaling)
* Introduce a unified data service to persist transactions, product usage, messaging logs — enabling messaging → payment → record linkage
* Expand API endpoints, improve monitoring/logging, add production-grade resilience (replicas, health checks, service mesh)

//////Why This Project Matters//////
By combining messaging, payments, and product data into a cohesive microservices platform,
this project provides a modern, scalable architecture for real-time business workflows.
It leverages containerization for quick deployment, isolated services for maintainability,
and clear data boundaries for robustness.
Integrated with LLMs via OLLAMA will bring intelligent automation into the
messaging/payment loop — shortening time-to-value and enabling smarter business operations.

Contributors: TuTíaDev:
Leader/Full Stack = “Saul Chávez Sánchez”
Backend_Dev = “Javier Esteban Ochoa Raygoza”
Business = “Ian Abel Zavala Saucedo”
Data Analyst= “Dylan Eleomar Velazquez Uvario”


Thank you for exploring YaYa <interledger-2025>.
