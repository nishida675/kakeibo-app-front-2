import Link from "next/link";
import { FaPen } from "react-icons/fa";

interface EditButtonProps {
  id: string;
  balanceId: string;
  date: string;
  category: string;
  balanceName: string;
  price: number;
  setTitle: (title: string) => void;
  setMessage: (message: string) => void;
}

const EditButton: React.FC<EditButtonProps> = ({ id, balanceId, date, category, balanceName, price, setTitle, setMessage }) => {
  const queryParams = new URLSearchParams({
    id,
    balanceId,
    date,
    category,
    balanceName,
    price: price.toString()
  }).toString();

  return (
    <Link href={`/edit/${id}?${queryParams}`}>
        <FaPen className="hover: text-gray-700 text-lg cursor-pointer"/>
    </Link>
  );
};

export default EditButton;
