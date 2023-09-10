import { Action, ToDoActionCard} from "@/components/TodoActionCard";

const page = ({ params }: { params: {action:Action}}) => {
  return (
    <div>
      <ToDoActionCard props={{action:params.action}}/>
    </div>
  );
};

export default page;