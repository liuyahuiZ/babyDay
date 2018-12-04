import React from 'react'; // 引入 react
import { Component, PropTypes } from 'react';
import moment from 'moment'; // 引入时间计算插件
import Icon from '../Icon';
import Buttons from '../Button/button';
import Row from '../Grid/Row';
import Col from '../Grid/Col';

export default class DatePicker extends Component {
	constructor(props) {
		super(props);

		const query = this.props.query; // 获取 props 中的携带参数
		let _startDate = query.start_date;
		let _endDate = query.end_date;
		let _days = getDays(_startDate, _endDate, _endDate, query.date_type !== '3');
		let _type = parseInt(query.date_type);
		let _hideType =(query.hide_type)
		let _canClick = _type === 2 || _type === 3;
		let allowToday = query.allow_today;
		let nowDate = moment().subtract(1, 'days').format('YYYY-MM-DD');

		if (allowToday === true) {
			nowDate = moment().format('YYYY-MM-DD')
		}

		let _months = [];
		let _year = moment(_endDate).year();
		let _selectedMonth = moment(_endDate).format('YYYY-MM');
		
		if (4 === _type) {
			_months = getMonths(_year, _selectedMonth);
		}

		this.nowDate = {
			startDate: nowDate,
			endDate: nowDate
		};

		this.datePicker = {
			selected: false,
			startDate: _startDate,
			endDate: _endDate,
			type: _type
		};

		this.types = [
			{
				text: "最近7天",
				selected: false,
				func: this.handleLast7Days.bind(this)
			},
			{
				text: "最近30天",
				selected: false,
				func: this.handleLast30Days.bind(this)
			},
			{
				text: "日",
				selected: true,
				func: this.handleDay.bind(this)
			},
			{
				text: "周",
				selected: false,
				func: this.handleWeek.bind(this)
			},
			{
				text: "月",
				selected: false,
				func: this.handleMonth.bind(this)
			}
		];

		let _types = selectType(this.types, _type);

		this.state = {
			startDate: _startDate,
			endDate: _endDate,
			viewDate: moment(_endDate).format('YYYY年MM月'),
			days: _days,
			types: _types,
			type: _type,
			canClick: _canClick,
			allowToday:allowToday,
			months: _months,
			year: _year,
			selectedMonth: _selectedMonth,
			showPoint: true,
            showCom:false, //是否显示弹窗
            hideType: _hideType
		};

		this.mmnt = moment(_endDate);
	}

    componentWillReceiveProps(nextProps) {
        if(nextProps.visible){
        	this.toggleCom(true)
		}else{
            this.toggleCom(false)
		}
    }
	handleBtnRightClick () {
		this.datePicker = {
			selected: true,
			startDate: this.state.startDate,
			endDate: this.state.endDate,
			type: this.state.type
		};

        if(typeof (this.props.callback) == 'function'){
            this.props.callback(this.datePicker)
        }
	}

	handleMonthPre () {
		let newDate = this.mmnt.subtract(1, 'months').format('YYYY-MM-DD');
		let _days = getDays(this.state.startDate, this.state.endDate, newDate, this.state.type !== 3);

		this.setState({
			viewDate: moment(newDate).format('YYYY年MM月'),
			days: _days
		});
	}

	handleMonthNxt () {
		let newDate = this.mmnt.add(1, 'months').format('YYYY-MM-DD');
		let _days = getDays(this.state.startDate, this.state.endDate, newDate, this.state.type !== 3);

		this.setState({
			viewDate: moment(newDate).format('YYYY年MM月'),
			days: _days
		});
	}

	handleYearPre () {
		let newYear = this.state.year - 1;
		let _months = getMonths(newYear, this.state.selectedMonth);

		this.setState({
			year: newYear,
			months: _months
		});
	}

	handleYearNxt () {
		let newYear = this.state.year + 1;
		let _months = getMonths(newYear, this.state.selectedMonth);

		this.setState({
			year: newYear,
			months: _months
		});
	}

