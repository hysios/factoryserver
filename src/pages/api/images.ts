import client from "@/lib/aliyun";
import { regionId } from '@/lib/aliyun'
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    client.request('DescribeImages', {
        'RegionId': regionId
    }).then((result: any) => {
        res.json(result);
    })
}

export default handler