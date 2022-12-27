import { Document } from "./pages/documentation";
import { MasterData } from "./pages/masterdata";
import Pipelines from "./pages/pipelines";
import  Project  from "./pages/project";
import { ToolsChain } from "./pages/toolschain";
import { Home } from "./components/Home";
import  NewProject   from "./pages/newProject";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/communityforum',
    element: <Document />
  },
  {
    path: '/master-data',
    element: <MasterData />
  },
  {
    path: '/pipelines',
    element: <Pipelines />
  },
  {
    path: '/projects',
    element: <Project />
  },
  {
    path: '/toolschain',
    element: <ToolsChain />
  },
  {
    path: '/project',
    element: <NewProject />
  },
];

export default AppRoutes;
