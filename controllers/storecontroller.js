const mobile = require("../modals/mobile");

const addMobileDevice = (req, res, next) => {
  try {
    const { brand, device, price, quantity } = req.body;
    const newMobile = new mobile({
      brand: brand,
      device: device,
      price: price,
      quantity: quantity,
    });
    newMobile.save((err, data) => {
      if (err) {
        return res.status(400).json({ msg: "Entry failed!" });
      } else {
        return res.status(201).json({ msg: "Entry added" });
      }
    });
  } catch (err) {
    next(err);
  }
};

const getMobileDevice = async (req, res, next) => {
  try {
    let result = await mobile.find();
    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

const updateMobileDevice = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { brand, device, price, quantity } = req.body;
    const newMobile = {};

    newMobile.brand = brand;
    newMobile.device = device;
    newMobile.price = price;
    newMobile.quantity = quantity;
    let result = await mobile.findOneAndUpdate({ _id: id }, newMobile, { new: true, runValidators: true });
    if (!result) {
      return res.status(500).json({ msg: "Can't update product!"});
    }
    return res.status(200).json({ msg: "resource updated successfully"});
  } catch (err) {
    next(err);
  }
};

const deleteMobileDevice = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await mobile.deleteOne({ _id: id })
    if (result.deletedCount) {
      return res.status(200).json({ msg: "resource deleted successfully"});
    }
    return res.status(500).json({ msg: "Can't delete product"});
  } catch(err) {
    next(err);
  }
}

module.exports = {
  addMobileDevice, 
  getMobileDevice, 
  updateMobileDevice,
  deleteMobileDevice
};
