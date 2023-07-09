import { NextApiRequest, NextApiResponse } from "next";
import { regionId } from '@/lib/aliyun'
import aliClient from '@/lib/aliyun'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    switch (req.method) {
        case 'POST':
            startInstance(req, res)
            break;
        case 'GET':
            listInstances(req, res)
            break;
    }
}

const startInstance = async (req: NextApiRequest, res: NextApiResponse) => {
    const {
        templateId,
        imageId
    } = JSON.parse(req.body);

    console.log(typeof req.body);
    aliClient.request('RunInstances', {
        'RegionId': regionId,
        'LaunchTemplateId': templateId,
        // 'DataDisk.0.SnapshotId': snapshotId,
        'ImageId': imageId
    }).then((result: any) => {
        res.json(result);
    })
}

const listInstances = async (req: NextApiRequest, res: NextApiResponse) => {
    console.log('regionId', regionId);
    aliClient.request('DescribeInstances', {
        'RegionId': regionId,
    }).then((result: any) => {
        res.json(result);
    })
}

export default handler