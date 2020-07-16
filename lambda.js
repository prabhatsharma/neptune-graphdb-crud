const zlib = require('zlib');
const graphUtils = require('./graph-utils')

exports.handler = async (event, context) => {
    const payload = Buffer.from(event.awslogs.data, 'base64');
    const parsed = JSON.parse(zlib.gunzipSync(payload).toString('utf8'));
    var logEvents = parsed.logEvents;
    console.log('Total events: ', logEvents.length)
    for(var i=0; i < logEvents.length; i++){
        var baseEvent = JSON.parse(logEvents[i].message)
        await graphUtils.writegraph(baseEvent)
        // console.log(baseEvent)
    }
    return `Successfully processed ${parsed.logEvents.length} log events.`;
};
