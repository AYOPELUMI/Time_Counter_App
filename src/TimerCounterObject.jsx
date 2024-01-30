export	function TimerCounterProject(Title, Project, Index){
		// const timerObject = new Object()
		const timerObj = {
			// all my properties here
			title: Title,
			project: Project,
			index: Index,
			timeActive: false,
			secondElapsed : 0,
			cardEdit : false,
			titleEdit : false,
			projectEdit : false
		}
		return timerObj
	}