import {TimerCounterForm} from "./TimerCounterForm"
import {useRef, useState, useEffect} from "react"

export function TimerCardDisplay(props) {
	const {
		project,
		index,
		TimerIndex,
		updateTimerIndex,
		timerProjects,
		addTimerProjects
	} = props
	const refContainer = useRef(null)
	const [timer, setTimer] = useState(project.secondElapsed)
	const [timerObject, setTimerObject] = useState(project)
	const [timerActive, setTimerActive] = useState(project.timeActive)
	const [cardEdit, setCardEdit] = useState(false)

 	const renderForm = () => {
		return (
			<TimerCounterForm
				index={index}
				timerProjects={timerProjects}
				addTimerProjects={addTimerProjects}
				addTimerProject={addTimerProject}
				timerProject = {timerObject}
				cardEdit= {cardEdit}
				updateCardEdit = {updateCardEdit}
				timerIndex={TimerIndex}
				updateTimerIndex={updateTimerIndex}
			/>
		)
	}

	function updateCardEdit (args) {
		setCardEdit(args)
	}

	let timerProjectsClone = [...timerProjects]

	useEffect(() =>{
		for (var i = 0; i < timerProjectsClone.length; i++) {
			if (timerProjectsClone[i].index == timerObject.index) {
				timerProjectsClone.splice(i,1,timerObject)
			}
		}
		addTimerProjects(timerProjectsClone)
	},[cardEdit])

	const handleEditTimer =(e) => {
		e.preventDefault()
		let timerObjectClone = timerObject

			if (timerActive == true) {
				clearInterval(refContainer.current)
				timerObject.timerActive = false
				setTimerActive(false)
			}
		  timerObjectClone.cardEdit = !timerObjectClone.cardEdit
		  timerObjectClone.titleEdit = true
		  timerObjectClone.projectEdit = true
		  setCardEdit(!cardEdit)
		  setTimerObject(timerObjectClone)
	}

	function addTimerProject (args) {
		setTimerObject(args)
	}

	function ConvertSecondElapsed (secondElapsed) {
		let seconds = secondElapsed > 60 ? (secondElapsed%60) : secondElapsed
		let minutes = secondElapsed > 60 ? secondElapsed / 60 : 0
		let hours = secondElapsed > 3600 ? secondElapsed/3600 : 0
		let time = hours +":"+ minutes.toFixed(0) +":"+ seconds 
		
		return time
	}

	const handleToggleTimer = (e) => {
			let activeTimerObject = timerObject

			if (activeTimerObject.timeActive == false) {
				refContainer.current = setInterval(() => {
					let secondElapsed = activeTimerObject.secondElapsed
					secondElapsed += 1 
					activeTimerObject.timeActive = true
					activeTimerObject.secondElapsed = secondElapsed
					setTimer(secondElapsed)
					setTimerActive(true)
					setTimerObject(activeTimerObject)
				}, 1000)
			}
			else {
				clearInterval(refContainer.current)
				activeTimerObject.timeActive = false
				setTimerObject(activeTimerObject)
				setTimerActive(false)
			}
	}

	const removeTimer = () => {
		let timerObjectsClone = Array.from(timerProjects)
		if (timerActive == true) {
			clearInterval(refContainer.current)
			setTimerActive(false)
		}
		timerObjectsClone.splice(index,1)
		addTimerProjects(timerObjectsClone)
	}

	return(
		// eslint-disable-next-line react/no-unknown-property
		<div  index={timerObject.index} >
			{ cardEdit  ? renderForm()
				:
				<div key={timerObject.index} className="displayTimerContainer">
					<div className="titleProjectContainer">
						<h2>{timerObject.title}</h2>
						<h3>{timerObject.project}</h3>
					</div>
					<div className="timerDisplay">
						{ConvertSecondElapsed(timer)}
					</div>
					<div className="timerProjectBtnContainer">
						<button type="button" onClick={handleEditTimer} index={timerObject.index}>
							Edit
						</button>
						<button type="button"  onClick={removeTimer} index = {timerObject.index}>
							Remove
						</button>
					</div>
					<button 
						type="button" 
						className={timerActive ? "timerContollerBtnActive" : "timerContollerBtnDefault"} 
						index = {timerObject.index} 
						onClick={handleToggleTimer}
					>
						{timerActive ? "Stop" : "Start"}
					</button>
				</div>
			}
		</div>
	)
}