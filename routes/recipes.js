var recipes = require('../recipes.json');
var router = require('express').Router();


// Get method for returning ingredients based on ids
router.get('/shopping-list', function (req, res, next) {
    try {
      let ids = req.query.ids;
      let resultArray = [];
  
      if (!ids) {
        res.status(400).send({ "Status Code": 400, Body: "ids are required" });
      }
      else {
        let inputArray = ids.split(',');
        for (let i = 0; i < inputArray.length; i++) {
          let obj = recipes.filter(x => x.id === Number(inputArray[i]))[0];
          if (obj != undefined) {
            resultArray.push(obj)
          }
        }
  
        if (resultArray.length === 0) {
          res.status(404).send({ "Status Code": 404, Body: "NOT_FOUND" });
        }
        else {
          res.status(200).send({ "Status Code": 200, Body: resultArray });
        }
      }
    }
    catch (e) {
      res.status(400).send({ "Status Code": 400, Body: e.message });
    }
  });
  
module.exports = router;

