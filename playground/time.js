const moment = require('moment');

moment.defaultFormat='LLLL';
console.log(moment('2010-06-20T10:00:00.000').diff(moment(),'years'));

