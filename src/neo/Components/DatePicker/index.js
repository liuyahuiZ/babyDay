import React from 'react'; // 引入 react
import { Component, PropTypes } from 'react';
import  DatePickerCom  from './date_picker'; // 引入组件
import { getDefaultDate, formatViewMonth, formatViewDate, addListenerForWebviewDidAppear, getLastDate} from '../../utils/date'
import '../Style/datePicker.scss';
import Icon from '../Icon';

class DatePicker extends Component {
    constructor(props) {
        super(props);
        this.state={
            datePickerVisible:false
        }
    }

    componentDidMount () {
        this.backFromDatePicker();
    }

    backFromDatePicker () {
        addListenerForWebviewDidAppear(() => {
            const date = Storage.getItem('datePicker');

            if (date && date.selected) {
                this.props.handleDateChange && this.props.handleDateChange(date);

                Storage.removeItem('datePicker');
            }
        });
    }

    openDatePicker () {
        //打开前调用
        if(this.props.handleDateBefore)
            this.props.handleDateBefore()
        this.setState({
            datePickerVisible:true
        })
    }
    dataPickerCallback(data){
        this.props.callback(data);
        this.setState({
            datePickerVisible:false
        })
    }
    lastDatePicker(){
        if(this.props.startDate!=this.props.endDate) return
        let date=getLastDate(this.props.startDate)
        this.props.callback(
            {
                selected: true,
                startDate:date,
                endDate: date,
                type: 2
            }
        );
    }
    nextDatePicker(){
        if(this.props.allowToday){
            if(this.props.startDate!=this.props.endDate || this.props.startDate==getRecentDate()) return
        }else{
            if(this.props.startDate!=this.props.endDate || this.props.startDate==getDefaultDate()) return
        }
        let date=getNextDate(this.props.startDate)
        this.props.callback(
            {
                selected: true,
                startDate: date,
                endDate: date,
                type: 2
            }
        );
    }
    getLiClass(isNext){
        let className="per3"
        if(this.props.startDate==this.props.endDate){
            className+=" show"
        }
        if(this.props.allowToday){
            if(isNext &&  this.props.startDate==getRecentDate()){
                className+=" deny"
            }
        }else{
            if(isNext &&  this.props.startDate==getDefaultDate()){
                className+=" deny"
            }
        }
        return className

    }
    render () {
        if(this.props.simple)
            return(
                <div className={`com-datepick ${this.props.className||''}`}>
                    <div className="inside" onClick={this.openDatePicker.bind(this)}>
                        <span>{this.props.btnText||formatViewDate(this.props.startDate, this.props.endDate)}</span>
                    </div>
                    <DatePickerCom
                        query={{
                            start_date: this.props.startDate,
                            end_date: this.props.endDate,
                            date_type: this.props.dateType,
                            allow_today: this.props.allowToday,
                        }}
                        closeCom={function(){
                            this.setState({
                                datePickerVisible:false
                            })
                        }.bind(this)}
                        callback={this.dataPickerCallback.bind(this)}
                        visible={this.state.datePickerVisible}
                    ></DatePickerCom>
                </div>
            )
        else if(this.props.month)
            return(
                <div className="com-datepick">
                    <ul className="m-nav clearfix">
                        <li className="per1 down" onClick={this.openDatePicker.bind(this)}>
                            <span>{formatViewMonth(this.props.startDate)}</span>
                        </li>
                    </ul>
                    <DatePickerCom
                        query={{
                            start_date: this.props.startDate,
                            end_date: this.props.endDate,
                            date_type: this.props.dateType,
                            allow_today: this.props.allowToday,
                            hide_type:true
                        }}
                        closeCom={function(){
                            this.setState({
                                datePickerVisible:false
                            })
                        }.bind(this)}
                        className={this.props.className}
                        callback={this.dataPickerCallback.bind(this)}
                        visible={this.state.datePickerVisible}
                    ></DatePickerCom>
                </div>
            );
        else if(this.props.date)
            return(
                <div className="com-datepick">
                    <div className="inside" onClick={this.openDatePicker.bind(this)}>
                        <span>{this.props.btnText||formatViewDate(this.props.startDate, this.props.endDate)}</span>
                    </div>
                    <DatePickerCom
                        query={{
                            start_date: this.props.startDate,
                            end_date: this.props.endDate,
                            date_type: this.props.dateType,
                            allow_today: this.props.allowToday,
                            hide_type:true
                        }}
                        closeCom={function(){
                            this.setState({
                                datePickerVisible:false
                            })
                        }.bind(this)}
                        className={this.props.className}
                        callback={this.dataPickerCallback.bind(this)}
                        visible={this.state.datePickerVisible}
                    ></DatePickerCom>
                </div>
            );
        else
            return (
                <div className="com-datepick">
                    <ul className="m-nav clearfix">
                        <li className={this.getLiClass()} onClick={this.lastDatePicker.bind(this)}>
                         <Icon iconName={'ios-arrow-back'} size={'100%'} iconColor={''} iconPadding={'0'} /> 前一天
                        </li>
                        <li className="per3 down" onClick={this.openDatePicker.bind(this)}>
                            {formatViewDate(this.props.startDate, this.props.endDate)}
                        </li>
                        <li className={this.getLiClass(true)} onClick={this.nextDatePicker.bind(this)}>
                            后一天 <Icon iconName={'ios-arrow-forward'} size={'100%'} iconColor={''} iconPadding={'0'} />
                        </li>
                    </ul>
                    <DatePickerCom
                        query={{
                            start_date: this.props.startDate,
                            end_date: this.props.endDate,
                            date_type: this.props.dateType,
                            allow_today: this.props.allowToday,
                        }}
                        closeCom={function(){
                            this.setState({
                                datePickerVisible:false
                            })
                        }.bind(this)}
                        callback={this.dataPickerCallback.bind(this)}
                        visible={this.state.datePickerVisible}
                    ></DatePickerCom>
                </div>
            );
    }
}
DatePicker.defaultProps = {
    allowToday: false,
    handleDateChange: function () {}
};
// DatePicker.propTypes = {
// 	startDate: PropTypes.string.isRequired,
// 	endDate: PropTypes.string.isRequired,
// 	dateType: PropTypes.number.isRequired,
// 	handleDateChange: PropTypes.func
// };

export default DatePicker;