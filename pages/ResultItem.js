import React from 'react';
import { ScrollView, View, StyleSheet} from 'react-native';
import { ListItem, Card, Avatar} from 'react-native-elements';



const ResultItem = ({result}) => {
  return (
    <View>
      {
        result && result.map(item => (
          <ScrollView key = {item.artist_id} scrollEventThrottle>
            <ListItem>
              <Avatar source={{uri: `${item.artwork_small}`}} />
              <ListItem.Content>
              <ListItem.Title>{item.artist}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        </ScrollView>
        ))
      }
    
    </View>
  )
}

const styles = StyleSheet.create({
  cardstyle:{
    margin:0, 
    borderLeftColor: '#fff', 
    borderRightColor:'#fff',
    borderTopColor:'#fff',
    shadowOpacity:0,
    padding: 10,
  }
});

 export default ResultItem;
