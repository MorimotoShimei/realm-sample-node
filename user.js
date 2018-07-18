'use strict';

const Realm = require('realm');

function User() {
  if (!(this instanceof User)) return new User();
  this.schema = {
    name: 'Users',
    primaryKey: 'uuid',
    properties: {
      uuid: 'string',
      username: 'string',
      age: 'int?',
      role: 'string?',
      created_at: 'date'
    }
  };

  this.realm = new Realm({
    path: 'db/realm',
    schema: [this.schema]
  });
}

User.prototype.add = function(input) {
  this.realm.write(() => {
    const datas = this.realm.create(this.schema.name, input);
  });
}

User.prototype.update = function(uuid, inputs) {
  const data = this.filtered(`uuid == '${uuid}'`);

  this.realm.write(() => {
    Object.keys(inputs).forEach((key) => {
      data[0][key] = inputs[key];
    });
  });
}

User.prototype.get = function() {
  return this.realm.objects(this.schema.name);
}

User.prototype.filteredRoleUser = function() {
  const datas = this.realm.objects(this.schema.name);
  return datas.filtered('role == "user"');
}

User.prototype.filtered = function(filterString) {
  const datas = this.realm.objects(this.schema.name);
  return datas.filtered(filterString);
}

User.prototype.delete = function(object) {
  this.realm.write(() => {
    this.realm.delete(object);
  });
}

module.exports = User;
