const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
  couponCode: {
    type: String,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  expDate: {
    type: String,
    required: true,
  },
  minPurAmt: {
    type: Number,
    required: true,
  },
  maxPurAmt: {
    type: Number,
  },
  usedUsers: [{ type: String }],
  status: {
    type: Boolean,
    default: 'active',
  },
});

export const Coupon = mongoose.model('Coupon', couponSchema);
