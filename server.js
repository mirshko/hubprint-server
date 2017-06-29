// SETUP
// ================================================

const express    = require('express');
const app        = express();
const bodyParser = require('body-parser');
const axios      = require('axios');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 8080;

// ROUTES
// ================================================
const router = express.Router();

router.post('/', function(req, res) {
  const hapikey = req.body.hapikey;
  const subcategory = req.body.subcategory;
  const draft = req.body.draft;
  const limit = req.body.limit;

  axios.get(`https://api.hubapi.com/content/api/v2/pages?hapikey=${hapikey}&subcategory=${subcategory}&is_draft=${draft}&limit=${limit}`)
    .then((response) => {
      res.json(response.data.objects);
    })
    .catch((error) => {
      res.send(error.response);
    });
});

// REGISTER ROUTES
// ================================================
app.use('/printer', router);

// START SERVER
// ================================================
app.listen(port);