	handleLast30Days () {
		// this.setState({
		// 	showPoint: false
		// });

		// let _types = selectType(this.types, 1);
		let newDate = moment();
		// let currDate = newDate.format('YYYY-MM-DD');
		let _endDate = newDate.subtract(1, 'days').format('YYYY-MM-DD');
		let _startDate = newDate.subtract(29, 'days').format('YYYY-MM-DD');
		// let _days = getDays(_startDate, _endDate, currDate);

		// this.setState({
		// 	types: _types,
		// 	days: _days,
		// 	startDate: _startDate,
		// 	endDate: _endDate,
		// 	viewDate: moment(currDate).format('YYYY年MM月'),
		// 	canClick: false,
		// 	type: 1
		// });

		// this.mmnt = moment(currDate);

		const datePicker = {
			selected: true,
			startDate: _startDate,
			endDate: _endDate,
			type: 1
		};
		if(typeof (this.props.callback) == 'function'){
            this.props.callback(datePicker)
		}
	}

	handleLast7Days () {
		// this.setState({
		// 	showPoint: false
		// });

		// let _types = selectType(this.types, 0);
		let newDate = moment();
		// let currDate = newDate.format('YYYY-MM-DD');
		let _endDate = newDate.subtract(1, 'days').format('YYYY-MM-DD');
		let _startDate = newDate.subtract(6, 'days').format('YYYY-MM-DD');
		// let _days = getDays(_startDate, _endDate, currDate);

		// this.setState({
		// 	types: _types,
		// 	days: _days,
		// 	startDate: _startDate,
		// 	endDate: _endDate,
		// 	viewDate: moment(currDate).format('YYYY年MM月'),
		// 	canClick: false,
		// 	type: 0
		// });

		// this.mmnt = moment(currDate);

		const datePicker = {
			selected: true,
			startDate: _startDate,
			endDate: _endDate,
			type: 0
		};

        if(typeof (this.props.callback) == 'function'){
            this.props.callback(datePicker)
        }
	}

	handleDay () {
		this.setState({
			showPoint: true
		});

		let _types = selectType(this.types, 2);
		let _days = getDays(this.nowDate.startDate, this.nowDate.endDate, this.nowDate.endDate);

		this.setState({
			types: _types,
			days: _days,
			startDate: this.nowDate.startDate,
			endDate: this.nowDate.endDate,
			viewDate: moment(this.nowDate.endDate).format('YYYY年MM月'),
			canClick: true,
			type: 2
		});

		this.mmnt = moment(this.nowDate.endDate);
	}

	handleWeek () {
		this.setState({
			showPoint: true
		});

		let _types = selectType(this.types, 3);

		let _startDate = moment(this.nowDate.startDate).subtract(1, 'days').startOf('week').add(1, 'days').format('YYYY-MM-DD');
		let _endDate = moment(this.nowDate.startDate).subtract(1, 'days').endOf('week').add(1, 'days').format('YYYY-MM-DD');

		if (!moment(this.nowDate.startDate).isSame(_endDate)) {
			_startDate = moment(this.nowDate.startDate).subtract(8, 'days').startOf('week').add(1, 'days').format('YYYY-MM-DD');
			_endDate = moment(this.nowDate.startDate).subtract(8, 'days').endOf('week').add(1, 'days').format('YYYY-MM-DD');
		}

		let _days = getDays(_startDate, _endDate, _endDate, false);

		this.setState({
			types: _types,
			days: _days,
			startDate: _startDate,
			endDate: _endDate,
			viewDate: moment(_endDate).format('YYYY年MM月'),
			canClick: true,
			type: 3
		});

		this.mmnt = moment(_endDate);
	}

	handleMonth () {
		this.setState({
			showPoint: true
		});

		let _types = selectType(this.types, 4);
		let mmnt = moment();
		let _year = mmnt.year();
		let _selectedMonth = mmnt.subtract(1, 'months').format('YYYY-MM');
		let _months = getMonths(_year, _selectedMonth);
		let _startDate = moment(_selectedMonth).startOf('month').format('YYYY-MM-DD');
		let _endDate = moment(_selectedMonth).endOf('month').format('YYYY-MM-DD');

		this.setState({
			year: _year,
			selectedMonth: _selectedMonth,
			months: _months,
			startDate: _startDate,
			endDate: _endDate,
			type: 4,
			types: _types
		});
	}

