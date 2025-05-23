# Kafka Producer-Consumer Example

This project demonstrates a simple Kafka setup using **Node.js** where a producer sends messages with a `name` and `location` (`north` or `south`), and consumers receive these messages based on how the consumer groups are configured.

---

## 🧠 What is Kafka?

[Apache Kafka](https://kafka.apache.org/) is a distributed event streaming platform used for building real-time data pipelines and streaming applications. It is horizontally scalable, fault-tolerant, and extremely fast.

![image](https://github.com/user-attachments/assets/4d09945f-e2a5-442b-93d5-a26d275eeffc)

Kafka consists of:
- **Producer**: Sends messages to Kafka topics.
- **Consumer**: Reads messages from Kafka topics.
- **Topics**: Named channels to which producers write and from which consumers read.
- **Partitions**: Sub-divisions of topics for scaling and load distribution.
- **Consumer Groups**: Consumers coordinate within a group to balance partition consumption.

---

## What is ZooKeeper?
Apache ZooKeeper is a centralized service for maintaining configuration information, naming, synchronization, and group services in distributed systems.

### 📦 In the context of Kafka, ZooKeeper is used to:

- Manage broker metadata : Keeps track of which Kafka brokers are alive. Stores cluster information like topics, partitions, and replicas.
- Leader election : Helps elect a controller broker responsible for managing partition leaders.
- Cluster coordination : Coordinates changes in the Kafka cluster like topic creation, broker joins/leaves, etc.

### 🛠 How it works:

Think of ZooKeeper as:
- A shared config center for distributed systems.
- A watchdog that helps Kafka know when something changes (e.g., a broker goes down).

### 🔍 Simple Analogy:
Imagine you have a classroom of students (Kafka brokers). <br/>
ZooKeeper is like the teacher:
- Keeps attendance (who's present).
- Assigns roles (who is the leader).
- Tracks what everyone is doing (which broker handles what topic/partition).

---

## 🛠️ Project Overview

- A **producer** asks for user input in the format: `name location` (e.g., `tony south`).
- A **Kafka topic** is partitioned by location (`north`, `south`).
- **Consumers** read messages based on their **consumer group** and number of instances.

### 📦 Example Behavior:

1. **1 consumer in 1 group** → receives all messages (both locations).
2. **2 consumers in 1 group** → load is divided: one gets `north`, one gets `south`.
3. **2 groups (one with 2 consumers, one with 1)** → first group splits by location, second group gets all messages independently.

---

## 🚀 Getting Started

### 🐳 Start Zookeeper (port 2181)

```bash
docker run -p 2181:2181 zookeeper
```

## 🐳 Start Kafka (port 9092)

Replace <PRIVATE_IP> with your machine’s IP:

```bash
docker run -p 9092:9092 \
  -e KAFKA_ZOOKEEPER_CONNECT=<PRIVATE_IP>:2181 \
  -e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://<PRIVATE_IP>:9092 \
  -e KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR=1 \
  confluentinc/cp-kafka
```

## 📦 Running the Project Locally

1️⃣ Install Dependencies
```bash
npm install
```

2️⃣ Start One or More Consumers <br/> Start consumers with a **group name:**
```bash
node consumer.js group1
node consumer.js group1  # Start a second consumer in same group (optional)
node consumer.js group2  # Start a consumer in a different group (optional)
```

3️⃣ Start the Producer
In a separate terminal:
```bash
node producer.js
```
Then enter inputs like:
```bash
> tony south
> steve north
```

Messages will be sent to the Kafka topic and consumed according to group and partition configuration.


## 💡 Example Use Case
This structure is ideal for geographically segmented processing where messages are handled differently based on location or region, and you want to load-balance processing within or across teams.
