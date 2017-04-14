import React from 'react';
import TaskSingle from './TaskSingle.jsx';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class TaskList extends TrackerReact(React.Component) {
	constructor(props) {
		super(props);

		this.state = {
			search: "",
			subscription: {
				tasks: Meteor.subscribe("userTasks")
			},
			visible: false
		};
	}
	updateSearch(event){
		this.setState({search: event.target.value});
	}
  showDetail(event){
  	this.props.showDetail(event);
  }
	componentWillUnmount(){
		this.state.subscription.tasks.stop();
	}
	tasks(){
		let tasks = [];
		Meteor.call("getTasks", (err, data)=>{
			if(err){
				console.log("error", err);
			} else {
				tasks = data;
			}
		});
		return tasks;
	}
	showCal(){
		this.props.showCal("calendar");
	}
	render(){
		let filteredTasks = Tasks.find().fetch().filter(
			(task) => {
				return task.dateStart === this.props.selectedDate;
			}
			).sort(
			(a, b) => {
				return a.dateStart + "T" + a.timeStart > b.dateStart + "T" +b.timeStart;
			}
			);
			filteredTasks = filteredTasks.length === 0 ? <div id="no-tasks-message"><p>You're free all day!</p><img src="../img/tadu_logo.png" className="no-tasks-icon"></img></div> : filteredTasks.map( (task) => {
						return <TaskSingle key={task._id} task={task} showDetail={this.showDetail.bind(this)}/>
					});
		return (
			<div id="TaskList" className={this.props.show ? "animated slideInLeft" : "animated slideOutLeft"}>
				<div className="hide-on-large hide-on-med"></div>
				<div id="search-wrapper">
				<i id="search-icon" className="mdi mdi-magnify"></i>
				<input id="search" type="text" value={this.state.search} onChange={this.updateSearch.bind(this)} />
				<i id="search-icon" className="mdi mdi-chevron-right hide-on-med hide-on-large" onClick={this.showCal.bind(this)}></i>

				</div>
				<ul id="tasks-wrapper">
					{filteredTasks}
				</ul>
			</div>
			)
	}
}
