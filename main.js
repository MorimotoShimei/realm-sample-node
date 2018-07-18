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
  const args = program.add.split(',');

  const obj = {};
  args.forEach((arg) => {
    const argArr = arg.split(':');
    const key = argArr[0].trim();
    const val = argArr[1];
    obj[key] = val.trim();
  });
  obj['uuid'] = getUnixTime();
  obj['age'] = parseInt(obj.age);
  obj['created_at'] = new Date();
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
  const args = program.update.split(',');
  const obj = {};
  args.forEach((arg) => {
    const argArr = arg.split(':');
    const key = argArr[0].trim();
    const val = argArr[1];
    obj[key] = val.trim();
  });
  if (obj.age) {
    obj['age'] = parseInt(obj.age);
  }
  const uuid = obj.uuid;
  delete obj.uuid;
  const datas = model.update(uuid, obj);
  process.exit();
}

function getUnixTime() {
  const date = new Date();
  return 'uuid_' + date.getTime();
}
