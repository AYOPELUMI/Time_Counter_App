import {useState,useEffect} from "react"
import "./TimeCounter.scss"
import {TimerCardDisplay} from "./TimerCardDisplay"
import {TimerCounterProject} from "./TimerCounterObject"



export function TimeCounter() {
	
	const [timerProjects, settimerProjects] = useState([])
	const [newTimerObject, setNewTimerObject] = useState(false)
	const [newTitle, setNewTitle] = useState("")
	const [newProject, setNewProject] = useState("")
	const [timerIndex, setTimerIndex] = useState(0)
	let displayArray =[]
		
	function addTimerProjects(args) {
		settimerProjects(args)
	}
	const handleNewTimer = () =>{
		setNewTimerObject(true)
	}
	const handleNewTitle = (e) =>{
		let value = e.target.value
		setNewTitle(value)
	}
	const handleNewProject = (e) => {
		let value = e.target.value
		setNewProject(value)
	}
	const handleNewTimerObject = (e) =>{
		e.preventDefault();
		let timerProjectsClone = Array.from(timerProjects)
		let verifiedValue = true

		for (var j = 0; j < timerProjectsClone.length; j++) { 
			if (timerProjectsClone[j].title == newTitle && timerProjectsClone[j].project == newProject) {
				verifiedValue = false;
				break;
			}
		}
		if (verifiedValue == true) {
			let newValue = TimerCounterProject(newTitle, newProject,timerIndex)
			timerProjectsClone.push(newValue)
			settimerProjects(timerProjectsClone)
			setTimerIndex(timerIndex+1)

		}
		else {
			let newValue = TimerCounterProject((newTitle+" -copy"), newProject, timerIndex)
			timerProjectsClone.push(newValue)
			addTimerProjects(timerProjectsClone)
			setTimerIndex(timerIndex+1)
		}
		setNewTitle("")
		setNewProject("")
		setNewTimerObject(false)
	}
	const handleCancelNewTimer = (e) => {
			setNewTimerObject(false)
			setNewTitle("")
			setNewProject("")
	}
	for (var i = 0; i < timerProjects.length; i++) {
		const project = timerProjects[i]

		let el = (
				<TimerCardDisplay 
					index={i}
					key={project.index}
					TimerIndex={timerIndex} 
					project={project} 
					timerProjects={timerProjects}
					addTimerProjects={addTimerProjects}

				/>
		)	
		displayArray.push(el)
	}

	return(
		<div className="timeCounterMainContainer" style ={{
			alignItems : timerIndex ? undefined : "center"
		}}>
			<div className="timeCounterContainer">
				<h2>Timers</h2>
				{ newTimerObject ? 
					<form className="newTimerForm" onSubmit={handleNewTimerObject}>
						<label htmlFor="" className="formInput">
							<h3>Title</h3>
							<input type="text" value={newTitle} onChange={handleNewTitle} required/>
						</label>
						<label htmlFor="" className="formInput">
							<h3>Project</h3>
							<input type="text" value={newProject} onChange={handleNewProject} required/>
						</label>
						<div className="formBtnContainer">
							<button type="submit" >Create</button>
							<button type="button" className="cancelBtn" onClick={handleCancelNewTimer}>Cancel</button>
						</div>
					</form> 
					: (
					 	<div className="addNewTimerBtnContainer">
							<button className="addNewTimerBtn" onClick={handleNewTimer}>+</button>
					 	</div>
					)
				}
				{displayArray}

			</div>
		</div>
	)
}

