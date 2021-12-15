import React,{ useState, useEffect } from "react";
import { Paper} from "@material-ui/core";
import ContainerForm from './ContainerForm';
import {useStyles} from 'views/Booking/BKG/styles';

const ContainerCardBody = (props) => {
  const classes = useStyles();
  return (
        <ContainerForm
          key={"CNTR_"+props.index}
          container={props.data}
          bookmarkYn={'N'}
          {...props}
        />
  );
}

// function areEqual (prevProps, nextProps) {
//   return (     prevProps.openContainer === nextProps.openContainer
//     && prevProps.booking.bkg_no === nextProps.booking.bkg_no
//     && prevProps.booking.bkg_date === nextProps.booking.bkg_date
//     && prevProps.booking.user_no === nextProps.booking.user_no
//     && prevProps.containerList === nextProps.containerList
//     && prevProps.containerBookmarkList === nextProps.containerBookmarkList
//     && prevProps.specialBookmarkList === nextProps.specialBookmarkList
//     && prevProps.cntrCodeLineCodeList === nextProps.cntrCodeLineCodeList
//     && prevProps.booking.trans_service_code === nextProps.booking.trans_service_code
//     && prevProps.containerSpecialList === nextProps.containerSpecialList
//     && prevProps.lineCodeVesselPickup === nextProps.lineCodeVesselPickup
//     // bookmark
//     && prevProps.booking.bookmark_seq === nextProps.booking.bookmark_seq
//     && prevProps.booking.other_bookmark_seq === nextProps.booking.other_bookmark_seq
//     && prevProps.booking.cargo_bookmark_seq === nextProps.booking.cargo_bookmark_seq
//     && prevProps.booking.line_bookmark_seq === nextProps.booking.line_bookmark_seq
//     && prevProps.booking.consignee_bookmark_seq === nextProps.booking.consignee_bookmark_seq
//     && prevProps.booking.container_bookmark_seq === nextProps.booking.container_bookmark_seq
//     && prevProps.booking.document_bookmark_seq === nextProps.booking.document_bookmark_seq
//     && prevProps.booking.forwarder_bookmark_seq === nextProps.booking.forwarder_bookmark_seq
//     && prevProps.booking.schedule_bookmark_seq === nextProps.booking.schedule_bookmark_seq
//     && prevProps.booking.shipper_bookmark_seq === nextProps.booking.shipper_bookmark_seq
//     && prevProps.booking.transport_bookmark_seq === nextProps.booking.transport_bookmark_seq
//   )
// }

export default ContainerCardBody;