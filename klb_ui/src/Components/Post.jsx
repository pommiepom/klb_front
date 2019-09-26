import React from "react";
import API from "../module/api";
import styled from "styled-components";
import { Link } from "react-router-dom";
import moment from "moment";

const Div = styled.div`
   background-color: #ffffff;
   border: 1px solid #b8b8b8;
   padding: 15px 25px;
   color: 73777a;
`;

const Title = styled.p`
   font-weight: bold;
   margin-bottom: 0px;
`;

const StyledLink = styled(Link)`
   color: #73777a;
   :hover {
      color: #515151;
      cursor: pointer;
   }
`;

class Post extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         post: "",
         username: ""
      };
   }

   componentDidMount() {
      let config = {
         headers: {
            jwt: localStorage.getItem("jwt")
         }
      };

      API.get(`/users/${this.state.post.createdBy}`, config)
         .then(res => {
            const username = res.data.username;
            this.setState({ username })
         })
         .catch(err => {
            console.log(err)
         });
   }

   static getDerivedStateFromProps(props, state) {
      return {
         post: props.post || "",
         username: state.username || ""
      };
   }

   render() {
      return (
         <Div>
            <Title>
               <StyledLink to="/signin">{this.state.post.title}</StyledLink>
               {` [${this.state.post.category}]`}
            </Title>
            <p className="m-0">
               {`${this.state.username}`}
               <i>{` - ${moment(this.state.post.date).format("lll")}`}</i>
            </p>
         </Div>
      );
   }
}

export default Post;
