import Price from '../mongodb/models/price.js';


export const getPrices = async (req, res) => {
  const {id} = req.params;

  try {
    const prices = await Price.find({stationId: id});
    res.status(200).json({success: true, data: prices});
  } catch (error) {
    res.status(500).json({success: false, message: error});
  }
};