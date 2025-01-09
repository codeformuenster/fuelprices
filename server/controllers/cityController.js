import City from '../mongodb/models/city.js';

export const getCityList = async (req, res) => {
  try {
    const cities = await City.find({});

    res.status(200).json({success: true, data: cities});
  } catch (error) {
    res.status(500).json({success: false, message: error});
  }
}