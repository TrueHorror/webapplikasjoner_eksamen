const UserService = require('../services/user.service')
const User = require('../models/user.model')
jest.mock('../models/user.model')

describe("getUserType()", () => {
  it("should return 0 for admin", () => {
    expect(UserService.getUserType('admin')).toBe(0);
    expect(UserService.getUserType('administrator')).toBe(0);
    expect(UserService.getUserType('0')).toBe(0);
    expect(UserService.getUserType('fakeAdmin')).toBeUndefined()
  });
});

describe("loginUser()", () => {
  User.findOne.mockResolvedValue({
    Password: "$2b$10$kBqlrGT9SFj03HQ0XbiU/eZVwSZXCJdz6dVrs/jF6TJIYbyBlH8Ee"
  })
  process.env.JWT_SECRET = '777f9cf0-354a-11eb-adc1-0242ac120002'
  it ("should login admin and return a token", async () => {
    let loginDetails = {
      Email: "admin@admin.no",
      Password: "drossap"
    }
    expect(await UserService.loginUser(loginDetails)).toMatch(/eyJ0/)
    expect(User.findOne).toHaveBeenCalledTimes(1)
  })
  it ("should return null when password is wrong", async () => {
    let loginDetails = {
      Email: "admin@admin.no",
      Password: "drosap"
    }
    expect(await UserService.loginUser(loginDetails)).toBeNull()
  })
  /*it ("should fail when db is down", async () => {
    User.findOne.mockResolvedValue(undefined)
    let loginDetails = {
      Email: "admin@admin.no",
      Password: "drossap"
    }
    expect(await UserService.loginUser(loginDetails)).toThrow('Login failed')
  })*/
})
/*
describe("createUser()", () => {
  it ("should create a user", async () => {
    let userDetails = {
      "GivenName": "Ole",
      "FamilyName": "Olsen",
      "UserType": "admin",
      "Email": "admin@admin.no",
      "Password": "drossap"
    }

    expect(await UserService.createUser(userDetails)).toBeUndefined()
    expect(User.create).toBeUndefined()
  })
})*/
