import { useState } from "react";
import { Attribute } from "../../services/types";

interface AddAttributeValueProps {
  attribute: Attribute;
  setAttribute: (value: Attribute) => void;
}
const AddAttributeValue = ({
  attribute,
  setAttribute,
}: AddAttributeValueProps) => {
  const [attributeValue, setAttributeValue] = useState("");
  return (
    <>
      {attribute.values.map((value, index) => (
        <div
          className="ml-10 bg-gray-100 px-2 rounded-md flex justify-between items-center"
          key={index}
        >
          <span>{value}</span>
          <button
            className="p-2 rounded-md text-sm text-red-500 font-semibold"
            type="button"
            onClick={() => {
              setAttribute({
                ...attribute,
                values: attribute.values.filter((v) => v !== value),
              });
            }}
          >
            Remove
          </button>
        </div>
      ))}
      <div className="flex ml-10 gap-2">
        <input
          type="text"
          value={attributeValue}
          onChange={(e) => setAttributeValue(e.target.value)}
          className="w-full p-2 text-sm border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white"
          placeholder="Attribute value"
        />
        <button
          className="p-2 rounded-md bg-blue-500 text-white"
          type="button"
          onClick={() => {
            if (!attributeValue) return;
            setAttribute({
              ...attribute,
              values: [...attribute.values, attributeValue],
            });
            setAttributeValue("");
          }}
        >
          Add
        </button>
      </div>
    </>
  );
};

interface AddAttributeProps {
  attributes: Attribute[] | undefined;
  setAttributes: (value: Attribute[]) => void;
}
const AddAttribute = ({ attributes, setAttributes }: AddAttributeProps) => {
  const [attributeName, setAttributeName] = useState("");

  const setAttribute = (value: Attribute) => {
    if (!attributes) return;

    const index = attributes?.findIndex((a) => a.name === value.name);

    if (index === -1 || index === undefined) return;

    const newAttributes = [...attributes];
    newAttributes[index] = value;
    setAttributes(newAttributes);
  };

  return (
    <>
      <div className="grid grid-cols-2">
        {attributes?.map((attribute, index) => (
          <div key={index} className="w-full flex flex-col gap-2">
            <div className="ml-4 bg-gray-100 px-2 rounded-md flex justify-between items-center">
              <label>{attribute.name}</label>
              <button
                className=" rounded-md p-2 font-semibold text-red-500 text-sm"
                type="button"
                onClick={() => {
                  setAttributes(
                    attributes?.filter((a) => a.name !== attribute.name)
                  );
                }}
              >
                Remove
              </button>
            </div>
            <AddAttributeValue
              attribute={attribute}
              setAttribute={setAttribute}
            />
          </div>
        ))}
      </div>
      <div className="flex gap-2 mt-2 ml-4">
        <input
          type="text"
          value={attributeName}
          onChange={(e) => setAttributeName(e.target.value)}
          className="w-full p-2 text-sm border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white"
          placeholder="Attribute name"
        />
        <button
          className="px-2 py-1 rounded-md bg-blue-500 text-white"
          type="button"
          onClick={() => {
            if (!attributeName) return;
            setAttributes([
              ...(attributes || []),
              {
                name: attributeName,
                values: [],
              },
            ]);
            setAttributeName("");
          }}
        >
          Add
        </button>
      </div>
    </>
  );
};

export default AddAttribute;
