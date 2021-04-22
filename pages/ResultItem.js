import React from 'react';
import { ScrollView, View, StyleSheet} from 'react-native';
import { ListItem, Avatar} from 'react-native-elements';

import { Feather } from '@expo/vector-icons'; 


const ResultItem = ({result, showModal}) => {
  return (
    <View>
      {
        result && result.map(item => (
          <ScrollView key = {item.artist_id}>
            <ListItem onPress = {() => showModal(item.artist_id)}>
              <Avatar source={{uri: `${item.artwork_small}`}} />
              <ListItem.Content>
              <ListItem.Title>{item.artist}</ListItem.Title>
            </ListItem.Content>
            <Feather name="more-horizontal" size={20} color="black" onPress = {showModal} />
          </ListItem>
        </ScrollView>
        ))
      }
    
    </View>
  )
}

 export default ResultItem;
