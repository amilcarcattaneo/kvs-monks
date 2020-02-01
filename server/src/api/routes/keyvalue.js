import KeyValueService from "../../services/KeyValueService";
import KeyvalueModel from "../../models/keyvalue";

const Get = async function(req, res, next) {
  const key = req.params.key;
  if (!key) {
    res.status(400).json({ details: "key is undefined" });
    return;
  }

  const keyvalueInstance = new KeyValueService(KeyvalueModel);
  const { value, err } = await keyvalueInstance.GetValue(key);

  if (err) {
    res.status(err.type).json({ details: err.error.message });
    return;
  }

  res.status(200).json({ value: value });
  return;
};

const Set = async function(req, res, next) {
  const key = req.body.key;
  if (!key) {
    res.status(400).json({ details: "key is undefined" });
    return;
  }
  const value = req.body.value;
  if (!value) {
    res.status(400).json({ details: "value is undefined" });
    return;
  }

  const keyvalueInstance = new KeyValueService(KeyvalueModel);
  const { err } = await keyvalueInstance.SetValue({ key, value });

  if (err) {
    res.status(err.type).json({ details: err.error.message });
    return;
  }

  res.status(201).json({ details: "success" });
  return;
};

export default { Get, Set };
