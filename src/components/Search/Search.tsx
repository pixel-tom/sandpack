import { Button, Input } from "@mantine/core";

export function Search() {
  return (
    <div className="flex gap-1 items-center justify-center" >
      <Input placeholder="Search" className="w-[60%]"/>
      <Button variant="filled" color="orange">
        Search
      </Button>
    </div>
  );
}
