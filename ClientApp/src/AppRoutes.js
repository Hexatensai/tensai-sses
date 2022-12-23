import { Document } from "./pages/documentation";
import { MasterData } from "./pages/masterdata";
import { Pipelines } from "./pages/pipelines";
import { Project } from "./pages/project";
import { ToolsChain } from "./pages/toolschain";
import { Welcome } from "./components/Welcome";
import { Home } from "./components/Home";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/welcome',
    element: <Welcome />
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
  }
];

export default AppRoutes;
