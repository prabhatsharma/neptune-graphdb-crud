var AWS = require('aws-sdk')
const flatten = require('flat')
const crypto = require('crypto');



AWS.config.update({ region: 'us-west-2' })

var DDB = new AWS.DynamoDB.DocumentClient()
var table = 'k8s-audit'

exports.checkandInsert = function (recordtype, maindata) {
    return new Promise(function (resolve, reject) {
        var id= hash(JSON.stringify(maindata))

        var params = {
            TableName: table,
            Key: {
                "id": id,
                "recordtype": recordtype
            }
        };
        DDB.get(params, (err, data) => {
            if (err) {
                reject(err)
            } else if (!data.Item) {
                var params2 = {
                    TableName: table, Item: { "id": id, "recordtype": recordtype, data: maindata }
                };

                DDB.put(params2, (err2, data2) => {
                    if (!err2) {
                        resolve({ inserted: true, id: id })
                    } else reject(err2)
                })
            } else {
                return resolve({ inserted: false, id: id  })
            }
        })
    })
}

function hash(data){
    const secret = 'simplesecret'
    return crypto.createHmac('sha256', secret).update(data).digest('hex')
}

exports.insertObject = function(data){


}