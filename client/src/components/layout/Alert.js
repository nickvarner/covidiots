import React from 'react';
// use the useSelector hook whenever you want the state from the redux store
import { useSelector } from 'react-redux';
import { Alert as AlertComponent } from 'react-bootstrap';
const Alert = () => {
	const alerts = useSelector((state) => state.alert);

	const alertMessage =
		// so if alerts isn't empty and
		alerts !== null &&
		// alerts array length is greater than 0
		alerts.length > 0 &&
		// then you can map the alerts
		alerts.map((alert) => (
			<AlertComponent key={alert.id} variant={alert.alertType}>
				{alert.msg}
			</AlertComponent>
		));

	return alertMessage;
};

export default Alert;
