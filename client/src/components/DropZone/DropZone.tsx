import { useCallback } from "react";
import {
  useDropzone,
  FileWithPath,
  FileRejection,
  DropEvent,
} from "react-dropzone";
import folderIMg from "../../assets/images/folder.png";
const DropZone: React.FC<{ setFile: React.Dispatch<any> }> = ({ setFile }) => {
  const onDrop = useCallback(
    (
      acceptedFiles: FileWithPath[],
      fileRejections: FileRejection[],
      event: DropEvent
    ) => {
      console.log(acceptedFiles);
      // Do something with files
      setFile(acceptedFiles[0]);
    },
    []
  );
  const { getRootProps, getInputProps, isDragAccept, isDragReject } =
    useDropzone({
      onDrop,
      multiple: false,
      accept: {
        "image/png": [".png"],
        "image/jpeg": [".jpeg"],
        "audio/mpeg": [".mpeg"],
      },
    });
  return (
    <div>
      <div
        {...getRootProps()}
        className="h-80 w-full rounded-md cursor-pointer focus:outline-none "
      >
        <input {...getInputProps()} />
        <div
          className={
            `flex flex-col items-center justify-center border-2 border-dashed border-yellow-light rounded-xl h-full space-y-3 ` +
            (isDragReject === true ? "border-red-500" : "") +
            (isDragAccept === true ? "border-green-500" : "")
          }
        >
          <img src={folderIMg} alt="folder Image" className="w-16 h-16" />
          {isDragReject ? (
            <p>Sorry, This app only supports images and mp3</p>
          ) : (
            <>
              <p>Drag & Drop Files Here</p>
              <p className="mt-2 text-base text-gray-300">
                Only png, jpeg & mp3 files supported
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DropZone;
