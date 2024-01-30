import {useState,useEffect} from "react"
import {TimerCounterProject} from "./TimerCounterObject"

export function TimerCounterForm(props) {
	const {
		index,
		timerProject,
		timerProjects,
		addTimerProjects,
		addTimerProject,
		cardEdit,
		updateCardEdit,
		timerIndex
	} = props

	const [newTitle, setNewTitle] = useState(timerProject.title)
	const [newProject, setNewProject] = useState(timerProject.project)


  	const handleNewTitle = (e) => {
  		let timerProjectClone = timerProject
		timerProjectClone.titleEdit = false
		let value = e.target.value
		setNewTitle(value)
		timerProjectClone
		addTimerProject(timerProjectClone)
	}

	const handleNewProject = (e) => {
		let timerProjectClone = timerProject
		timerProjectClone.projectEdit = false
		let value = e.target.value
		setNewProject(value)
		addTimerProject(timerProjectClone)
	}

	const handleNewTimerObject = (e) =>{
		e.preventDefault();
		let timerProjectClone = {...timerProject}
		let timerProjectsClone = [...timerProjects]
		console.log({timerProjectsClone})

		let verifiedValue = true
		for (var j = 0; j < timerProjectsClone.length; j++) { 
			if (timerProjectsClone[j].title == newTitle && timerProjectsClone[j].project == newProject) {
				verifiedValue = false;
				break;
			}
			console.log("i am here")
		}
		console.log({verifiedValue})
		if (verifiedValue == true) {
			timerProjectClone.title = newTitle
			timerProjectClone.project = newProject
			timerProjectClone.titleEdit = false
			timerProjectClone.projectEdit = false
			addTimerProject(timerProjectClone)
		}
		else {
			timerProjectClone.title = (newTitle+" -copy")
			addTimerProject(timerProjectClone)
			addTimerProjects(timerProjectsClone)
			timerProjectClone.project = newProject	
		}
		console.log({newTitle})
		console.log({newProject})
		setNewTitle("")
		setNewProject("")
		updateCardEdit(false)
	}

	const handleCancelNewTimer = (e) => {
		let timerProjectClone = timerProject

		if (timerProjectClone.cardEdit) {
			console.log("wassup")
			timerProjectClone.cardEdit = false
			setNewTitle("")
			setNewProject("")
			addTimerProject(timerProjectClone)
		}
		else {
			setNewTitle("")
			setNewProject("")
		}
		updateCardEdit(false)
	}

	return (
		<form className="newTimerForm">
			<label htmlFor="" className="formInput">
				<h3>Title</h3>
				<input type="text" index={index} value={newTitle} onChange={handleNewTitle} required/>
			</label>
			<label htmlFor="" className="formInput">
				<h3>Project</h3>
				<input type="text" index={index} value={newProject} onChange={handleNewProject} required/>
			</label>
			<div className="formBtnContainer">
				<button type="submit" onClick={handleNewTimerObject} index={index}>Save</button>
				<button type="button" index={index} className="cancelBtn" onClick={handleCancelNewTimer}>Cancel</button>
			</div>
		</form>
	)
}