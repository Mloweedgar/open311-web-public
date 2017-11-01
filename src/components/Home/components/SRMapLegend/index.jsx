import React, { Component } from 'react';
import styles from './styles.scss';
import classnames from 'classnames/bind';
import MapKey from './mapKey';
import { connect } from 'react-redux';
import { getServices, toggleService, getServiceRequests } from 'actions';
const cx = classnames.bind(styles);



class SRMapLegend extends Component {
    constructor() {
        super();
        this.handleMapKeyClicked = this.handleMapKeyClicked.bind(this);
    }

    componentDidMount() {
        this.props.getServices();
    }

    handleMapKeyClicked(id) {
        this.props.toggleService(id);
        const selectedMapKeys = this.props.mapKeys.filter(mapKey => mapKey.selected);

        this.props.getServiceRequests(selectedMapKeys.map(mapKey => mapKey.id));
    }

    render() {
        const { mapKeys } = this.props;
        if (mapKeys.length) {
            return (
                <div className={cx('legend')}>
                    {
                        mapKeys.map(mapKey => (<MapKey key={mapKey.id} mapKey={mapKey} onMapKeyClicked={this.handleMapKeyClicked} />))
                    }
                </div>
            );
        }

        return null;
    }


}

const mapStateToProps = (state) => {
    return {
        mapKeys: state.services
    };
};

export default connect(mapStateToProps, { getServices, toggleService, getServiceRequests })(SRMapLegend);

