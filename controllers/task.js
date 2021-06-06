const Product = require("../models/task");

exports.getTasks = (req, res) => {
  Product.fetchAll()
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
};
exports.getTaskById = (req, res) => {
  const id = req.params.id;
  console.log(id);
  Product.findById(id)
    .then((result) => {
      console.log(result);
      res.send(result);
    })
    .catch((err) => console.log(err));
};
exports.postTask = (req, res) => {
  const product = new Product(req.body);
  product
    .save()
    .then((result) => {
      const createdProduct = result.ops[0];
      res.send(createdProduct);
    })
    .catch((err) => console.log(err));
};
exports.putTask = (req, res) => {
  const id = req.params.id;
  const updatedTask = req.body;

  delete updatedTask._id;

  Product.edit(id, updatedTask)
    .then((result) => {
      const { modifiedCount, matchedCount } = result;
      if (!matchedCount) {
        res.status(404).send("Ничего не найдено");
        return;
      }
      if (!modifiedCount) {
        res.send("Ничего не изменено");
        return;
      }

      Product.findById(id).then((result) => res.send(result));
    })
    .catch((err) => console.log(err));
};
exports.deleteTask = (req, res) => {
  const id = req.params.id;
  Product.delete(id)
    .then((result) => {
      const { deletedCount } = result;
      if (deletedCount === 1) {
        res.send(id);
        return;
      }
      res.status(404).send("Задача не найдена. Удаление не произошло.");
    })
    .catch((err) => console.log(err));
};
