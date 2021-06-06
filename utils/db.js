const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;

const uri =
  "mongodb+srv://Artem:Artem2209@taskycluster.i3esw.mongodb.net/tasky?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const mongoConnect = (cb) =>
  client
    .connect()
    .then((client) => {
      console.log("connected to mongodb");
      _db = client.db();
      cb();
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });

const getDb = () => {
  if (_db) {
    return _db;
  }

  throw "no db found";
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
