import { auths, database } from '@/api-lib/middlewares';
import { ncOpts } from '@/api-lib/nc';
import nc from 'next-connect';

const handler = nc(ncOpts);

handler.use(database);

handler.get(...auths, async (req, res) => {
  if (!req.user) {
    return res.status(401).end();
  }
  console.log('User ID:', req.user._id);

  const request_metadata = await req.db
    .collection('request-metadata')
    .find({ requestor: req.user._id })
  .toArray();

  console.log('request_metadata:', request_metadata);

  const groupIds = [];
  request_metadata.forEach((item) => {
    if (groupIds.indexOf(item.groupId) === -1) {
      groupIds.push(item.groupId);
    }
  });

  const deliveries = await req.db.collection('deliveries').find().toArray();
  console.log('deliveries:', deliveries);

  res.send({
    result: 'success',
    request_metadata: request_metadata,
    // request_items: request_items,
    deliveries: deliveries,
  });
});

export default handler;



// useEffect(() => {

  //   const link = document.createElement('link');
  //   link.rel = 'stylesheet';
  //   link.href = 'https://api.mapbox.com/mapbox.js/plugins/mapbox-directions.js/v0.4.0/mapbox.directions.css';
  //   document.head.appendChild(link);
    
  //       const link2 = document.createElement('link');
  //       link2.rel = 'stylesheet';
  //       link2.href = 'https://api.mapbox.com/mapbox.js/v3.3.1/mapbox.css';
  //       document.head.appendChild(link2);
  
  //   const script2 = document.createElement('script');
  //   script2.src = 'https://api.mapbox.com/mapbox.js/v3.3.1/mapbox.js';
  //   script2.type = 'text/javascript';
  //   script2.async = true;
  //   document.body.appendChild(script2);
  
  
  //   const script = document.createElement('script');
  //   script.src = 'https://api.mapbox.com/mapbox.js/plugins/mapbox-directions.js/v0.4.0/mapbox.directions.js';
  //   script.type = 'text/javascript';
  //   script.async = true;
  //   document.body.appendChild(script);
  
  //   script.onload = () => setScriptIsLoaded(true);
  // }, []);
  // 'use client';