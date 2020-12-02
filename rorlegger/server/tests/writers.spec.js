WriterService = require('../services/writer.service')

describe("getWriters()", () => {
  it("should return 3 writers", () => {
      expect(WriterService.getWriters().length).toBe(3);
  });
});

describe("writerExists()", () => {
  it("should return true", () => {
    expect(WriterService.writerExists('Lars', 'Larsen')).toBeTruthy()
  })
  it('should return false', () => {
    expect(WriterService.writerExists('Lars', 'Lasen')).toBeFalsy()
  })
})
