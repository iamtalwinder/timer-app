module.exports = async () => {
  console.log("Close mongo connection");
  delete this.global.taskClient;
};
