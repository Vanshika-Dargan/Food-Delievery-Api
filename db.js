const {Pool} =require('pg');
const pool=new Pool({
    host:'db',
    port:5434,
    user:'root',
    password:'password',
    database:'db123'
})

module.exports=pool;