	handleSelectMonth (selectedMonth) {
		let _currMonth = moment().format('YYYY-MM');

		if (!moment(selectedMonth).isBefore(_currMonth, 'month')) {
			// this.showToast('时间选择出错，请重新选择');

			return ;
		}

		const _months = getMonths(this.state.year, selectedMonth);
		let _startDate = moment(selectedMonth).startOf('month').format('YYYY-MM-DD');
		let _endDate = moment(selectedMonth).endOf('month').format('YYYY-MM-DD');

		this.setState({
			selectedMonth: selectedMonth,
			months: _months,
			startDate: _startDate,
			endDate: _endDate
		});
	}

	handleSelectDay (date) {
		let _days = [];
		let _startDate = date;
		let _endDate = date;
		let _mmntDate = date;

		if (moment(date).isAfter(this.nowDate.startDate)) {
			// this.showToast('时间选择出错，请重新选择');

			return ;
		}

		if (this.state.type === 2) {
			_days = getDays(_startDate, _endDate, _endDate);
		} else if (this.state.type === 3) {
			_startDate = moment(date).subtract(1, 'days').startOf('week').add(1, 'days').format('YYYY-MM-DD');
			_endDate = moment(date).subtract(1, 'days').endOf('week').add(1, 'days').format('YYYY-MM-DD');

			// if (moment(_startDate).isSame(_endDate, 'month') && !moment(_endDate).isAfter(this.nowDate.startDate)) {
			// 	_days = getDays(_startDate, _endDate, _endDate);
			// } else {
			// 	this.showToast('时间选择出错，请重新选择');

			// 	return ;
			// }

			if (!moment(_endDate).isAfter(this.nowDate.startDate)) {
				_days = getDays(_startDate, _endDate, _endDate, false);
			} else {
				// this.showToast('时间选择出错，请重新选择');

				return ;
			}
		}

		this.setState({
			days: _days,
			startDate: _startDate,
			endDate: _endDate,
			viewDate: moment(_endDate).format('YYYY年MM月')
		});

		this.mmnt = moment(_endDate);
	}
	/*开关组件*/
    toggleCom(bool){
    	if(bool)
    		this.setState({showCom:true})
		else
            this.setState({showCom:false})
	}
	/**
	 * 页面渲染方法
	 */
	render () {
		if(!this.state.showCom) return(null)
		return (
			<div className="date-pick g-body" >
				<div className="timeline">
                    {
                        this.state.type !== 4 ?
							<ComMonthend viewDate={this.state.viewDate} btnLeftFn={this.handleMonthPre.bind(this)} btnRightFn={this.handleMonthNxt.bind(this)}/> :
							<Month viewDate={this.state.year + '年'} btnLeftFn={this.handleYearPre.bind(this)} btnRightFn={this.handleYearNxt.bind(this)}/>
                    }
					{
                        this.state.hideType != true &&
						<DateTypes types={this.state.types}/>
					}
					{
						this.state.type !== 4 ?
						<ComWeekend viewDate={this.state.viewDate} btnLeftFn={this.handleMonthPre.bind(this)} btnRightFn={this.handleMonthNxt.bind(this)}/> :
						''
					}
				</div>
				{
					this.state.type !== 4 ?
					<Days days={this.state.days} showPoint={this.state.showPoint} handleSelectDay={this.handleSelectDay.bind(this)} canClick={this.state.canClick}/> :
					<Months year={this.state.year} months={this.state.months} handleSelectMonth={this.handleSelectMonth.bind(this)}/>
				}
				{
					(this.state.type === 2 || this.state.type === 3 || this.state.type === 4) &&
					<BtnGroup btnLeftFn={this.props.closeCom} btnRightFn={this.handleBtnRightClick.bind(this)}/>
				}
			</div>
		);
	}
}

