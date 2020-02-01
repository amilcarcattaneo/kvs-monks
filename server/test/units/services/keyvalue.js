import expect from "expect.js";

import KeyValueService from "../../../src/services/KeyValueService";

describe("KeyValue Service Unit Tests", () => {
  describe("GetKey", () => {
    it("Should return one value", async () => {
      const keyvalueModel = {
        findOne: key => {
          return {
            ...key,
            value: "monks🐵"
          };
        }
      };

      const inputKey = "media";
      const keyvalueService = new KeyValueService(keyvalueModel);
      const value = await keyvalueService.GetValue(inputKey);

      expect(value).to.be.ok();
      expect(value.value).to.be.eql("monks🐵");
      expect(value.err).to.be.eql(null);
    });
    it("Should return not found", async () => {
      const keyvalueModel = {
        findOne: key => {
          return null;
        }
      };

      const inputKey = "monks";
      const keyvalueService = new KeyValueService(keyvalueModel);
      const keyvalue = await keyvalueService.GetValue(inputKey);

      expect(keyvalue.err.type).to.be.eql(404);
      expect(keyvalue.err.error.message).to.be.eql("key not found");
      expect(keyvalue.value).to.be.eql(null);
    });
  });

  describe("SetKey", () => {
    it("Should set successfully", async () => {
      const keyvalueModel = {
        updateOne: () => {
          return { success: true };
        }
      };

      const inputkeyvalue = {
        key: "media",
        value: "monks🐵"
      };
      const keyvalueService = new KeyValueService(keyvalueModel);
      const response = await keyvalueService.SetValue(inputkeyvalue);

      expect(response.err).to.be.eql(null);
    });
    it("Should return an error", async () => {
      const keyvalueModel = {
        updateOne: () => {
          return null;
        }
      };

      const inputkeyvalue = {
        key: "media",
        value: "monks🐵"
      };
      const keyvalueService = new KeyValueService(keyvalueModel);
      const response = await keyvalueService.SetValue(inputkeyvalue);

      expect(response.err.type).to.be.eql(500);
      expect(response.err.error.message).to.be.eql("key-value not saved");
    });
  });
});
