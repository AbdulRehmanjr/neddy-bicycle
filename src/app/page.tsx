import { BikeOptions } from "~/app/_components/BikeOption";


export default function Home() {

  return (
    <section className="col-span-12 flex flex-col gap-14 min-h-[calc(100vh_-_124px)]">
      <h1 className={`text-center text-5xl font-ibm text-yellow mb-16`}>
        Choose your bicycle
      </h1>
      <BikeOptions />
    </section>
  );
}


