import { NextApiRequest, NextApiResponse } from 'next';

const fetchLinkedInData =  async (req: NextApiRequest, res: NextApiResponse) => {
  const { accessToken } = req.body;

  console.log('accessToken here: ', accessToken)

  if (!accessToken) {
    return res.status(400).json({ error: 'Access token is required' });
  }

  try {
    const response = await fetch('https://api.linkedin.com/v2/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await response.json();
    console.log('data =', data);

    if (!response.ok) {
      const error = await response.json();
      return res.status(response.status).json(error);
    }

    // const data = await response.json();
    // console.log('data =', data);

    res.status(200).json({ data });
  } catch (error) {
    console.error('Error fetching LinkedIn data:', error);
    res.status(500).json({ error: 'Failed to fetch LinkedIn data' });
  }
};

export default fetchLinkedInData;