import type { NextApiRequest, NextApiResponse } from 'next'
import { uuid } from 'uuidv4';

import { client } from '../../utils/client';

type Data = {
  name: string
}

export default async function handler( req: NextApiRequest, res: NextApiResponse) {
  if(req.method === 'PUT') {
    const { userFollowedById, userFollowerId, follow } = req.body;

    const data = 
    follow ? await client
        .patch(userFollowedById)
        .setIfMissing( {followers: []} )
        .insert('after', 'followers[-1]', [
            {
                _key: uuid(),
                _ref: userFollowerId
            }
        ])
        .commit()
    : await client  
        .patch(userFollowedById)
        .unset([`followers[_ref=="${userFollowerId}"]`])
        .commit();
    
    res.status(200).json(data);
  }
}
