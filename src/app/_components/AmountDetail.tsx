



export const AmountDetail = () => {

    return (
        <div className="flex flex-col gap-4 text-yellow">
            <h1 className="text-4xl font-extrabold font-libre">Rental overview</h1>
            <div className="flex flex-col gap-2 text-mid-blue">
                <p className="flex gap-2">
                    <span className="font-extrabold">Start date:</span>
                    <span>2024-05-19</span>
                </p>
                <p className="flex gap-2">
                    <span className="font-extrabold">End date:</span>
                    <span>2024-05-20</span>
                </p>
                <p className="flex gap-2">
                    <span className="font-extrabold">Duration:</span>
                    <span>2 days</span>
                </p>
                <p className="flex gap-2">
                    <span className="font-extrabold">Category:</span>
                    <span>Gentlemen bike</span>
                </p>
                <p className="flex gap-2">
                    <span className="font-extrabold">Price:</span>
                    <span>100 €</span>
                </p>
            </div>
        </div>
    )
}