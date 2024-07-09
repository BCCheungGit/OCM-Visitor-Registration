
import Image from "next/image";


interface IDCardProps {
    name: string | undefined;
    phone: string | undefined;
    email?: string;
    photo: string | undefined;
}


export const IDCard: React.FC<IDCardProps> = ({ name, phone, email, photo }) => {
    return (
    <div className="w-[500px] p-[35px] leading-[35px] rounded-xl border-1 border-t-[15px] border-b-[15px] shadow-md">
        <table className="min-w-full">
            <td className="flex flex-col gap-4 justify-center">
                <tr className="flex flex-row min-w-full gap-7 items-center">
                    <th className="text-2xl">VISITOR</th><td className="text-2xl text-semibold">{name}</td>
                </tr>
                <tr className="flex flex-row min-w-full gap-7 items-center">
                    <td>
                        <Image className="items-center" src={photo ?? "" } alt="Visitor Photo" width={100} height={100} />
                    </td>
                    
                </tr>
            </td>
        </table>
    </div>
);
};