function selectType (types, index) {
	return types.map((val, _index) => {
		if (_index === index) {
			return Object.assign({}, val, {
				selected: true
			});
		}

		return Object.assign({}, val, {
			selected: false
		});
	})
}

function getMonths (year, selectedMonth) {
	let mmnt = moment(selectedMonth);
	let _selectedMonth = mmnt.format('YYYY-MM');
	let lastYear = year - 1;
	let month = mmnt.month();
	let currMonth = moment().startOf('month').format('YYYY-MM-DD');

	const _months = [];
	const _nextMonths = [];

	for (let i = 0; i < 12; i++) {
		_months.push({
			text: i + 1,
			month: moment([year, i]).format('YYYY-MM'),
			selected: moment([year, i]).format('YYYY-MM') === _selectedMonth,
			disabled: !moment([year, i]).endOf('month').isBefore(currMonth)
		});
	}

	for (let i = 0; i < 12; i++) {
		_nextMonths.push({
			text: i + 1,
			month: moment([lastYear, i]).format('YYYY-MM'),
			selected: moment([lastYear, i]).format('YYYY-MM') === _selectedMonth,
			disabled: !moment([lastYear, i]).endOf('month').isBefore(currMonth)
		});
	}

	return [
		{
			year: year,
			data: _months
		},
		{
			year: lastYear,
			data: _nextMonths
		}
	];
}

function getDays (startDate, endDate, currDate, notWeek = true) {
	const months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	const _endDate = new Date(endDate);
	const _startDate = new Date(startDate);
	const _currDate = new Date(currDate);
	const days = [];
	const todayStr = moment().format('YYYY-MM-DD');
	const startOfWeek = moment().subtract(1, 'days').startOf('week').add(1, 'days').format('YYYY-MM-DD');

	let year = _currDate.getFullYear();
	let month = _currDate.getMonth();

	let lastYear = month > 0 ? year : year - 1;
	let nextYear = month < 11 ? year : year + 1;

	
	let lastMonth = month > 0 ? month - 1 : 11;
	let nextMonth = month < 11 ? month + 1 : 0;
	
	if ((year % 4 === 0) && (year % 100 !== 0) || year % 400 === 0) {
		months[1] = 29;
	}

	let weekStart = moment([year, month, "01"]).days();
	let weekEnd = moment([year, month, months[month]]).days();

	if (0 !== weekStart) {
		for (let i = weekStart, j = months[lastMonth]; i > 0; i--, j--) {
			days.unshift({
				text: j,
				date: moment([lastYear, lastMonth, j]).format('YYYY-MM-DD'),
				isCurrMonth: false,
				isDuration: false,
				isPoint: 0,
				disabled: false
			});
		}
	}

	for (let i = 1; i <= months[month]; i++) {
		days.push({
			text: i,
			date: moment([year, month, i]).format('YYYY-MM-DD'),
			isCurrMonth: true,
			isDuration: false,
			isPoint: 0,
			disabled: false
		});
	}

	if (6 !== weekEnd) {
		for (let i = 1, j = 6 - weekEnd; i <= j; i++) {
			days.push({
				text: i,
				date: moment([nextYear, nextMonth, i]).format('YYYY-MM-DD'),
				isCurrMonth: false,
				isDuration: false,
				isPoint: 0,
				isToday: false,
				disabled: false
			});
		}
	}

	if (startDate === endDate) {
		days.map(val => {
			if (val.date === startDate) {
				val.isPoint = 2;
			}

			if (val.date === todayStr) {
				val.isToday = true;
			}

			if (!moment(val.date).isBefore(moment(todayStr)) && val.date !== todayStr) {
				val.disabled = true;
			}
		});
	} else {
		let minDateTime = (new Date(days[0].date)).getTime();
		let startDateTime = _startDate.getTime();
		let endDateTime = _endDate.getTime();
		let isDuration = false;

		if ((minDateTime - startDateTime >= 0) && (endDateTime - minDateTime >= 0)) {
			isDuration = true;
		}

		days.map(val => {
			if (isDuration) {
				val.isDuration = true;			
			}

			if (val.date === startDate) {
				isDuration = true;
				val.isDuration = true;
				val.isPoint = 1;
			}

			if (val.date === endDate) {
				isDuration = false;
				val.isPoint = 3;
			}

			if (val.date === todayStr) {
				val.isToday = true;
			}

			if (notWeek) {
				if (moment(val.date).isBefore(startDate)|| moment(val.date).isAfter(endDate)) {
					val.disabled = true;
				}
			} else {
				if (!moment(val.date).isBefore(startOfWeek)) {
					val.disabled = true;
				}
			}
		});
	}

	return days;
}

