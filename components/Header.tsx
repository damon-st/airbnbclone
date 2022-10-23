import Image from "next/image";
import {
  SearchIcon,
  GlobeAltIcon,
  MenuIcon,
  UserCircleIcon,
  UsersIcon,
} from "@heroicons/react/solid";
import { useState } from "react";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";
import type { RangeKeyDict } from "react-date-range";
import { es } from "date-fns/locale";
import { useRouter } from "next/router";
interface Props {
  placeHolder?: string;
}
export default function Header({ placeHolder }: Props) {
  const [searchInput, setSearchInput] = useState("");
  const [starDate, setStarDate] = useState(new Date());
  const [endDate, setendDate] = useState(new Date());
  const [noOfGuests, setNoOfGuests] = useState(1);
  const router = useRouter();
  const selectionRage = {
    startDate: starDate,
    endDate: endDate,
    key: "selection",
  };

  const handleSelect = (ranges: RangeKeyDict) => {
    if (ranges.selection.startDate != null) {
      setStarDate(ranges.selection.startDate);
      setendDate(ranges.selection.endDate!);
    }
  };

  const resetInput = () => {
    setSearchInput("");
  };

  const search = () => {
    router.push({
      pathname: "/search",
      query: {
        location: searchInput,
        startDate: starDate.toISOString(),
        endDate: endDate.toISOString(),
        noOfGuests,
      },
    });
  };

  return (
    <header
      className="sticky top-0 z-50 
    grid grid-cols-3 bg-white shadow-md p-5 
    md:px-10 "
    >
      {/* Left */}
      <div
        onClick={() => router.push("/")}
        className="relative flex items-center h-10 
      cursor-pointer my-auto"
      >
        <Image
          src={"https://links.papareact.com/qd3"}
          objectFit={"contain"}
          objectPosition={"left"}
          layout={"fill"}
        />
      </div>
      {/* middle -Search*/}
      <div
        className="flex items-center md:border-2 
      rounded-full py-2 md:shadow-sm"
      >
        <input
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="flex-grow pl-5 bg-transparent outline-none 
          text-sm text-gray-600 placeholder-gray-400"
          type="text"
          placeholder={placeHolder || "Start your search"}
        />
        <SearchIcon
          className="hidden md:inline-flex h-8 text-white bg-red-400 rounded-full p-2 
        cursor-pointer mx-auto md:mx-2"
        />
      </div>
      {/* Rigth */}
      <div
        className="flex items-center space-x-4 justify-end 
      text-gray-500"
      >
        <p className="hidden md:inline ">Become a host</p>
        <GlobeAltIcon className="h-6 cursor-pointer" />
        <div
          className="flex items-center space-x-2 border-2 p-2 rounded-full
         cursor-pointer"
        >
          <MenuIcon className="h-6" />
          <UserCircleIcon className="h-6" />
        </div>
      </div>
      {searchInput && (
        <div className="flex flex-col col-span-3 mx-auto">
          <DateRangePicker
            locale={es}
            minDate={new Date()}
            ranges={[selectionRage]}
            rangeColors={["#DF5861"]}
            onChange={handleSelect}
          />
          <div className="flex items-center border-b mb-4">
            <h2 className="text-2xl flex-grow font-semibold">
              Number of Guests
            </h2>
            <UsersIcon className="h-5" />
            <input
              value={noOfGuests}
              onChange={(e) => setNoOfGuests(parseInt(e.target.value))}
              className="w-12 pl-2 text-lg outline-none text-red-400"
              type="number"
              min={1}
              max={500}
            />
          </div>
          <div className="flex">
            <button onClick={resetInput} className="flex-grow text-gray-500">
              Cancel
            </button>
            <button onClick={search} className="flex-grow text-red-400">
              Search
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
