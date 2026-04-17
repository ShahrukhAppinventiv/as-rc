
import notFoundImage from "../../assets/images/no-data.avif";
type NotFoundProps = {
    message?:string
}
export default function NotFound({message = 'No Data Found'}:NotFoundProps) {
    return (
        <div className="flex flex-col items-center justify-center py-10 text-gray-500">

            {/* Icon */}
            <div className="text-5xl mb-4">
                <img src={notFoundImage} alt="" className="w-80 h-auto" />
            </div>

            {/* Title */}
            <h2 className="text-xl font-semibold text-gray-700">
                {message}
            </h2>

            {/* Subtitle */}
            {/* <p className="text-sm mt-2">
                There is no data available at the moment.
            </p> */}

        </div>
    );
}