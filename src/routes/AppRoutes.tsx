import { Route, Routes } from "react-router-dom";
import Kanban from "../pages/kanban/KanbanBoard";
import TreeView from "../pages/listNode/Tree";
const AppRoute = () => {
    return (
        <Routes>
            <Route path="/" element={<Kanban/>} />
            <Route path="/tree" element={<TreeView/>} />

        </Routes>
    );

};
export default AppRoute;