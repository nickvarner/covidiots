import React from 'react';
// use the useSelector hook whenever you want the state from the redux store
import { useSelector } from 'react-redux';

const Alert = () => {
	const alerts = useSelector((state) => state.alert);

	const alertMessage =
		// so if alerts isn't empty and
		alerts !== null &&
		// alerts array length is greater than 0
		alerts.length > 0 &&
		// then you can map the alerts
		alerts.map((alert) => (
			<div key={alert.id} className={`alert alert-${alert.alertType}`}>
				{alert.msg}
			</div>
		));

	return alertMessage;
};

export default Alert;
