import React from 'react';
import moment from 'moment';

const AlertModal = (props) => {
  console.log(props);
  return (
    <div>
      <div class="btn">
        <div class="alert alert-warning" role="alert" data-toggle="modal"
          data-target="#alertModal">
          {props.event}
        </div>
      </div>

      <div class="modal fade" id="alertModal" role="dialog">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Alert</h4>
              <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>
            <div class="modal-body">
              <p>{props.event}</p>
              <p>From {moment.unix(props.start).format("llll")}</p>
              <p>Till {moment.unix(props.end).format("llll")}</p>
              <p>{props.description}</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AlertModal;