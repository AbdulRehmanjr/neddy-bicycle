

export default function Loading() {

    return (
        <section className="col-span-12 flex flex-col items-center justify-center h-[calc(100vh_-_123px)]">
            <div className="flex gap-2">
                <div className="loader ease-linear rounded-full border-8 border-t-8 border-yellow-hover h-[4.5rem] md:h-32 w-[4.5rem] md:w-32 relative">
                    <div className="w-full h-full border-8 border-t-8 border-r-8 border-r-yellow border-l-yellow-hover border-yellow rounded-full animate-spin"></div>
                </div>
            </div>
        </section>
    )
}