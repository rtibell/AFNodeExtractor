const mongoose = require("mongoose");
const requestor = require("./requestor");
const log = console.log;

main().catch((err) => console.log(err));

async function main() {
  const mongoURI = "mongodb://127.0.0.1:27017/af";
  const options = {
    autoIndex: false, // Don't build indexes
    maxPoolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4, // Use IPv4, skip trying IPv6
  };

  mongoose.set('strictQuery', false);
  await mongoose.connect(mongoURI, options).then(
    () => { log("Connection success!");},
    (err) => { log("Connection error:", err);}
  );
  
    requestor();
}
