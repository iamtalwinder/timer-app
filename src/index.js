const app = require("./server");

app.listen(process.env.PORT, () => {
  console.log(`http://localhost:${process.env.PORT}`);
});
