import { GoBack } from "~/app/_components/GoBack";
import { ArrivalInfoInput } from "~/app/_components/ArrivalInfo";


export default function ArrivalInfoPage() {

    return (
        <section className="col-span-12 flex flex-col gap-14 min-h-[calc(100vh_-_124px)] mb-14">
            <h1 className={`text-center text-5xl font-ibm text-yellow mb-16`}>
                When are you arriving?
            </h1>
            <div className="flex flex-col items-center gap-2 text-dim-grey text-base">
                <p>If you do not know this yet please contact us via whatsapp </p>
                <p>+248 2 54 93 61 </p>
                <p>or via email rayenradegonde@gmail.com as soon as you know. </p>
                <p>This will help us to provide you the bicycles right on time</p>
            </div>
            <div className=" flex justify-center items-center gap-14">
                <ArrivalInfoInput />
            </div>
            <div className="container flex justify-start">
                <GoBack />
            </div>
        </section>
    )
}


