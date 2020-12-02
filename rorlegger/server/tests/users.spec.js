UserService = require('../services/user.service')

describe("getUserType()", () => {
  it("should return 0 for admin", () => {
    expect(UserService.getUserType('admin')).toBe(0);
    expect(UserService.getUserType('administrator')).toBe(0);
    expect(UserService.getUserType('0')).toBe(0);
    expect(UserService.getUserType('fakeAdmin')).toBeUndefined()
  });
});
