const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const csv = require('csv-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const cors = require('cors');
const app = express();


app.use(bodyParser.json());
app.use(cors())

const csvFilePath = './MOCK_DATA.csv'

app.get('/api/get-customers', async (req, res) => {
  const csv = require('csvtojson')
  const jsonArray = await csv().fromFile(csvFilePath);
  res.send(jsonArray);

});

app.put('/api/update-csv', (req, res) => {
  const results = [];
  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      res.setHeader('Content-Type', 'application/json');

      if (req.body.customer_name === null || req.body.customer_name === "" || req.body.customer_name === undefined) {
        res.status(500).send(JSON.stringify({ "result": "warning", "error": "Customer name is invalid" }));
        return;
      }

      if (req.body.address === null || req.body.address === "" || req.body.address === undefined) {
        res.status(500).send(JSON.stringify({ "result": "warning", "error": "Customer address is invalid" }));
        return;
      }

      const recordToUpdate = results.find((record) => record.id === req.body.id);

      if (recordToUpdate === undefined) {
        res.status(500).send(JSON.stringify({ "result": "warning", "error": "Invalid record to update" }));
        return;
      }

      if (recordToUpdate) {
        Object.assign(recordToUpdate, req.body);
      }

          const csvWriter = createCsvWriter({
            path: csvFilePath,
            header: [
              { id: 'id', title: 'id' },
              { id: 'customer_name', title: 'customer_name' },
              { id: 'purchase_date', title: 'purchase_date' },
              { id: 'active', title: 'active' },
              { id: 'directly_sold', title: 'directly_sold' },
              { id: 'address', title: 'address' },
              { id: 'tunning_date', title: 'tunning_date' },
              { id: 'brand', title: 'brand' },
              { id: 'model', title: 'model' },
              { id: 'type', title: 'type' },
              { id: 'email', title: 'email' }
            ]
          });

          csvWriter
            .writeRecords(results)
            .then(() => {
              res.setHeader('Content-Type', 'application/json');
              res.status(200).send(JSON.stringify({ "result": "success" }))
            })
            .catch((error) => {
              res.setHeader('Content-Type', 'application/json');
              res.status(500).send(JSON.stringify(error));
            });
        });
    });
});

app.post('/api/new-csv', (req, res) => {
  const record = req.body;
  const results = [];
  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {

      res.setHeader('Content-Type', 'application/json');

      if (req.body.customer_name === null || req.body.customer_name === "" || req.body.customer_name === undefined) {
        res.status(500).send(JSON.stringify({ "result": "warning", "error": "Customer name is invalid" }));
        return;
      }

      if (req.body.address === null || req.body.address === "" || req.body.address === undefined) {
        res.status(500).send(JSON.stringify({ "result": "warning", "error": "Customer address is invalid" }));
        return;
      }

      const existingRecord = results.find((record) => record.customer_name === req.body.customer_name);
      if (existingRecord !== undefined) {
        res.status(500).send(JSON.stringify({ "result": "warning", "error": "Cannot insert customer with same Username/Id" }));
        return;
      }
          const lastId = results.length > 0 ? parseInt(results[results.length - 1].id) : 0;
          const newId = lastId + 1;
          record.id = newId.toString();
          results.push(record);

          const csvWriter = createCsvWriter({
            path: csvFilePath,
            header: [
              { id: 'id', title: 'id' },
              { id: 'customer_name', title: 'customer_name' },
              { id: 'purchase_date', title: 'purchase_date' },
              { id: 'active', title: 'active' },
              { id: 'directly_sold', title: 'directly_sold' },
              { id: 'address', title: 'address' },
              { id: 'tunning_date', title: 'tunning_date' },
              { id: 'brand', title: 'brand' },
              { id: 'model', title: 'model' },
              { id: 'type', title: 'type' },
              { id: 'email', title: 'email' }
            ]

          });

          csvWriter
            .writeRecords(results)
            .then(() => {
              res.setHeader('Content-Type', 'application/json');
              res.status(200).send(JSON.stringify({ "result": "success" }))
            })
            .catch((error) => {
              res.setHeader('Content-Type', 'application/json');
              res.status(500).send(JSON.stringify(error));
            });
        });


    });
});


// Start the server
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server listening on port ${port}.`);
});
