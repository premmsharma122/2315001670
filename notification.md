# Student Notification System (Backend Core)

A lightweight, scalable backend system built with Node.js and Express to manage and prioritize notifications for students. Designed keeping real-time pushes, query optimization, and memory efficiency in mind.

---

## Technical Stack
* **Runtime Environment:** Node.js
* **Backend Framework:** Express.js
* **Database Driver:** Mongoose (MongoDB Engine)
* **Testing Tool:** Postman / Native Fetch Pipeline

---

## Assignment Framework & Structural Solutions

### Stage 1: API Architecture & Communication
* Built functional REST endpoints with strong validation checking for unique student identities (`X-User-Id` static header token routing).
* Designed real-time delivery mechanism using **Socket.io/WebSockets** room-isolation to eliminate database fetch overhead.

### Stage 2: Database Layer Strategy
* Selected **MongoDB** over typical relational databases due to high write-throughput scalability and flexible schema attributes.
* Formulated scalable schemas to support variable structures (Placement, Result, Event) without operational downtime.

### Stage 3: Engine Optimization & Index Tuning
* Analyzed a bottleneck relational statement and designed a compound multi-key index `(studentId, isRead, createdAt)` reducing complexity to $O(\log N)$.
* Documented why blindly indexing every column degrades system write performance.
### Stage 4: Cache Caching Layers
* Handled the system breakdown issue caused by continuous page refreshes using a hybrid caching approach.
* Mapped application state using React Query on client side and **Redis in-memory caching** patterns on the server layer.
### Stage 5: Asynchronous Microservice Routing
* Resolved tight-coupling blocking loop issues during bulk triggers (e.g., sending 50,000 student payloads).
* Redesigned workflow using decoupled message queues (**BullMQ/RabbitMQ** workers) backed by exponential retry strategies.