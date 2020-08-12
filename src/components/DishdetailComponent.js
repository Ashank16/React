import React from 'react';
import {Card,CardImg,CardText,CardTitle,CardBody,Breadcrumb,BreadcrumbItem} from "reactstrap";
import { Link } from 'react-router-dom';

    const DishDetail = (props) => {       
        
        const {dish} = props;
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
                    <RenderDish dish={props.dish} comments={props.comments}/>
                </div>
            </div>    
        );
    }

    function RenderDish(props) { 
        
        if (props.dish!=null) {        
            return (
            <React.Fragment>
                <div className="col-12 col-md-5 m-1">
                    <Card>
                        <CardImg width="100%" src={props.dish.image} alt={props.dish.name} />
                        <CardBody>
                            <CardTitle>{props.dish.name}</CardTitle>
                            <CardText>{props.dish.description}</CardText>
                        </CardBody>
                    </Card>
                </div>
                <div className="col-12 col-md-5 m-1">
                    <h4>Comments</h4>
                    <RenderComments comments={props.comments} />
                </div>
            </React.Fragment>
            );
        }
        else {
            return (<div></div>);
        }
    }

    function RenderComments({comments}) {   

        if (comments!=null) {        
            const com = comments.map( (co) => {
                return(
                    <React.Fragment>
                        <div>
                            <li>{co.comment}</li><br />
                            <li>-- {co.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(co.date)))}</li><br />
                        </div>             
                    </React.Fragment>
                );
            }
            );
            return(
                <ul className="list-unstyled">
                    {com}
                </ul>
            )
        }
        else{
            return(<div></div>);
        }
    }
    
export default DishDetail;
