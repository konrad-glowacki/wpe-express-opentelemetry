'use strict';

// eslint-disable-next-line
require('./tracer')('example-express-server');

// Require in rest of modules
const express = require('express');
const axios = require('axios').default;

// Setup express
const app = express();
const PORT = process.env.PORT || 3300;

async function setupRoutes() {
  app.use(express.json());

  app.get('/run-test', async (req, res) => {
    const REQUEST_URL = 'https://dynahead.wpengine.com/graphql';

    const query = `
      query QueryPosts {
        posts {
          nodes {
            id
            content
            title
            slug
            featuredImage {
              node {
                mediaDetails {
                  sizes {
                    sourceUrl
                    name
                  }
                }
              }
            }
          }
        }
      }
    `;

    const response = await axios.post(REQUEST_URL, {
      query,
    });

    console.log('Request done: ', REQUEST_URL);
    return res.status(200).send(response.data.data.posts.nodes);
  });
}

setupRoutes().then(() => {
  app.listen(PORT);
  console.log(`Listening on http://localhost:${PORT}`);
});
