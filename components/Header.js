import React, { Component } from 'react';
import { StyleSheet} from 'react-native';
import {  Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';
export default class HeaderMultipleIconExample extends Component {
  render() {
    return (
      <Container>
        <Header>
          <Left>
        {/*   <Button transparent>
              <Icon name='menu' />
            </Button>
          */}
            <Button transparent>
              <Icon name='arrow-back' />
            </Button>
     
          </Left>
          <Body>
            <Title style={styles.headerText}> Sallikna   (RoadSide Assistemt)</Title>
           
 
          </Body>
          <Right>
            <Button transparent>
              <Icon reverse 
               name='call' 
                type='MaterialIcons' 
                color='red'
                size={20}
                 onPress={() => console.log('hello')}  />  />
            </Button>
          
          </Right>
        </Header>
      </Container>
    );
  }
}


const styles = StyleSheet.create({

  headerText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#333',
    letterSpacing: 1,
  }
})