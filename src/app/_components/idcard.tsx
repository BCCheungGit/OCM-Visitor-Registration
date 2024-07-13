
import Image from "next/image";


interface IDCardProps {
    name: string | undefined;
    phone: string | undefined;
    email?: string;
    photo: string | undefined;
    date: string | undefined;
}


export const IDCard: React.FC<IDCardProps> = ({ name, phone, email, photo, date }) => {
    return (
    <div className="sm:w-[400px] sm:h-[280px] sm:p-[20px] p-[10px] leading-[35px] rounded-xl border-1 sm:border-t-[15px] sm:border-b-[15px] border-t-[10px] border-b-[10px] w-[300px] h-[200px] shadow-md">
        <table className="min-w-full">
            <td className="flex flex-col sm:gap-4 gap-2 justify-center">
                <tr className="flex flex-row min-w-full justify-center items-center">
                    <th className="sm:text-xl text-sm">VISITOR 訪客</th>
                </tr>
                <tr className="grid grid-cols-3 min-w-full gap-2">
                    <td>
                        <Image className="items-center rounded-lg sm:w-[120.3px] sm:h-[150px]" src={photo ?? "" } alt="Visitor Photo" width={80} height={106.4} />
                    </td>
                    <td className="col-span-2">
                    <div className="flex flex-col gap-2">
                        <div className="font-semibold sm:text-2xl sm:mt-8 mt-4 text-base">
                        {name}
                        </div>
                        <div className="sm:text-base text-sm">
                        {date}
                        </div>
                    </div>
                
                    </td>

                </tr>
            </td>
        </table>
    </div>
);
};