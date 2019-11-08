import React from 'react'
import API from '../module/api'
import { Badge } from 'reactstrap';
// import { Row, Col } from 'reactstrap';
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
         fileID: "",
         fileName: ""
      };
   }

   componentDidMount() {
      const fileID = this.props.file || ""
      
      this.setState({ fileID })

      API.get(`/files/${fileID}`)
         .then(res => {
            const fileName = res.data[0].name
            this.setState({ fileName: fileName.slice(0, -15) })
         })
         .catch(err => {
            console.error(err)
         });
   }

   showFile = () => {
      API.get(`/files/show/${this.state.fileID}`)
         .then(res => {
            const url = res.config.url
            const win = window.open(url, '_blank');
            win.focus();
         })
         .catch(err => {
            console.error(err)
         });
   }

   render() {
      return(
         <div style={{ display: "inline-block" }}>
            <StyledBadge onClick={this.showFile}>{this.state.fileName}<br /></StyledBadge>
         </div>
      )
   }
}

export default File
