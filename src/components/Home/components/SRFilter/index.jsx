import React, { Component } from 'react';
import styles from './styles.scss';
import classnames from 'classnames/bind';
const cx = classnames.bind(styles);
import Select from 'react-select';
import Status from './status';
import { connect } from 'react-redux';
import { toggleJurisdiction, toggleStatus, getServiceRequests, resetSearchTicketNum } from 'actions';


class SRFilter extends Component {
    constructor() {
        super();
        this.state = { hideFilterContent: true, statuses: [] };
        this.toggleFilterContent = this.toggleFilterContent.bind(this);
        this.areaChangeHandler = this.areaChangeHandler.bind(this);
        this.statusChangeHandler = this.statusChangeHandler.bind(this);
    }

    toggleFilterContent() {
        this.setState({
            hideFilterContent: !this.state.hideFilterContent
        });
    }
    /**
     * This function is fired when jurisdiction/area select box
     * change
     * 
     * @param {[Object]} selected ~ An array of selected areas as
     *  seen from select box [{label, value}] 
     * @memberof SRFilter
     */
    areaChangeHandler(selected) {
        let changed = ''; // variable to hold changed jurisdiction
        if (!this.state.selectedArea) {
            changed = selected[0].value;
        } else {
            selected.forEach(item => {
                if (!this.state.selectedArea.includes(item)) {
                    //There is new added item
                    changed = item.value;
                }
            });
            this.state.selectedArea.forEach(item => {
                if (!selected.some(selectItem => selectItem.value === item.value)) {
                    //There is an item removed
                    changed = item.value;
                }
            });
        }
        this.setState({ selectedArea: selected });
        this.props.toggleJurisdiction(changed);
        this.props.resetSearchTicketNum();
        this.props.getServiceRequests();
    }

    /**
     * 
     * 
     * @param {String} id ~ id of selected status 
     * @memberof SRFilter
     */
    statusChangeHandler(id) {
        this.props.toggleStatus(id);
        this.props.resetSearchTicketNum();
        this.props.getServiceRequests();
    }

    render() {
        const { hideFilterContent, selectedArea } = this.state;
        const { areas, statuses } = this.props;
        const areaOptions = areas.map(jurisdiction => {
            return {
                label: jurisdiction.name,
                value: jurisdiction.id
            };
        });


        return (
            <div className={cx('filterContainer')}>
                <div className={cx('filterBtn')} title='More Filters' onClick={this.toggleFilterContent}>
                    {/* <i className={cx('fa', 'fa-filter', 'fa-2x')} aria-hidden="true"></i> */}
                </div>
                <div className={cx('filterContent', { 'hide': hideFilterContent })} >
                    <Select
                        onChange={this.areaChangeHandler}
                        options={areaOptions}
                        value={selectedArea}
                        multi={true}
                        placeholder='Select Area'
                    />
                    <div className={cx('statusFilter')}>
                        {
                            statuses.map(status => (
                                <Status key={status.name} status={status} onStatusClicked={this.statusChangeHandler} />
                            ))
                        }
                    </div>
                </div>
            </div >
        );
    }
}

const mapStateToProps = state => {
    return {
        areas: state.jurisdictionFilter.jurisdictions,
        statuses: state.statusFilter.statuses
    };
};

export default connect(mapStateToProps, { toggleJurisdiction, toggleStatus, getServiceRequests, resetSearchTicketNum })(SRFilter);