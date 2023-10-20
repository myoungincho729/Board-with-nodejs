const TaskModel = require("../models/TaskModel");

module.exports.getTasks = async (req, res) => {
  const task = await TaskModel.find();
  res.send(task);
};

module.exports.saveTask = (req, res) => {
  const body = req.body;
  console.log(body);

  TaskModel.create(body)
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((err) => {
      console.log(err);
      res.send({ error: err, msg: "something went wrong" });
    });
};

module.exports.updateTask = (req, res) => {
  const { task } = req.body;
  const { id } = req.params;
  console.log(task, id);
  TaskModel.findByIdAndUpdate(id, { task })
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((err) => {
      console.log(err);
      res.send({ error: err, msg: "something went wrong" });
    });
};

module.exports.deleteTask = (req, res) => {
  const { id } = req.params;

  TaskModel.findByIdAndDelete(id)
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((err) => {
      console.log(err);
      res.send({ error: err, msg: "something went wrong" });
    });
};
