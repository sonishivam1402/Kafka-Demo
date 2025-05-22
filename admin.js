const {kafka} = require('./client');

async function init() {
    const admin = kafka.admin();
    console.log("Admin connecting ...");
    admin.connect();
    console.log("Admin Connection Success ...");

    console.log("Creating Topic [rider-updates]");
    await admin.createTopics({
        topics : [
            {
                topic: "rider-updates",
                numPartitions: 2,
            }
        ]
    });
    console.log("Created Topic [rider-updates]");

    console.log("Disconnecting admin...")
    await admin.disconnect();
}

init();