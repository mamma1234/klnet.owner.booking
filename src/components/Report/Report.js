import React, { useEffect } from 'react';

import queryString from "query-string";

const Report = props => {

    useEffect(()=>{
        const params = queryString.parse(props.location.search);

        let addr = window.location.href;
        let url = '';
        if( addr.indexOf('localhost') >= 0
            || addr.indexOf('dev.plismplus') >= 0 ) {
            url = 'https://dev.plismplus.com';
            // url = 'http://localhost:5000';
        } else {
            url = 'https://plismplus.com';
        }
        // window.location.href="http://localhost:5000/api/reportViewer?file_id="+params.file_id
        window.location.href=url+"/shipper/reportViewer?file_id="+params.file_id
        +'&system_id='+params.system_id
        +'&user_id='+params.user_id
        +'&file_type='+params.file_type
        +'&file_path='+params.file_path
        +'&name='+params.name
        +'&connection='+params.connection
        +'&parameters='+params.parameters
    },[props])
    
    return (
        <div>
            <form id="reportForm" name="reportForm" method="post">
                <input type="hidden" name="system_id"   value="plismplus" />
                <input type="hidden" name="user_id"     value="M000008" />
                <input type="hidden" name="file_type"   value="pdf" />
                <input type="hidden" name="file_id"     value="" />
                <input type="hidden" name="file_path"   value="" />
                <input type="hidden" name="name"        value="" />
                <input type="hidden" name="connection"  value="pgsql" />
                <input type="hidden" name="parameters" id="parameters"/>
            </form>
        </div>
      );
}

export default Report;