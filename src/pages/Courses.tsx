import { useEffect, useState } from "react";
import Books from "../assets/images/books.jpg";
import { MdFilterListAlt } from "react-icons/md";
import { BsSearch } from "react-icons/bs";

const Courses = (props: any) => {
  const { socket, mode } = props;

  const [connected, setIsConnected] = useState<boolean>(false);
  const [data, setData] = useState<any>();
  const [showData, setShowData] = useState(false);
  useEffect(() => {
    socket.on("connect", () => {
      console.log("socket connected");
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    socket.on("response", (payload: any) => {
      console.log("payload in response: ", payload);
      setData(payload.message);
      setShowData(true);
    });
    // });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("response");
    };
  }, []);

  const handleChange = () => { };

  return (
    <>
      {console.log(data)}
      {!showData &&
        <div role="status" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <svg aria-hidden="true" className="w-24 h-24 text-gray-200 animate-spin dark:text-gray-600 fill-sky-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      }
      {showData && (
        <div className={`${mode === "dark" ? "text-white" : ""} flex justify-center items-center min-h-screen flex-col`}>
          <form className="flex items-center mt-5 mb-3 justify-end w-screen">
            <div className="relative w-1/5 mx-8">
              <input
                type="text"
                id="simple-search"
                className="text-black search outline-none rounded-[37px] block w-full py-4 px-8 h-[50px] border border-gray-300"
                placeholder="Search"
                onChange={handleChange}
                required
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 my-3 pointer-events-none">
                <BsSearch />
              </div>
            </div>
          </form>

          <div className="h-[200px] w-screen flex items-center">
            <div className="text-4xl font-medium min-w-[1024px] mx-auto">
              Search results for{" "}
              <span className="block bg-gray-200 rounded px-3 py-1 text-sm font-medium w-[95px] text-gray-700 mr-2 mb-2 mt-4">
                {data?.catalogue?.providers?.items?.length} courses
              </span>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4 max-w-screen-lg mt-8">
            <div className="col-span-1">
              <div className="font-bold flex items-center gap-2">
                <MdFilterListAlt />
                <div>Filter by</div>
              </div>
              <div className="bg-white border border-gray-300 rounded px-5 py-7 my-4"></div>
            </div>
            <div className="col-span-3">
              <div className="font-medium">
                Showing{" "}
                <span className="font-bold">
                  {data?.catalogue?.providers?.items?.length} courses
                </span>
              </div>
              {data?.catalogue?.providers?.items?.map((course: any) => (
                <div className="rounded overflow-hidden shadow-lg bg-white font-regular my-4 flex">
                  {course?.tags?.image ? (
                    <img
                      className="w-[200px]"
                      src={course?.tags?.image}
                      alt="Books"
                    />
                  ) : (
                    <img className="w-[200px]" src={Books} alt="Books" />
                  )}

                  <div>
                    <div className="px-6 py-4">
                      <div className="font-bold text-xl mb-2">
                        {course?.descriptor?.name}
                      </div>
                      <p className="text-gray-700 text-base">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Voluptatibus quia, nulla! Maiores et perferendis
                        eaque, exercitationem praesentium nihil.
                      </p>
                    </div>
                    <div className="px-6 pt-4 pb-2">
                      <span className="inline-block bg-red-200 rounded-full px-3 py-1 text-sm font-semibold text-red-700 mr-2 mb-2">
                        {course?.fulfilments?.type}
                      </span>
                      <span className="inline-block bg-yellow-200 rounded-full px-3 py-1 text-sm font-semibold text-yellow-700 mr-2 mb-2">
                        {course?.provider?.id}
                      </span>
                      <span className="inline-block bg-green-200 rounded-full px-3 py-1 text-sm font-semibold text-green-700 mr-2 mb-2">
                        {course?.price?.value} {course?.price?.currency}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Courses;
