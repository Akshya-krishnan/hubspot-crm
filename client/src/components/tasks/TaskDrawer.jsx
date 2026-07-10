import Drawer from "../common/Drawer";
import TaskForm from "./TaskForm";

const TaskDrawer = ({
  isOpen,
  onClose,
  leadId,
  task,
  onTaskCreated,
}) => {
  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title={task ? "Edit Task" : "Create Task"}
    >
      <TaskForm
        leadId={leadId}
        task={task}
        onClose={onClose}
        onTaskCreated={onTaskCreated}
      />
    </Drawer>
  );
};

export default TaskDrawer;