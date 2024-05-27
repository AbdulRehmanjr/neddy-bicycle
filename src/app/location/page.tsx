import { BikeLocation } from "~/app/_components/BikeLocation";
import { GoBack } from "~/app/_components/GoBack";

export default function LocationPage() {

  return (
    <section className="col-span-12 flex flex-col gap-14 min-h-[calc(100vh_-_124px)] mb-14">
      <h1 className={`text-center text-3xl md:text-5xl font-ibm text-yellow mb-6 md:mb-16`}>
        Choose your pickup location
      </h1>
      <div className="flex flex-col md:flex-row  justify-center items-center gap-14">
        <BikeLocation />
      </div>
      <div className="container flex justify-start">
        <GoBack />
      </div>
    </section>
  )
}


