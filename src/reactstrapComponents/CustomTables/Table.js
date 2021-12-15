import React from "react";
// reactstrap components
import {
   // Button,
    //ButtonGroup,
    Label,
    FormGroup,
    Input,
    Table,
    //Container,
    //Row,
    //Col,
    //UncontrolledTooltip,
  } from "reactstrap";

export default function CustomTables (props) {
    const {tableHeader,tableDetail} = props;

    return (
        <>
            <Table responsive striped>
                <thead>
                  <tr>
                      {tableHeader.map((data,key) => 
                        <th key={key}>{data}</th>
                      )} 
                  </tr>
                </thead>
                <tbody>
                    {tableDetail.map((data,key,index) => 
                        <tr key={key}>
                        <td>
                            <FormGroup check>
                                <Label check>
                                <Input defaultValue="" type="checkbox" />
                                <span className="form-check-sign" />
                                </Label>
                            </FormGroup>
                        </td>
                        <td>{data[0]}</td>
                        <td>{data[1]}</td>
                    </tr>
                    )}
                </tbody>
              </Table>
              </>
    );
}