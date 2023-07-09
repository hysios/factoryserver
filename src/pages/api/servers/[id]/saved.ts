import { NextApiRequest, NextApiResponse } from "next";
var RPCClient = require('@alicloud/pop-core').RPCClient;

const regionId = process.env.ALIYUN_REGION_ID;
const endpoint = `https://ecs.${regionId}.aliyuncs.com`;

var client = new RPCClient({
    accessKeyId: process.env.ALIYUN_ACCESS_KEY_ID,
    accessKeySecret: process.env.ALIYUN_ACCESS_KEY_SECRET,
    endpoint: endpoint,
    apiVersion: '2014-05-26'
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    console.log('regionId', regionId);
    console.log('endpoint', endpoint);
    client.request('DescribeInstances', {
        'RegionId': regionId,
    }).then((result: any) => {
        res.json(result);
    })
}

export default handler