import validator from "validator";
import db from "./db";

const validate = async (validation, element) => {
  const validations = {};
  const validationKeys = Object.keys(validation);

  for (
    let elementIndex = 0;
    elementIndex < validationKeys.length;
    elementIndex++
  ) {
    const elementKey = validationKeys[elementIndex];
    const validationElement = [];
    const rules = validation[elementKey];
    const rulesArray = rules.split(",");
    for (let ruleIndex = 0; ruleIndex < rulesArray.length; ruleIndex++) {
      const rule = rulesArray[ruleIndex];
      //SPECIAL RULE THAT VERIFY IF ELEMENT EXISTS ON DB
      if (rule.includes("exists")) {
        const [, elementType] = rule.split("|");

        if (!element[elementKey] || element[elementKey] === "") {
          // validationElement.push("Id can't be empty");
          continue;
        }
        const findObject =
          elementType && elementType !== ""
            ? { _id: element[elementKey], elementType: elementType }
            : { _id: element[elementKey] };
        const result = await db.find({
          selector: findObject
        });
        if (result.docs.length === 0) {
          validationElement.push("Not found");
          continue;
        }
      }

      switch (rule) {
        case "required":
          if (element[elementKey] === undefined)
            validationElement.push("Can't be undefined");
          break;
        case "notempty":
          if (!element[elementKey] || validator.isEmpty(element[elementKey]))
            validationElement.push("Can't be empty");
          break;
        default:
          break;
      }
    }
    if (validationElement.length) validations[elementKey] = validationElement;
  }

  return Promise.resolve(validations);
};

export default validate;
