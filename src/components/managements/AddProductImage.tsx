interface AddProductImageProps {
  thumbnail: string | undefined;
  images: string[] | undefined;
  setThumbnail: (value: string) => void;
  setImages: (value: string[] | undefined) => void;
}

const AddProductImage = ({
  thumbnail,
  images,
  setThumbnail,
  setImages,
}: AddProductImageProps) => {
  return (
    <div className="grid grid-cols-2 gap-2">
      <div>
        {thumbnail ? (
          <img
            src={thumbnail}
            alt="thumbnail"
            className="w-full aspect-square object-cover rounded-lg"
          />
        ) : (
          <div className="w-full aspect-square bg-gray-200 rounded-lg flex justify-center items-center">
            <svg
              className="w-28 h-28 text-gray-400"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M12 4a1 1 0 011 1v6h6a1 1 0 110 2h-6v6a1 1 0 11-2 0v-6H5a1 1 0 110-2h6V5a1 1 0 011-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
        )}
      </div>
      <div className="grid grid-cols-3 gap-2">
        {images?.map((image, index) => (
          <img
            key={index}
            src={image}
            alt="image"
            className="aspect-square object-cover rounded-lg"
          />
        ))}
        {Array.from(Array(3 - (images?.length || 0)).keys()).map((index) => (
          <div
            key={index}
            className="aspect-square bg-gray-100 rounded-lg flex justify-center items-center"
          ></div>
        ))}
        {(thumbnail || !!images?.length) && (
          <div className="aspect-square bg-gray-200 rounded-lg flex justify-center items-center">
            <svg
              className="w-full h-full text-gray-400"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M12 4a1 1 0 011 1v6h6a1 1 0 110 2h-6v6a1 1 0 11-2 0v-6H5a1 1 0 110-2h6V5a1 1 0 011-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddProductImage;
