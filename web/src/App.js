import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import axios from "axios";
import { FaFilter } from "react-icons/fa6";

function App() {
  const [data, setData] = useState([]);
  const url = "http://localhost:5000/testcases";

  const fetchData = async () => {
    try {
      const response = await axios.get(url);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onStatusChangeHandler = async (event, id) => {
    const newStatus = event.target.value;
    try {
      await axios.put(`${url}/${id}`, { status: newStatus });
      // Update the local state to reflect the change
      setData(
        data.map((item) =>
          item.id === id ? { ...item, status: newStatus } : item
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#01193d] text-white">
      <div className="h-20 border-b border-white"></div>
      <div className="p-10">
        <div className="w-full flex items-center justify-center mb-5">
          <div className="w-full max-w-[500px] flex bg-[#012964] rounded-2xl">
            <input
              type="text"
              placeholder="Search Issues"
              className="w-full rounded-3xl px-5 py-3 bg-transparent outline-none"
            />
            <button className="px-5 py-2 rounded-2xl bg-[#e64aa1]">
              <CiSearch className="text-3xl" />
            </button>
          </div>
        </div>
        <div className="flex justfy-start mb-3">
          <div className="">
            <button className="flex items-center px-3 py-2 gap-2 bg-[#0a3773]">
              filter <FaFilter />
            </button>
          </div>
        </div>
        <div className="border border-gray-400 rounded-md overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="h-20">
                <th className="bg-[#0a3773] bg-opacity-80">Test Case Name</th>
                <th className="bg-[#0a3773] bg-opacity-80">Estimate Time</th>
                <th className="bg-[#0a3773] bg-opacity-80">Module</th>
                <th className="bg-[#0a3773] bg-opacity-80">Priority</th>
                <th className="bg-[#0a3773] bg-opacity-80">Status</th>
              </tr>
            </thead>

            <tbody>
              {data.length > 0 ? (
                data.map((item) => (
                  <tr key={item.id} className="text-center">
                    <td>
                      <div className="w-full p-5">
                        <div className="text-left mb-1">
                          <span>Test Case ID: {item.id}</span>
                        </div>
                        <div className="flex flex-col justify-between items-start bg-gray-500 h-20 p-1">
                          <span></span>
                          <span>
                            <small className="text-gray-300">
                              Last updated 5 mins ago
                            </small>
                          </span>
                        </div>
                      </div>
                    </td>
                    <td>{item.estimate_time}</td>
                    <td>{item.module}</td>
                    <td>{item.priority}</td>
                    <td>
                      <select
                        className="max-w-[150px] bg-transparent border px-2 py-1"
                        onChange={(event) =>
                          onStatusChangeHandler(event, item.id)
                        }
                        value={item.status}
                      >
                        <option value="PASS" className="bg-black">PASS</option>
                        <option value="FAIL" className="bg-black">FAIL</option>
                      </select>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-5">
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
