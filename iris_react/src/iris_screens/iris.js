import React, { Component} from 'react';
import './iris.css';
import { Card, Col, Row, Form, Button} from 'react-bootstrap';

class Iris extends Component {
  state = {flower: -1, flowerName: ["Iris setosa", "Iris versicolor", "Iris virginica"]}
  prediction(e) {
    e.preventDefault();
    var obj={};
    for(var i=0; i<e.target.elements.length -1; i++){
      var el = e.target.elements[i]
      obj[el.name] = parseInt(el.value);
    }
    return fetch('http://127.0.0.1:9000/iris',{
      method:'post',
      body: JSON.stringify(obj)
    }).then(function(response){
      return response.json();
    }).then(function(data){
      this.displayResult(data)
    }.bind(this));
  }
  displayResult(data){
    console.log(data.results);
    this.setState({flower: data.results[0]})
  }
  render(){
    console.log(this.state)
    return(
      <div className="Iris">
        <Card text = "white" id = "topCard">
          <Card.Title id = "text">Iris</Card.Title>
        </Card>
        <Card text = "white" id = "bottomCard">
          <Card.Text> The Iris flower data set consits of samples 
            from each of the three species of Iris: Iris setosa, Iris virginica, and Iris versicolor. 
            The length and width of the sepals and petals in centimeters are given as input to determine the species of the flower.
            I used a random forest classifier to predict the species of flower. Random forest consits of individual decision trees that operate
            as an ensemble. Each individual tree in the random forest makes a prediction and the class with the most votes becomes the model's prediction. 
          </Card.Text>
          <Form onSubmit={ (e) => this.prediction(e) } style={{margin: "0 auto"}}>
            <Row className="inputRow"> 
              <Col>  
                  <Form.Control  className="input" placeholder="Sepal Length" name="sl"/>
              </Col>
              <Col> 
                  <Form.Control  className="input" placeholder="Sepal Width" name="sw"/>
              </Col>
            </Row>
            <Row className="inputRow">
              <Col>
                  <Form.Control className="input" placeholder="Petal Length" name="pl"/>
              </Col>
              <Col>
                  <Form.Control className="input" placeholder="Petal Width"name="pw" />
              </Col>
            </Row>
            <Button type="submit" varient = "dark" id="predictBtn" >Predict</Button>
          </Form>
          {this.state.flower >-1 &&
          <div className="flower">
            <img className= "img" src={'flowers/' + this.state.flower + '.jpg'} thumbnail/>
            <div>
              {this.state.flowerName[this.state.flower]}
            </div>
          </div>
          }
        </Card>
      </div>
    );
    
  }
}

export default Iris;
