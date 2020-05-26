/**
 * @file VueComponentsLoader options JSON schema
 */
const schema = {
  type: "object",
  properties: {
    paths: {
      type: "array",
      items: {
        anyOf: [
          {
            type: "string"
          },
          {
            type: "object",
            properties: {
              path: {
                type: "string"
              },
              prefix: {
                type: "string"
              },
              ignore: {
                anyOf: [
                  {
                    type: "string"
                  },
                  {
                    type: "array",
                    items: {
                      type: "string"
                    }
                  }
                ]
              }
            },
            required: ["path"]
          }
        ]
      }
    }
  },
  additionalProperties: false
};

module.exports = schema;