/**
 * 日期类型选择组件
 */
class DateTypes extends Component {
	constructor(props) {
		super(props);
	}

	render () {
		return (
			<ul className="m-list-5">
				{
					this.props.types.map((val, index) => {
						return <li className={val.selected ? 'active '+val.class : val.class} key={index} onClick={val.func}>{val.text}</li>
					})
				}
			</ul>
		);
	}
}

DateTypes.defaultProps = {
	types: [
		{
			text: "最近7天",
			selected: false,
			func: () => {},
		},
		{
			text: "最近30天",
			selected: false,
			func: () => {}
		},
		{
			text: "日",
			selected: true,
			func: () => {}
		},
		{
			text: "周",
			selected: false,
			func: () => {}
		},
		{
			text: "月",
			selected: false,
			func: () => {}
		}
	]
};

// DateTypes.propTypes = {
// 	types: PropTypes.arrayOf(PropTypes.shape({
// 		text: PropTypes.string.isRequired,
// 		selected: PropTypes.bool.isRequired
// 	}).isRequired).isRequired
// };
// 日期类型选择组件 end
/*
* 月份选择组件
* */
class ComMonthend extends Component {
    constructor(props) {
        super(props);
    }

    render () {
        return (
			<div className="m-month-weekend">
				<div className="month">
					<span className="arrow-right" onClick={this.props.btnRightFn}>
					<Icon iconName={'ios-arrow-forward'} size={'100%'} iconColor={''} iconPadding={'0'} />
					</span>
					<span className="arrow-left" onClick={this.props.btnLeftFn}>
					<Icon iconName={'ios-arrow-back'} size={'100%'} iconColor={''} iconPadding={'0'} />
					</span>
					<span>{this.props.viewDate}</span>
				</div>
			</div>
        );
    }
}

/**
 * 周组件
 */
class ComWeekend extends Component {
	constructor(props) {
		super(props);
	}

	render () {
		return (
			<div className="m-month-weekend">
				<ul className="weekend">
					{
						this.props.week.map((val, index) => <li key={index}>{val}</li>)
					}
				</ul>
			</div>
		);
	}
}

ComWeekend.defaultProps = {
	week: [
		"日",
		"一",
		"二",
		"三",
		"四",
		"五",
		"六"
	]
};

// MonthAndWeekend.propTypes = {
// 	viewDate: PropTypes.string.isRequired,
// 	week: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
// 	btnLeftFn: PropTypes.func.isRequired,
// 	btnRightFn: PropTypes.func.isRequired
// };
// 月份和周组件 end

/**
 * 年份组件
 */
class Month extends Component {
	constructor(props) {
		super(props);
	}

	render () {
		return (
			<div className="m-month-weekend">
				<div className="month">
					<span className="arrow-right" onClick={this.props.btnRightFn}></span>
					<span className="arrow-left" onClick={this.props.btnLeftFn}></span>
					<span>{this.props.viewDate}</span>
				</div>
			</div>
		);
	}
}

// Month.propTypes = {
// 	viewDate: PropTypes.string.isRequired,
// 	btnLeftFn: PropTypes.func.isRequired,
// 	btnRightFn: PropTypes.func.isRequired
// };
// 年份组件 end

/**
 * 月份组件
 */
class Months extends Component {
	constructor(props) {
		super(props);

		this.clientPoint = {
			x: 0,
			y: 0
		};

		let iosVersion = navigator.userAgent.match(/iOS\s(\d+)\..*;\s/);
		this.iosVersion = iosVersion?iosVersion[1]:0;
	}

