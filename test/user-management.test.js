const UsersDAO = require("../src/dao/usersDAO");

const testUser = {
  name: "Test",
  email: "test@test.com",
  password: "test",
};

describe("User Management", () => {
  beforeAll(async () => {
    await UsersDAO.injectDB(global.taskClient);
  });

  afterAll(async () => {
    await UsersDAO.deleteUser(testUser.email);
  });

  test("Can add a new user to the database", async () => {
    const response = await UsersDAO.addUser(testUser);
    expect(response.success).toBeTruthy();
    expect(response.error).toBeUndefined();

    const user = await UsersDAO.getUser(testUser.email);

    delete user._id;
    expect(user).toEqual(testUser);
  });
});
