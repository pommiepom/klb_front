import React from 'react'
import API from '../module/api'
import { Badge } from 'reactstrap';
import { Row, Col } from 'reactstrap';
import styled from "styled-components";

const StyledBadge = styled(Badge)`
   color: #73777a !important;
   background-color: transparent !important;
   border: 1px solid #73777a !important;
   font-weight: normal !important;
   padding: 3px 5px !important
   :hover {
      color: #515151;
		cursor: pointer;
		text-decoration: underline
   }
`;

class File extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         fileName: ""
      };
   }

   componentDidMount() {
      const fileID = this.props.file || ""

      API.get(`/files/${fileID}`)
         .then(res => {
            const fileName = res.data[0].name
            // console.log(fileName.slice(0, -15));
            this.setState({ fileName: fileName.slice(0, -15) })
         })
         .catch(err => {
            console.log(err)
         });
   }

   render() {
      return(
         <Row>
            <Col>
               <StyledBadge>{this.state.fileName}<br /></StyledBadge>
            </Col>
         </Row>
      )
   }
}

export default File
