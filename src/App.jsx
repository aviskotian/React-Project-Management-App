import { useState } from "react";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectSideBar from "./components/ProjectsSideBar";
import SelectedProject from "./components/SelectedProject";

function App() {

  const [projectsState, setprojectsState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: []
  })

  function handleAddTask(text) {
    setprojectsState((prevState) => {
      const taskId = Math.random()
      const newTask = {
        text: text,
        projectId: prevState.selectedProjectId,
        id: taskId
      };

      return {
        ...prevState,
        tasks: [newTask, ...prevState.tasks]
      }
    })
  }

  function handleDeleteTask(id) {
    setprojectsState(prevState => {
      return {
        ...prevState,
        tasks: prevState.tasks.filter((task) => task.id !== id)
      }
    })
  }

  function handleSelectProject(id) {
    setprojectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: id
      }
    })
  }

  function handleStartAddProject() {
    setprojectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: null
      }
    })
  }

  function handleCancelAddproject() {
    setprojectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: undefined
      }
    })
  }

  function handleAddProject(projectData) {
    setprojectsState(prevState => {
      const projectId = Math.random()
      const newProject = {
        ...projectData,
        id: projectId
      };

      return {
        ...prevState,
        selectedProjectId: undefined,
        projects:[...prevState.projects, newProject]
      }
    })
  }

  function handleDeleteProject() {
    setprojectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: prevState.projects.filter((project) => project.id !== prevState.selectedProjectId)
      }
    })
  }

  const selectedProject = projectsState.projects.find(project => project.id === projectsState.selectedProjectId)

  let content = <SelectedProject
    project={selectedProject}
    onDelete={handleDeleteProject}
    onAddTask={handleAddTask}
    onDeleteTask={handleDeleteTask}
    tasks={projectsState.tasks}
  />
  
  if (projectsState.selectedProjectId === null) {
    content = <NewProject onAdd={handleAddProject} onCancel={handleCancelAddproject} />
  } else if (projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />
  }
  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectSideBar
        onStartAddProject={handleStartAddProject}
        projects={projectsState.projects}
        onSelectProject={handleSelectProject}
        selectedProjectId={projectsState.selectedProjectId}/>
      {content}
    </main>
  );
}

export default App;
