'use strict';

const model = new require('./user.js')();
const program = require('commander');


program
  .version('1.0.0')
  .option('-a, --add [value]', 'add item')
  .option('-g, --get [value]', 'get item')
  .option('-d, --delete [value]', 'delete item')
  .option('-r, --role [value]', 'role')
  .option('-f, --filtered [value]', 'filtered')
  .option('-u, --update [value]', 'update')
  .parse(process.argv);

if (program.add) {

  const json = JSON.parse(program.add);
  const obj = {};
  obj['username'] = json.name;
  obj['sub'] = json.sub;
  obj['uuid'] = getUnixTime();
  obj['age'] = parseInt(json.age);
  obj['created_at'] = new Date();
  // node main.js -a '{"name": "root", "age": "21", "sub": {"param1": "a", "param2":"b"} }'

  console.log(obj);
  model.add(obj);
  process.exit();
}

if (program.get) {
  const datas = model.get();
  console.log('datas:', datas);
  process.exit();
}

if (program.delete) {
  const arg = program.delete;
  const datas = model.get();
  let data = null;
  datas.forEach((_data) => {
    if (_data.uuid === arg) {
      data = _data;
    }
  });
  model.delete(data);
  process.exit();
}

if (program.role) {
  const datas = model.filteredRoleUser();
  console.log(datas);
  process.exit();
}

if (program.filtered) {
  const arg = program.filtered;
  const datas = model.filtered(arg);
  console.log(datas);
  process.exit();
}

if (program.update) {
  const json = JSON.parse(program.update);
  const obj = {};
  obj['username'] = json.name;
  obj['sub'] = json.sub;
  obj['uuid'] = json.uuid;
  obj['age'] = parseInt(json.age);
  obj['created_at'] = new Date();
  const uuid = obj.uuid;
  delete obj.uuid;
  model.update(uuid, obj);
  process.exit();
  // node main.js -u '{ "uuid": "uuid_1531877694720" ,"name": "toor", "age":"31", "sub": {"param1": "ccc", "param2":"ff"} }'
}

function getUnixTime() {
  const date = new Date();
  return 'uuid_' + date.getTime();
}
