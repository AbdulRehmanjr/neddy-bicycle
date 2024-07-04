"use client";

import { Input } from "~/components/ui/input";
import { debounce } from "lodash";
import { Button } from "~/components/ui/button";
import { useRouter } from "next/navigation";
import { useBookingStore } from "~/store";

export const ArrivalInfoInput = () => {
  const router = useRouter();
  const { setSelection } = useBookingStore();

  const debouncedInputHandler = debounce((value: string) => {
    setSelection({ arrivalTime: value });
  }, 500);

  return (
    <div className="flex flex-col items-center gap-4">
      <Input
        type="time"
        className="block w-[20rem] p-6 text-xl"
        onChange={(e) => debouncedInputHandler(e.target.value)}
      />
      <Button
        className="w-fit bg-yellow hover:bg-yellow-hover"
        onClick={() => router.push("booking")}
      >
        Continue
      </Button>
    </div>
  );
};
