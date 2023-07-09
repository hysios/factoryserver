var RPCClient = require('@alicloud/pop-core').RPCClient;

const regionId = process.env.ALIYUN_REGION_ID;
const endpoint = `https://ecs.${regionId}.aliyuncs.com`;

const client = new RPCClient({
    accessKeyId: process.env.ALIYUN_ACCESS_KEY_ID,
    accessKeySecret: process.env.ALIYUN_ACCESS_KEY_SECRET,
    endpoint: endpoint,
    apiVersion: '2014-05-26'
});

export default client

export {
    regionId,
    endpoint
}