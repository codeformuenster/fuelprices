import mongoose from 'mongoose';

const Station = new mongoose.Schema({
  address: {type: String, required: true},
  name: {type: String, required: true},
  cityId: { type: mongoose.Schema.Types.ObjectId, ref: "cities" },
  marketTransparencyId: {type: String, required: true},
  location: {
    type: {
      type: String,
      enum: [ 'Point' ],
      required: true
    },
    coordinates: {
      type: [ Number ], // [longitude, latitude]
      required: true
    }
  }
}, {
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      ret.id = ret._id;
      delete ret._id;
    }
  }
});

Station.index({ location: "2dsphere" });

const StationSchema = mongoose.model('stations', Station);

export default StationSchema;