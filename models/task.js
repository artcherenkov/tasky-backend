const { getDb } = require("../utils/db");
const mongodb = require("mongodb");

class Task {
  constructor({ description, dueDate, isArchived, isFavorite, repeatingDays }) {
    this.description = description;
    this.dueDate = dueDate;
    this.isArchived = isArchived;
    this.isFavorite = isFavorite;
    this.repeatingDays = repeatingDays;
  }

  save() {
    const db = getDb();
    return db
      .collection("tasks")
      .insertOne(this)
      .then((res) => res)
      .catch((err) => {
        console.log(err);
        throw err;
      });
  }

  static edit(id, updatedTask) {
    const db = getDb();

    const filter = { _id: mongodb.ObjectId(id) };
    const updateDocument = {
      $set: updatedTask,
    };

    return db
      .collection("tasks")
      .updateOne(filter, updateDocument)
      .then((res) => res)
      .catch((err) => {
        console.log(err);
        throw err;
      });
  }

  static delete(id) {
    const db = getDb();
    const filter = { _id: mongodb.ObjectId(id) };

    return db
      .collection("tasks")
      .deleteOne(filter)
      .then((res) => res)
      .catch((err) => {
        console.log(err);
        throw err;
      });
  }

  static fetchAll() {
    const db = getDb();
    return db
      .collection("tasks")
      .find()
      .toArray()
      .then((tasks) => tasks)
      .catch((err) => {
        throw err;
      });
  }

  static findById(id) {
    const db = getDb();
    return db
      .collection("tasks")
      .find({ _id: mongodb.ObjectId(id) })
      .next()
      .then((task) => task)
      .catch((err) => {
        throw err;
      });
  }
}

module.exports = Task;
