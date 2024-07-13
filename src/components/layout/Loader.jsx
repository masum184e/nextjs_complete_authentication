import Image from "next/image";

const Loader = () => {
  return (
    <div className="flex justify-center items-center mt-60">
      <Image src="/images/loader.gif" alt="LOADER" width={1000} height={1000} />
    </div>
  );
};

export default Loader;