	handleTouchStart (e) {
		this.clientPoint.x = e.touches[0].clientX;
		this.clientPoint.y = e.touches[0].clientY;
	}

	handleTouchEnd (e, fn) {
		if (this.clientPoint.x === e.changedTouches[0].clientX && this.clientPoint.y === e.changedTouches[0].clientY) {
			fn();
		} else {
			return false;
		}
	}

	render () {
		return (
			<div className="m-months">
				{
					this.props.months.map((val, index) => {
						return (
							<div key={`year${index}`}>
								<p className="tt">{val.year}年</p>
								{
									this.iosVersion < 9 &&
									<ul className="months">
										{
											val.data.map((val, index) => {
												return (
													<li className={val.disabled && 'disabled'} key={`month-${index}`} onClick={() => this.props.handleSelectMonth(val.month)}>
														<span className={val.selected ? 'active' : ''}>{val.text}月</span>
													</li>
												);
											})
										}
									</ul> ||
									<ul className="months">
										{
											val.data.map((val, index) => {
												return (
													<li className={val.disabled && 'disabled'} key={`month-${index}`} onTouchStart={(e) => this.handleTouchStart(e)} onTouchEnd={(e) => this.handleTouchEnd(e, () => this.props.handleSelectMonth(val.month))}>
														<span className={val.selected ? 'active' : ''}>{val.text}月</span>
													</li>
												);
											})
										}
									</ul>
								}
							</div>
						);
					})
				}
			</div>
		);
	}
}

// Months.propTypes = {
	
// };
// 月份和周组件 end

/**
 * 天数组件
 */
class Days extends Component {
	constructor(props) {
		super(props);
	}

	handleSelectDay (date) {
		if (!this.props.canClick) {
			return ;
		}

		this.props.handleSelectDay(date);
	}

	render () {
		return (
			<ul className="m-days">
				{
					this.props.days.map((val, index) => {
						return (
							<li className={(val.isCurrMonth && !val.disabled) || (val.isDuration && !val.disabled) ? 'active' : ''} key={`day-${index}`} onClick={this.handleSelectDay.bind(this, val.date)}>
								<span className={["content-bg", val.isDuration ? ' active' : '', val.isPoint === 1 ? ' active-l' : '', val.isPoint === 3 ? ' active-r' : ''].join('')}>
									<span className={["content", val.isPoint !== 0 && this.props.showPoint ? ' active' : '', val.isToday ? ' today' : ''].join('')}>{val.text}</span>
								</span>
							</li>
						);
					})
				}
			</ul>
		);
	}
}

// Days.propTypes = {
// 	days: PropTypes.arrayOf(PropTypes.shape({
// 		text: PropTypes.number.isRequired,
// 		isCurrMonth: PropTypes.bool.isRequired,
// 		isDuration: PropTypes.bool.isRequired,
// 		isPoint: PropTypes.number.isRequired
// 	}).isRequired).isRequired,

// 	handleSelectDay: PropTypes.func.isRequired,
// 	canClick: PropTypes.bool.isRequired
// };
// 天数组件

/**
 * 按钮组件
 */
class BtnGroup extends Component {
	constructor(props) {
		super(props);
	}

	render () {
		return (
			<Row className="btn-group">
				<Col span={8} onClick={this.props.btnLeftFn}>
					<Buttons
						text={this.props.btnLeft}
						type={'primary'}
						size={'small'}
						plain
					/>
				</Col>
				<Col span={8} />
				<Col span={8} onClick={this.props.btnRightFn}>
					<Buttons
						text={this.props.btnRight}
						type={'primary'}
						size={'small'}
					/>
				</Col>
			</Row>
		);
	}
}

BtnGroup.defaultProps = {
	btnLeft: "取消",
	btnRight: "确定"
};

// BtnGroup.propTypes = {
// 	btnLeft: PropTypes.string.isRequired,
// 	btnRight: PropTypes.string.isRequired,
// 	btnLeftFn: PropTypes.func.isRequired,
// 	btnRightFn: PropTypes.func.isRequired
// };
// 按钮组件 end
