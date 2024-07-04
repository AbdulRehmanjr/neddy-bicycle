"use client";

import { Input } from "~/components/ui/input";

import { debounce } from "lodash";
import { Button } from "~/components/ui/button";
import { useRouter } from "next/navigation";
import { useBookingStore } from "~/store";

export const GuesthouseInput = () => {
  const router = useRouter();
  const { setSelection } = useBookingStore();

  const debouncedInputHandler = debounce((value: string) => {
    setSelection({ guesthouse: value });
  }, 500);

  return (
    <div className="flex flex-col items-center gap-4">
      <Input
        className="w-[20rem] p-6 text-xl"
        placeholder="Enter your guesthouse name"
        onChange={(e) => debouncedInputHandler(e.target.value)}
      />
      <Button
        className="w-fit bg-yellow hover:bg-yellow-hover"
        onClick={() => router.push("arrivalInfo")}
      >
        Continue
      </Button>
    </div>
  );
};
