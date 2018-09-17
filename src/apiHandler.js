const apiHandler = () => (req, res) => {
  const moduleName = req.path.split("/")[1];

  switch (moduleName) {
    case "todoList":
      res.send({
        todos: [
          {
            id: 123456,
            label: "Initially added Todo.",
            done: true
          },
          {
            id: 356479,
            label: "Another task from api server.",
            done: false
          }
        ]
      });
      break;
    default:
      res.send({});
  }
};

module.exports = apiHandler;
