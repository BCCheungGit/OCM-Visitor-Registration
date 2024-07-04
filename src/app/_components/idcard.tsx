
import Image from "next/image";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardFooter,
    CardTitle
} from "~/components/ui/card";


interface IDCardProps {
    name: string | undefined;
    phone: string | undefined;
    email?: string;
    photo: string | undefined;
}


export const IDCard: React.FC<IDCardProps> = ({ name, phone, email, photo }) => {
    return (
      <Card>
        <CardHeader>
        <div className="flex items-center space-x-4 rounded-md">
            <Image
                src={photo ?? ""}
                alt="Visitor Photo"
                width={113}
                height={150}
            />
            <div className="flex flex-col">
                <CardTitle>{name}</CardTitle>
                <CardDescription>{phone}</CardDescription>
                {email && <CardDescription>{email}</CardDescription>}
                <p>Visitor</p>
            </div>
        </div>
        </CardHeader>
      </Card>
    );
};