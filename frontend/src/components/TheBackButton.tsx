import { Button } from "antd";
import { useRouter } from "next/navigation";


const BackButton = () => {
  const router = useRouter()
  
  return (
   <Button onClick={()=> router.replace('/')}>Back</Button>
  );
};

export default BackButton