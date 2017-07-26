import React, {Component} from 'react';

import Schedule from './Schedule.jsx';
import MonthView from './MonthView.jsx';
import QuickTasks from './QuickTasks.jsx';
import CalMonth from './CalMonth.jsx';
import CalYear from './CalYear.jsx';
import CalWeek from './CalWeek.jsx';
import UserMenu from './UserMenu.jsx';
import NotificationsMenu from './NotificationsMenu.jsx';
import moment from 'moment';
/* 3rd party plugins*/
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class Calendar extends TrackerReact(Component) {
	constructor(props){
		super(props);
		/* Keep track of the current day (adjusted for timezone differences and Firefox's abiltiy to ruin everything)
		* track the date we want to create a task on or see what tasks we have on that day
		* the current month to view
		* and whether or not to display notifications tray
		*/
		this.state = {
			today : moment().format("YYYY-MM-DD"),
			monthShowing : moment().format("YYYY-MM-DD"),
			showNotifications: false,
			weekView: false,
			showMenu: false,
		};
	}/* Triggers update in parent to tell app what day we are concerned with (changes current tasks view) 
	* Also updates state to delegate the coveted "selected-day" theme to child Day components
	*/
	selectDate(date){
		this.props.selectDate(date);
	}
	/* Move back 1 month 
	* Set state to date object 1 month prior
	* This should not update the selectedDate
	*/
	prevMonth(){
		this.setState({
			monthShowing : moment(this.state.monthShowing, "YYYY-MM-DD").subtract(1 ,'months').format("YYYY-MM-DD"),
		});
		if(!this.state.weekView){
			document.querySelector(".month-wrapper").classList.remove("pulse");
			setTimeout(()=>{document.querySelector(".month-wrapper").classList.add("pulse")}, 100);
		}
	}
	/* Move forward 1 month 
	* Set state to date object of 1 month in the future
	* This should not change selectedDate
	*/
	nextMonth(){
		this.setState({
			monthShowing : moment(this.state.monthShowing, "YYYY-MM-DD").add(1, 'months').format("YYYY-MM-DD"),
		});
		if(!this.state.weekView){
			document.querySelector(".month-wrapper").classList.remove("pulse");
			setTimeout(()=>{document.querySelector(".month-wrapper").classList.add("pulse")}, 100);
		}
	}
	/* Show User Profile & let them edit */
	editUser(){
		console.log("making changes");
	}
	/* Do not update component if, on mobile, we're just sliding from one index to another or it will try to re-render at each frame (yikes) */
	shouldComponentUpdate(nextProps, nextState){
		return (nextProps.filteredTasks !== this.props.filteredTasks || nextProps.selectedDate !== this.props.selectedDate || this.state !== nextState);
	}
	toggleWeekView(){
		this.setState({weekView : !this.state.weekView});
	}
	showAddTask(){
		this.props.showView("addTask");
	}
	toggleNotices(){
		this.setState({showNotifications: !this.state.showNotifications});
	}
	loggedInChange(){
		Meteor.logout();
		this.props.loggedInChange(false);
	}
	toggleMenu(){
		this.setState({showMenu: !this.state.showMenu});
	}
	render(){
		console.log(Meteor.user());
		let tasks = Tasks.find({"dateStart" : {$regex: this.state.monthShowing.substring(0,7) + ".*"}}).fetch();
		let notices = Notifications.find({}, {sort: {'timestamp': -1}, limit: 10}).fetch();

		const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

		return(
			<div id="calendar">

			<CalMonth toggleMenu={this.toggleMenu.bind(this)}
			toggleNotices={this.toggleNotices.bind(this)}
			toggleWeekView={this.toggleWeekView.bind(this)}
			toggleWeekView={this.toggleWeekView.bind(this)}
			width={this.props.width}
			showAddTask={this.showAddTask.bind(this)}
			month={moment(this.state.monthShowing, "YYYY-MM-DD").format('MMMM')}
			weekView={this.state.weekView}
			/> 

			<CalYear year={this.state.monthShowing.substring(0,4)} />
			<CalWeek prevMonth={this.prevMonth.bind(this)} nextMonth={this.nextMonth.bind(this)} weekView={this.state.weekView}/> 

				<div id="cal-body" className={this.state.weekView ? "row-11" : "row-6"}>
				{
					/* Toggle showing the scheduler or the month calendar. The default is to show the calendar */
					this.state.weekView 
					? 
					<Schedule />
					:
					<MonthView 
					today={this.state.today} 
					selectedDate={this.props.selectedDate} 
					selectDate={this.selectDate.bind(this)}
					monthShowing={this.state.monthShowing}
					year={this.state.monthShowing.substring(0,4)}
					month={this.state.monthShowing.substring(5,7)}
					width={this.props.width}
					tasks={tasks}
					/>
				}
				</div>
			{/* On mobile, display tasks list at bottom of screen where otherwise awkward space would be */}
			<div id="quick-tasks" className="row-4" style={{display: this.state.weekView || this.props.width > 992  ? "none" : "block"}}>
			<QuickTasks filteredTasks={this.props.filteredTasks}/>
			</div>	

			<UserMenu 
			showMenu={this.state.showMenu}
			toggleMenu={this.toggleMenu.bind(this)}
			loggedInChange={this.loggedInChange.bind(this)}
			/>

			<NotificationsMenu 
			showNotifications={this.state.showNotifications}
			toggleNotices={this.toggleNotices.bind(this)}
			notices={notices}
			showDetail={this.props.showDetail.bind(this)}
			/>
			</div>
			);
	}
}