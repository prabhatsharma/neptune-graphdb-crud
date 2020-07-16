var simplifiedEvent = require('./event.json')
var cwEvent = require('./cloudwatch-event.json')

var lambda = require('./lambda')
var graphUtils = require('./graph-utils')

// use lambda
lambda.handler(cwEvent,null).then(res=>{
    console.log('lambda executed successfully: ', res)
}).catch(err=>{
    console.log('lambda execution failed: ', err)
})


// directly execute
// graphUtils.writegraph(simplifiedEvent).then(res=>{
//     console.log('graph created successfully: ', res)
// }).catch(err=>{
//     console.log('graph creation failed: ', err)
// })

