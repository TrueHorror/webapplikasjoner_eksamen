UserService = require('../services/user.service')

describe("getUserType()", () => {
  it("should return 0 for admin", () => {
    expect(UserService.getUserType('admin')).toBe(0);
    expect(UserService.getUserType('administrator')).toBe(0);
    expect(UserService.getUserType('0')).toBe(0);
    expect(UserService.getUserType('fakeAdmin')).toBeUndefined()
  });
});

describe("loginUser()", async () => {
  it ("should login admin and return a token", async () => {
    let loginDetails = {
      Email: "admin@admin.no",
      Password: "drossap"
    }
    import

    expect(await UserService.loginUser(loginDetails)).toBe('hei')
  })
})
