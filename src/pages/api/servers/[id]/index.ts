import { NextApiRequest, NextApiResponse } from "next";
import { regionId } from '@/lib/aliyun'
import aliClient from '@/lib/aliyun'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    switch (req.method) {
        case 'DELETE':
            stopInstance(req, res)
            break;
    }
}

const stopInstance = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query;
    console.log('id', id);
    aliClient.request('StopInstance', {
        'InstanceId': id,
        'StoppedMode': 'StopCharging'
    }).then((result: any) => {
        res.json(result);
    })
}


export default handler