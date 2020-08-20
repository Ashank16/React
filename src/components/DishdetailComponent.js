import React, { Component } from 'react';
import {Card,CardImg,CardText,CardTitle,CardBody,Breadcrumb,BreadcrumbItem,Button,Modal,ModalHeader,
        ModalBody,Label,Col,Row} from "reactstrap";
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);

class CommentForm extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false
        };
        
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });     
    }
    
    handleSubmit(values) {
        this.toggleModal();
        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
    }
    
    render() {
        return(
            <React.Fragment>
                <Button outline onClick={this.toggleModal}>
                    <span className="fa fa-pencil fa-lg"></span> Submit Comment
                </Button>

                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <div className="col-12">
                            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                                <Row className="form-group">
                                    <Label htmlFor="rating" className="col-12">Rating</Label>
                                    <Col>
                                        <Control.select model=".rating" name="rating"
                                            className="form-control" >
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </Control.select>
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="author" className="col-12">Your Name</Label>
                                    <Col>
                                        <Control.text model=".author" id="author" name="author" 
                                            placeholder="Your Name" 
                                            className="form-control"
                                            validators={{
                                                required, minLength: minLength(3),
                                                maxLength: maxLength(15)  
                                            }} 
                                        />
                                        <Errors
                                            className="text-danger" 
                                            model=".author"
                                            show="touched"
                                            messages={{
                                                required: 'Required',
                                                minLength: 'Must be greater than 2 characters',
                                                maxLength: 'Must be 15 characters or less'
                                            }}
                                        />
                                    </Col>
                                </Row> 
                                <Row className="form-group">
                                    <Label htmlFor="comment" className="col-12">Comment</Label>
                                    <Col>
                                        <Control.textarea model=".comment" id="comment" name="comment" 
                                            rows="6" 
                                            className="form-control" />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Col >
                                        <Button type="submit" color="primary">
                                            Submit
                                        </Button>
                                    </Col>
                                </Row>
                            </LocalForm> 
                        </div>
                    </ModalBody>
                </Modal>  
            </React.Fragment>
        );
    }
}

    const DishDetail = (props) => {  
        if (props.isLoading) {
            return (
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (props.errMess) {
            return (
                <div className="container">
                    <div className="row">
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        }
        else if (props.dish != null) {
            return ( 
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>{props.dish.name}</h3>
                            <hr />
                        </div>
                    </div>
                    <div className="row">
                        <RenderDish dish={props.dish} comments={props.comments} 
                        postComment={props.postComment} dishId={props.dish.id} />
                    </div>
                </div>    
            );
        }
    }
    

    function RenderDish(props) { 
        
        if (props.dish!=null) {        
            return (
            <React.Fragment>
                <div className="col-12 col-md-5 m-1">
                    <FadeTransform in 
                        transformProps={{
                            exitTransform: 'scale(0.5) translateY(-50%)'    
                        }}>
                        <Card>
                            <CardImg width="100%" src={baseUrl + props.dish.image} alt={props.dish.name} />
                            <CardBody>
                                <CardTitle>{props.dish.name}</CardTitle>
                                <CardText>{props.dish.description}</CardText>
                            </CardBody>
                        </Card>
                    </FadeTransform>
                </div>
                <div className="col-12 col-md-5 m-1">
                    <h4>Comments</h4>
                    <RenderComments comments={props.comments} postComment={props.postComment}
                                    dishId={props.dish.id} />
                </div>
            </React.Fragment>
            );
        }
        else {
            return (<div></div>);
        }
    }

    function RenderComments({comments, postComment, dishId}) {   

        if (comments!=null) {        
            const com = comments.map( (co) => {
                return(
                    <React.Fragment>
                        <div>
                            <Fade in>                                     
                                <li>{co.comment}</li><br />
                                <li>-- {co.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(co.date)))}</li><br /> 
                            </Fade>
                        </div>  
                    </React.Fragment>
                );
            }
            );
            return(
                <ul className="list-unstyled">
                    <Stagger in>                                          
                        {com}
                        <CommentForm dishId={dishId} postComment={postComment} />
                    </Stagger>  
                </ul>

            )
        }
        else{
            return(<div></div>);
        }
    }
    
export default DishDetail;
