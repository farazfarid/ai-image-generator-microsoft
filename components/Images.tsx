"use client";

import useSWR from "swr";
import fetchImages from "../lib/fetchImages";

export const dynamic = "force-dynamic";

type ImageType = {
  name: string;
  url: string;
};

function Images() {
  const {
    data: images,
    isLoading,
    mutate: refreshImages,
    isValidating,
  } = useSWR("images", fetchImages, {
    revalidateOnFocus: false,
  });

  console.log("images", images);

  return (
    <div>
      <button
        onClick={() => {
          refreshImages(images);
        }}
        className="fixed bottom-10 right-10 bg-sky-400/90 text-white px-5 py-3 rounded-md hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-400 font-bold z-20"
      >
        <p>{!isLoading && isValidating ? "Refreshing..." : "Refresh Images"}</p>
      </button>
      {isLoading && (
        <p className="animate-pulse text-center pb-7 font-extralight">
          Loading <span className="text-sky-300">AI</span> Generated Images ...
        </p>
      )}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 px-0 md:px-10">
        {images?.imageURLs?.map((image: ImageType, i: number) => (
          <div
            key={image.name}
            className={`relative cursor-pointer ${
              i === 0 && "md:col-span-2 md:row-span-2"
            } hover:scale-[103%] transition-transform duration-200 ease-in-out`}
          >
            <a
              className="absolute flex justify-center items-center w-full h-full bg-white opacity-0 hover:opacity-80 transition-opacity duration-200 z-10"
              href={image.url}
            >
              <p className="text-center font-light text-lg p-5">
                {image.name.split("_").shift()?.toString().split(".").shift()}
              </p>
            </a>
            <img
              src={image.url}
              alt={image.name}
              height={800}
              width={800}
              className="w-full rounded-sm shadow-2xl drop-shadow-lg -z-10"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Images;
