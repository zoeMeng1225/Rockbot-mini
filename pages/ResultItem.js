import React from 'react';
import { ScrollView, View, TouchableHighlight} from 'react-native';
import { ListItem, Avatar} from 'react-native-elements';

import { Feather } from '@expo/vector-icons'; 



const ResultItem = ({result, showModal}) => {
  return (
    <View>
        <ScrollView>
          {result && result.map(item => (
            <TouchableHighlight key = {item.artist_id}>
              <ListItem onPress = {() => showModal(item.artist_id)}>
                <Avatar source={{uri: `${item.artwork_small}`}} />
                <ListItem.Content>
                  <ListItem.Title>{item.artist}</ListItem.Title>
                </ListItem.Content>
                <Feather name="more-horizontal" size={20} color="black" onPress = {showModal} />
              </ListItem>
            </TouchableHighlight>
          ))}
        </ScrollView>
    </View>
  )}

 export default ResultItem;
