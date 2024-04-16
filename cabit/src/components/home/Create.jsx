import React, { useState } from "react";
import axios from "axios";
import { IoMdArrowRoundBack } from "react-icons/io";
import { TiTickOutline } from "react-icons/ti";
import { FaRegSquare } from "react-icons/fa";
import { MdOutlineCheckBox } from "react-icons/md";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const [selectedColor, setSelectedColor] = useState("");
  const [title, setTitle] = useState("");
  const [repeatMode, setRepeatMode] = useState("daily");
  const [selectedDays, setSelectedDays] = useState([]);
  const [reminder, setReminder] = useState(true);
  const navigate = useNavigate();

  const colors = [
    "#FF5733", // Red
    "#FFD700", // Gold
    "#5D76A9",
    "#1877F2", // Medium Purple
    "#32CD32", // Lime Green
    "#CCCCFF", // Tomato
    "#4169E1", // Royal Blue
  ];
  const days = [
    { label: "M", value: "Monday" },
    { label: "T", value: "Tuesday" },
    { label: "W", value: "Wednesday" },
    { label: "T", value: "Thursday" },
    { label: "F", value: "Friday" },
    { label: "S", value: "Saturday" },
    { label: "S", value: "Sunday" },
  ];

  const addHabit = async () => {
    try {
      const habitDetails = {
        title: title,
        color: selectedColor,
        repeatMode: repeatMode,
        days: selectedDays,
        reminder: reminder,
      };

      const response = await axios.post(
        "https://cabbit-sarthak-kambles-projects.vercel.app/habits",
        habitDetails
      );

      if (response.status === 200) {
        setTitle("");
        setSelectedColor("");
        setRepeatMode("daily");
        setSelectedDays([]);
        setReminder(true);
        alert("Habit added successfully. Enjoy Practising!");
        navigate(-1);
      }

      console.log("habit added", response);
    } catch (error) {
      console.log("error adding a habit", error);
    }
  };

  return (
    <React.Fragment>
      <div className="flex flex-row justify-start items-center mx-[1%] my-[1%] text-2xl font-bold ">
        <IoMdArrowRoundBack />
      </div>
      <div className="text-xl font-medium mx-[7%]">Create Habit:</div>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter Habit Name"
        className="border-2 border-gray-300 rounded-lg w-[70%] h-[40px] mx-[15%] my-[1%] px-[10px]"
      />
      <div className="text-xl font-medium mx-[7%]">Pick Your Color:</div>
      <div className="flex flex-row justify-center items-center w-[70%] h-[40px] mx-[15%] my-[1%] px-[10px]">
        {colors?.map((item, index) => (
          <div
            key={index}
            className="w-[30px] h-[30px] mx-[5px]"
            style={{ backgroundColor: item }}
            onClick={() => setSelectedColor(item)}
          >
            {selectedColor === item ? (
              <TiTickOutline className="w-[30px] h-[30px]" />
            ) : (
              <FaRegSquare
                className="w-[30px] h-[30px]"
                style={{ color: item }}
              />
            )}
          </div>
        ))}
      </div>
      <div className="text-xl font-medium mx-[7%]">Repeat:</div>
      <div className="flex flex-row justify-center items-center w-[70%] h-[40px] mx-[15%] my-[1%] px-[10px] gap-3">
        <div
          className="flex justify-center items-center w-[50%] h-[45px] rounded-md text-xl font-semibold"
          style={{
            backgroundColor: repeatMode === "daily" ? "#AFDBF5" : "#F0F0F0",
          }}
          onClick={() => setRepeatMode("daily")}
        >
          Daily
        </div>
        <div
          className="flex justify-center items-center w-[50%] h-[45px] rounded-md text-xl font-semibold"
          style={{
            backgroundColor: repeatMode === "weekly" ? "#AFDBF5" : "#F0F0F0",
          }}
          onClick={() => setRepeatMode("weekly")}
        >
          Weekly
        </div>
      </div>
      <div className="text-xl font-medium mx-[7%]">On these days:</div>
      <div className="flex flex-row justify-center items-center w-[70%] h-[40px] mx-[15%] my-[1%] px-[10px] gap-6">
        {days?.map((item, index) => (
          <div
            key={index}
            className=" px-[10px] py-[3px] text-lg font-semibold rounded-md cursor-pointer"
            style={{
              backgroundColor: selectedDays.includes(item.value)
                ? "#AFDBF5"
                : "#E0E0E0",
            }}
            onClick={() =>
              setSelectedDays((prevDays) =>
                prevDays.includes(item.value)
                  ? prevDays.filter((day) => day !== item.value)
                  : [...prevDays, item.value]
              )
            }
          >
            <div>{item.label}</div>
          </div>
        ))}
      </div>
      <div>
        <div
          onClick={() => {
            setReminder(!reminder);
          }}
          className="cursor-pointer text-xl font-medium mx-[7%] flex flex-row justify-start items-center "
        >
          Reminder:{" "}
          {reminder ? (
            <MdOutlineCheckBox className="w-[30px] h-[30px] mx-[1%]" />
          ) : (
            <MdOutlineCheckBoxOutlineBlank className="w-[30px] h-[30px] mx-[1%]" />
          )}
        </div>
      </div>
      <button 
        onClick={addHabit}
        className="w-[70%] h-[40px] mx-[15%] my-[1%] px-[10px] text-xl font-semibold text-white bg-blue-500 rounded-lg"
       >Save</button>
    </React.Fragment>
  );
};

export default Create;
