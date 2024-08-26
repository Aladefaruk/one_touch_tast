/** @format */

import React from "react";
import { AvatarIcon } from "Assets/svgs";
import { useEffect, useState, useCallback } from "react";
import MkdSDK from "Utils/MkdSDK";
import { AuthContext } from "Context/Auth";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const ITEM_TYPE = "DASHBOARD_ROW";

const DraggableRow = ({ item, index, moveRow }) => {
  const [, ref] = useDrag({
    type: ITEM_TYPE,
    item: { index },
  });

  const [, drop] = useDrop({
    accept: ITEM_TYPE,
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveRow(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <div
      ref={(node) => ref(drop(node))}
      className="flex justify-between items-center p-2 border-2 border-[#1D1D1D] rounded-[16px] space-x-4 h-[96px] px-5 cursor-pointer"
    >
      <span className="flex items-center w-1/2 ">
        <span className="text-[14px] font-[100] text-[#666] ">
          {`${item.id < 10 ? "0" : ""}${index + 1}`}
        </span>
        <img
          className="w-[118px] h-[64px] mx-4 rounded-[8px]"
          src={item.photo}
        />
        <span className="text-[20px] font-[100] text-[#FFFFFF] pl-3 pr-1 w-2/3">
          {item.title}
        </span>
      </span>
      <div className="w-1/4 flex flex-start items-center">
        <img className="w-[24px] h-[24px] mr-2 rounded-full" src={item.photo} />
        <span className="text-[#DBFD51] text-[16px] font-[100] ">
          {item.username}
        </span>
      </div>
      <div className="flex items-center space-x-2">
        <span className="text-[16px] font-[100] text-[#FFFFFF]">
          {item.like}
          <span className="text-[#9BFF00] pl-2">↑</span>
        </span>
      </div>
    </div>
  );
};

const AdminDashboardPage = () => {
  const [pageData, setPageData] = useState(null);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const { dispatch } = React.useContext(AuthContext);

  const itemsPerPage = 10;
  const sdk = new MkdSDK();

  const handleNext = () => {
    if (page) {
      setPage((prevPage) =>
        Math.min(prevPage + 1, Math.floor(total / itemsPerPage))
      );
    } else setPage(1);
  };

  const handleBack = () => {
    if (page) {
      setPage((prevPage) => Math.max(prevPage - 1, 0));
    } else {
      setPage(0);
    }
  };

  const moveRow = useCallback(
    (fromIndex, toIndex) => {
      const updatedData = [...pageData];
      const [movedItem] = updatedData.splice(fromIndex, 1);
      updatedData.splice(toIndex, 0, movedItem);
      setPageData(updatedData);
    },
    [pageData]
  );

  const getPageData = async () => {
    setLoading(true);

    let body = {
      payload: {},
      page: page,
      limit: itemsPerPage,
    };
    sdk._table = "video";
    let response = await sdk.callRestAPI(body, "PAGINATE");
    console.log(response);
    setPageData(response?.list);
    setTotal(response?.total);
    setLoading(false);
  };

  const LogOut = () => {
    console.log("logout");
    dispatch({
      type: "LOGOUT",
    });
  };
  useEffect(() => {
    getPageData();
  }, [page]);

  return (
    <DndProvider backend={HTML5Backend}>
      <>
        {/* <div className="w-full flex justify-center items-center text-7xl h-screen text-gray-700 ">
        Dashboard
      </div> */}
        <div className="bg-black text-white px-14 py-7 space-y-4">
          <div className="flex justify-between items-center mb-20">
            <h1 className="text-[48px] text-[#FFFFFF] font-[900] font-bold ">
              APP
            </h1>
            <button
              className="bg-[#9BFF00] text-[#050505] font-[100] text-[16px] px-5 py-1.5 rounded-[40px] flex items-center"
              onClick={() => LogOut()}
            >
              <AvatarIcon fill="black" />
              <p className="ml-2">Logout</p>
            </button>
          </div>
          <div className="flex justify-between items-center">
            <h2 className="text-[40px] font-[100] text-[#FFFFFF]">
              Today's leaderboard
            </h2>
            <div className="flex items-center space-x-4 bg-[#1D1D1D] rounded-xl p-3 ">
              <span className="text-[16px] font-[100] text-[#FFFFFF]">
                30 May 2022
              </span>
              <span className="bg-[#696969] w-1 h-1 rounded-full"></span>
              <button className="bg-[#9BFF00] text-black px-3 py-1 rounded-[8px] text-sm">
                SUBMISSIONS OPEN
              </button>
              <span className="bg-[#696969] w-1 h-1 rounded-full"></span>
              <span className="text-[16px] font-[100] text-[#FFFFFF]">
                11:34
              </span>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between text-[16px] font-[100] text-[#666666] mt-7 px-5 ">
              <div className="flex items-center w-1/2">
                <p>#</p>
                <p className="pl-10">Title</p>
              </div>
              <p className="w-1/4 ml-8">Author</p>

              <div className="flex items-center">
                <p>Most liked</p>
                <p className="text-[#696969] pl-1">
                  <svg
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 1L5 5L9 1"
                      stroke="#696969"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </p>
              </div>
            </div>
          </div>
          {loading ? (
            <p className="px-10">loading...</p>
          ) : (
            pageData?.map((item, index) => (
              <DraggableRow
                key={item.id}
                item={item}
                index={index}
                moveRow={moveRow}
              />
            ))
          )}
        </div>

        <div className="p-4">
          <div className="flex justify-between mt-4 w-1/3 mx-auto">
            <button
              onClick={handleBack}
              className="bg-[#9BFF00] text-black px-4 py-2 rounded-md disabled:opacity-50"
              disabled={page === 0}
            >
              Back
            </button>
            <button
              onClick={handleNext}
              className="bg-[#9BFF00] text-black px-4 py-2 rounded-md disabled:opacity-50"
              disabled={page >= Math.floor(total / itemsPerPage)}
            >
              Next
            </button>
          </div>
        </div>
      </>
    </DndProvider>
  );
};

export default AdminDashboardPage;
