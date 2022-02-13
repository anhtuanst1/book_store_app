import { Fragment, useEffect, useState } from "react";

import {
  Alert
} from 'react-bootstrap';

export function AlertCommon(props) {
  const [alertInfo, setAlertInfo] = useState({is_show: false, alert_type: 'success', message: ''})

  useEffect(() => {
    setAlertInfo({is_show: props.isShow, alert_type: props.alertType, message: props.message})
  }, [])

  return (alertInfo.is_show) ? (
    <Fragment>
      <Alert variant={alertInfo.alert_type} onClose={() => setAlertInfo({...alertInfo, is_show:false})} dismissible>
        <p className="my-0">{alertInfo.message}</p>
      </Alert>
    </Fragment>
  ) : '';
}