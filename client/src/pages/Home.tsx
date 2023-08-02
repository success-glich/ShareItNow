import { useState } from "react";
import DropZone from "../components/DropZone/DropZone";

const Home = () => {
  const [file, setFile] = useState<null | File>(null);
  console.log(file);
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="my-4 text-3xl font-medium">Got a File? Share It Now 📁</h1>
      <div className="w-96 flex flex-col items-center bg-gray-800 shadow-xl rounded-xl justify-center">
        <DropZone setFile={setFile} />
        {file?.name}
      </div>
    </div>
  );
};

export default Home;
