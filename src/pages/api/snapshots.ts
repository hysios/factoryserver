import client from "@/lib/aliyun";
import { regionId } from '@/lib/aliyun'
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const usage = await client.request('DescribeSnapshotsUsage', {
        'RegionId': regionId,
    })

    client.request('DescribeSnapshots', {
        'RegionId': regionId
    }).then((result: any) => {
        res.json({
            usage: usage,
            snapshots: result
        })
    })
}

export default handler