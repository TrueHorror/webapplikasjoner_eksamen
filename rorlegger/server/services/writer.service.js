function getWriters(){
    return [
      {GivenName: 'Lars', FamilyName: 'Larsen'},
      {GivenName: 'Gunn', FamilyName: 'Gundersen'},
      {GivenName: 'Simen', FamilyName: 'Simensen'},
  ]
}

exports.writerExists = function (givenName, familyName){
  let writers = getWriters();
  let writerFound = false;
  writers.forEach((writer) => {
    if (writer.GivenName === givenName && writer.FamilyName === familyName){
      writerFound = true;
    }
  })
  return writerFound
}

exports.getWriters = getWriters
