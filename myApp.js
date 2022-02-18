require('dotenv').config();
const mongoose = require('mongoose');
const { Schema } = mongoose;

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = new Schema({
  name : {
    type: String,
    required: true
  },
  age : Number,
  favoriteFoods : [String]
});

const Person = mongoose.model('Person', personSchema);

/* let Person; */

const createAndSavePerson = (done) => {
  const person = new Person({
    name : 'Santiago',
    age : 22,
    favoriteFoods : ['Pizza', 'Burgers', 'Fruit salad']
  }); 
  person.save(function(err, data){
    if (err) return done(err);
    done(null, data);
  });
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function(err, data){
    if (err) return done(err);
    done(null, data);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, function (err, docs){
    if (err) return done(err);
    done(null, docs);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, function (err, docs){
    if (err) return done(err);
    done(null, docs);
  });
};

const findPersonById = (personId, done) => {
  Person.findById(personId, function (err, docs){
    if (err) return done(err);
    done(null, docs);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, function (err, docs){
    if (err) return done(err);
    docs.favoriteFoods.push(foodToAdd);
    docs.save().then(savedDoc => {
      done(null, savedDoc);
    });
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name : personName},
    {age : ageToSet}, 
    {new: true}, 
    function (err, docs){
      if (err) return done(err);
      done(null, docs);
    });
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, function (err, docs){
    if (err) return done(err);
    done(null, docs);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name : nameToRemove}, function(err, docs){
    if (err) return done(err);
    done(null, docs);
  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({
    favoriteFoods : foodToSearch
  })
  .sort('name')
  .limit(2)
  .select('-age')
  .exec(
    function(err, docs){
      if (err) return done(err);
      done(null, docs);
    }
  )
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
