import Price from '../mongodb/models/price.js';
import mongoose from 'mongoose';

const {ObjectId} = mongoose.Types;

export const getPrices = async (req, res) => {
  const {id} = req.params;
  const {startDay, endDay} = req.query;

  const startDate = new Date(`${startDay}T00:00:00.000Z`);
  const endDate = new Date(`${endDay}T23:59:59.999Z`);


  try {
    const prices = await Price.aggregate([
      {
        $match: {
          stationId: new ObjectId(id),
          updatedAt: {$gte: startDate, $lte: endDate},
        },
      },
      {$sort: {updatedAt: -1}},
      {
        $group: {
          _id: {
            e10: '$e10',
            super: '$super',
            diesel: '$diesel',
          },
          firstRecord: {$first: '$$ROOT'},
          lastRecord: {$last: '$$ROOT'},
          count: {$sum: 1},
        },
      },
      {
        $project: {
          records: {
            $cond: [
              {$eq: [ '$count', 1 ]},
              [ '$firstRecord' ],
              [ '$firstRecord', '$lastRecord' ],
            ],
          },
        },
      },
      {$unwind: '$records'},
      {$replaceRoot: {newRoot: '$records'}},
      {$sort: {updatedAt: 1}},
    ]);

    res.status(200).json({success: true, data: prices});
  } catch (error) {
    res.status(500).json({success: false, message: error});
  }
};

export const getAveragePrices = async (req, res) => {
  try{
    const response = await fetch('https://www.benzinpreis-aktuell.de/api.v2.php?data=nationwide');
    const price = await response.json();

    res.status(200).json({success: true, data: price});
  } catch (error) {
    res.status(500).json({success: false, message: error});
  }
}