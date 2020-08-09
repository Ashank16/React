import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';
import DishDetail from './DishdetailComponent';

class Menu extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            selectedDish: null
        };
        //console.log('hey constructor called');
    }
    
    componentDidMount() {
        //console.log('hey componentDidMount called');

    }
    
    onDishSelect(dish) {
        this.setState({ selectedDish: dish});
    }
    
    render() {
        
        const menu = this.props.dishes.map((dish) => {
            return (
                <div className="col-12 col-md-5 m-1">
                    <Card key={dish.id} onClick={() => this.onDishSelect(dish)}>
                        <CardImg width="100%" src={dish.image} alt={dish.name} />
                        <CardImgOverlay>                                               
                            <CardTitle>{dish.name}</CardTitle>
                        </CardImgOverlay>
                    </Card>
                </div>
            );
        });
        //console.log('hey i render is called');        

        return (
            <div className="container">
                <div className="row">
                    {menu}
                </div>
                <div className="row">
                    <DishDetail dish={this.state.selectedDish} />                
                </div>
            </div>
        );
    }
}

export default Menu;
