export default class KeyValueService {
  constructor(keyvalueModel) {
    this.keyvalueModel = keyvalueModel;
  }

  async GetValue(key) {
    let keyvalue = await this.keyvalueModel.findOne({ key: key });
    if (!keyvalue) {
      return {
        value: null,
        err: { type: 404, error: new Error("key not found") }
      };
    }

    return { value: keyvalue.value, err: null };
  }

  async SetValue(keyvalue) {
    let response = await this.keyvalueModel.updateOne(
      { key: keyvalue.key },
      { value: keyvalue.value },
      { upsert: true }
    );
    if (!response) {
      return { err: { type: 500, error: new Error("key-value not saved") } };
    }

    return { err: null };
  }
}
