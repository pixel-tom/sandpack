import { Button, Input } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";

export function Search() {
  return (
    <div className="flex gap-1 items-center justify-center" >
      <input placeholder="Search courses" className="w-[60%] text-sm bg-[#15161e] py-[8px] px-4 border border-[#3e3d3d] rounded-md shadow-md focus:outline-none focus:ring-[1px] focus:ring-violet-400/40"/>
      <button  color="indigo" className="px-2 py-2 border border-[#3e3d3d] rounded-md shadow-md">
        <IconSearch height={20} width={20} />
      </button>
    </div>
  );
}
