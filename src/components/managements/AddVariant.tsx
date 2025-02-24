import { useMemo } from "react";
import { Attribute, Variant } from "../../services/types";

interface AddVariantProps {
  variant: Variant;
  setVariant: (value: Variant) => void;
}
const AddVariant = ({ variant, setVariant }: AddVariantProps) => {
  const keys = useMemo(() => {
    const keys = Object.keys(variant);
    return keys.filter((key) => !["price", "hot_price", "image"].includes(key));
  }, [variant]);
  return (
    <div className="grid grid-cols-1 gap-1">
      {keys.map((key, index) => (
        <div className="w-full flex justify-between" key={index}>
          <span>{key}</span>
          <input
            type="text"
            className=" p-2 text-sm border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white"
            value={variant[key]}
            disabled
            onChange={(e) => setVariant({ ...variant, [key]: e.target.value })}
          />
        </div>
      ))}
      <div className="w-full flex justify-between">
        <span>Image</span>
        <div className="w-10 h-10 rounded-sm">
          {variant.image ? (
            <img src={variant.image} alt="variant" />
          ) : (
            <div className="w-full h-full rounded-md flex justify-center items-center cursor-pointer bg-gray-200">
              <span className="text-lg">+</span>
            </div>
          )}
        </div>
      </div>
      <div className="w-full flex justify-between">
        <span>Price</span>
        <input
          type="text"
          className=" p-2 text-sm border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white"
          value={variant.price?.toString() || ""}
          onChange={(e) => {
            if (isNaN(Number(e.target.value))) return;
            setVariant({ ...variant, price: Number(e.target.value) });
          }}
        />
      </div>
      <div className="w-full flex justify-between">
        <span>Hot price</span>
        <input
          type="text"
          className=" p-2 text-sm border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white"
          value={variant.hot_price?.toString() || ""}
          onChange={(e) => {
            if (isNaN(Number(e.target.value))) return;
            setVariant({ ...variant, hot_price: Number(e.target.value) });
          }}
        />
      </div>
    </div>
  );
};

interface AddVariantsProps {
  attributes: Attribute[] | undefined;
  variants: Variant[] | undefined;
  setVariants: (value: Variant[] | undefined) => void;
}
const AddVariants = ({
  variants,
  setVariants,
  attributes,
}: AddVariantsProps) => {
  const variantList = useMemo(() => {
    if (!attributes || attributes.length === 0) return {};

    const _variants = attributes.reduce(
      (acc, attr) => {
        const newLists: any[] = [];
        attr.values.forEach((value: any) => {
          acc.forEach((list: any) => {
            newLists.push({ ...list, [attr.name]: value });
          });
        });
        return newLists;
      },
      [{}]
    );

    const values = _variants.reduce(
      (result: Record<string, any>, item: any) => {
        const key = Object.values(item).join("-");
        result[key] = item;
        return result;
      },
      {}
    );
    console.log(variants);

    variants?.forEach((item) => {
      const { price, hot_price, image, ...other } = item;
      const key = Object.values(other).join("-");
      if (values[key])
        values[key] = { price, hot_price, image, ...values[key] };
    });
    return values;
  }, [attributes, variants]);

  return (
    <div className="grid grid-cols-2 gap-2">
      {Object.keys(variantList).map((variantKey) => (
        <div key={variantKey} className=" p-2 bg-gray-100 rounded-md">
          <AddVariant
            variant={variantList[variantKey]}
            setVariant={(value) => {
              if (!variants) return;
              variantList[variantKey] = value;

              setVariants([...Object.values(variantList)]);
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default AddVariants;
