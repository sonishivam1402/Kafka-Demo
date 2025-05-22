require('dotenv').config();
const {Kafka} = require("kafkajs");

exports.kafka = new Kafka({
    clientId: 'my-app',
    brokers: [`${process.env.IP_ADD}:9092`],
})