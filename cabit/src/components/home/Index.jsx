import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import { FaRegCircle } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { MdLogout } from "react-icons/md";

const Index = () => {
  const [option, setOption] = useState("Today");
  const navigate = useNavigate();
  const [habits, setHabits] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedHabit, setSelectedHabit] = useState();
  const location = useLocation();
  // console.log("Data" , location.state);
  // console.log("habits", habits);
  const currentDay = new Date()
    .toLocaleDateString("en-US", { weekday: "short" })
    .slice(0, 3);

  useEffect(() => {
    fetchHabits();
  });

  const fetchHabits = async () => {
    try {
      const response = await axios.get("http://192.168.64.1:3000/habitslist");
      setHabits(response.data);
    } catch (error) {
      console.log("error fetching habits", error);
    }
  };

  const handleLongPress = (habitId) => {
    const selectedHabit = habits?.find((habit) => habit._id == habitId);
    setSelectedHabit(selectedHabit);
    setModalVisible(true);
  };

  const handleCompletion = async () => {
    try {
      if (!selectedHabit) {
        console.error("No habit selected");
        return;
      }
      const habitId = selectedHabit?._id;
      const updatedCompletion = {
        ...selectedHabit?.completed,
        [currentDay]: true,
      };

      await axios.put(`http://192.168.64.1:3000/habits/${habitId}/completed`, {
        completed: updatedCompletion,
      });

      await fetchHabits();

      setModalVisible(false);
    } catch (error) {
      console.log("error", error);
    }
  };

  const deleteHabit = async () => {
    try {
      if (!selectedHabit) {
        console.error("No habit selected");
        return;
      }
      const habitId = selectedHabit._id;

      const response = await axios.delete(
        `http://192.168.64.1:3000/habits/${habitId}`
      );

      setHabits((prevHabits) =>
        prevHabits.filter((habit) => habit._id !== habitId)
      );
      console.log("Habit Deleted successfully");
    } catch (error) {
      console.log("error", error);
    }
  };

  const getCompletedDays = (completedObj) => {
    if (completedObj && typeof completedObj === "object") {
      return Object.keys(completedObj).filter((day) => completedObj[day]);
    }

    return [];
  };

  const filteredHabits =
    habits?.length > 0
      ? habits.filter((habit) => {
          return !habit.completed || !habit.completed[currentDay];
        })
      : [];
  // console.log("filtered habbits", habits);
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return (
    <React.Fragment>
      <div className="mt-[1%] flex flex-row items-center justify-between px-[10px]">
        <div>Logo</div>
        <div className="flex flex-row">
          Welcome,{" "}
          <div className="font-bold ml-2"> {location?.state?.username}</div>
        </div>
        <div className="flex flex-row items-center gap-3" >
          <MdLogout onClick={() => navigate("/")} className="text-2xl" />
          <div onClick={() => navigate("/create")}>
            <FaPlus className="text-2xl border-2 border-black rounded-full p-[5px] " />
          </div>
        </div>
      </div>
      <div className=" flex flex-row justify-center items-center text-4xl font-semibold">
        Habits
      </div>
      <div className="flex flex-row justify-center items-center gap-12 mt-[1%]">
        <button
          onClick={() => setOption("Today")}
          className={
            option == "Today"
              ? "bg-slate-100 border-2 border-slate-300 px-[10px] py-[3px] rounded-full text-xl font-semibold"
              : "text-xl font-semibold"
          }
        >
          Today
        </button>
        <button
          onClick={() => setOption("Weekly")}
          className={
            option == "Weekly"
              ? "bg-slate-100 border-2 border-slate-300 px-[10px] py-[3px] rounded-full text-xl font-semibold"
              : "text-xl font-semibold"
          }
        >
          Weekly
        </button>
        <button
          onClick={() => setOption("Overall")}
          className={
            option == "Overall"
              ? "bg-slate-100 border-2 border-slate-300 px-[10px] py-[3px] rounded-full text-xl font-semibold"
              : "text-xl font-semibold"
          }
        >
          Overall
        </button>
      </div>

      {option == "Today" &&
        (filteredHabits?.length > 0 ? (
          <div className="flex flex-col justify-center items-center">
            {filteredHabits?.map((item, index) => (
              <div className="w-[60%] flex flex-row justify-center items-center gap-3 ">
                <div
                  onClick={() => {
                    handleLongPress(item._id);
                  }}
                  className=" w-[60%] flex justify-center items-center m-[10px] py-[15px] text-xl font-bold rounded-full"
                  style={{ backgroundColor: item?.color }}
                >
                  {item?.title}
                </div>
                <button
                  onClick={handleCompletion}
                  className="bg-slate-300 rounded-full items-center border-2 border-slate-500 px-[7px] py-[2px]"
                >
                  Mark Complete
                </button>
                <button
                  onClick={deleteHabit}
                  className="bg-slate-300 rounded-full items-center border-2 border-slate-500 px-[7px] py-[2px]"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center mt-[5%] ">
            <img
              className="w-[10%] h-[10%]"
              src="https://cdn-icons-png.flaticon.com/128/10609/10609386.png"
              alt=""
            />
            <div className="text-2xl font-bold">No habits for today</div>
            <div className="text-xl font-semibold">Create one?</div>
          </div>
        ))}

      {option == "Weekly" && (
        <div className="flex flex-col justify-center items-center">
          {habits?.map((habit, index) => (
            <div
              style={{ backgroundColor: habit.color }}
              className="cursor-pointer w-[50%] py-[10px] my-[10px] rounded-full"
            >
              <div className="flex flex-row justify-between items-center px-[25px]">
                <div>{habit?.title}</div>
                <div>{habit?.repeatMode}</div>
              </div>
              <div className="flex flex-row justify-evenly">
                {days?.map((day, item) => {
                  const isCompleted = habit.completed && habit.completed[day];
                  return (
                    <div>
                      <div className="mb-[5px]">{day}</div>
                      {isCompleted ? (
                        <FaRegCircle className="text-white bg-white text-lg rounded-full" />
                      ) : (
                        <FaRegCircle className="text-white bg-transparent text-lg rounded-full" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {option === "Overall" && (
        <div className="flex flex-col justify-center items-center mx-[25%]">
          {habits?.map((habit, index) => (
            <>
              <div
                key={index}
                className="flex flex-row w-[100%] justify-between items-center px-[20px] py-[10px] my-[5px] rounded-full cursor-pointer text-base font-semibold "
                style={{ backgroundColor: habit.color }}
              >
                <div>{habit.title}</div>
                <div className="text-white first-letter:capitalize">
                  {habit.repeatMode}
                </div>
              </div>
              <div className="flex flex-row justify-between w-[100%] px-[20px] font-medium ">
                <div>Completed on</div>
                <div>{getCompletedDays(habit.completed).join(", ")}</div>
              </div>
            </>
          ))}
        </div>
      )}
    </React.Fragment>
  );
};

export default Index;
