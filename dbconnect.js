const mongoos = require('mongoose')

const url = 'mongodb://127.0.0.1:27017/Moviereview'

module.exports =() => {
    return mongoos.connect(url,{useNewUrlParser:true})
}