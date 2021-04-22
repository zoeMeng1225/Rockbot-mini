import React,{useState} from 'react';
import { View, StyleSheet,Image, TouchableOpacity, Alert} from "react-native";
import {ListItem, Avatar, Text} from 'react-native-elements'
import { Entypo } from '@expo/vector-icons'; 
import Axios from 'axios';
import {BASE_URL, API_KEY} from '../constance';

const SimpleIma = "https://i.pinimg.com/236x/f7/c8/e3/f7c8e3169d360dd096e3f79b772124e4.jpg";



const ArtistList = ({route}) => {
  const [alert, setAlert] = useState(false);
  const artist = route?.params?.artist;
  
  const addQueue = id => {
    const ART_URL = `${BASE_URL}/request_artist?artist_id=${id}`;
    Axios.post(ART_URL, {}, {
      headers: {
        authorization: API_KEY
      }
    }).then(res => {
     res.data.response.queue.push(route.params.artist)
     careteAlert();
     console.log(res.data.response.queue)
    }).catch(e => console.log('song', e))
  }

  const careteAlert = () =>
    Alert.alert(
      "Successfully",
      "Added the song to the Queue!",
      [
        { text: "OK", onPress: () => CloseAlert() }
      ]
    );

  
  const CloseAlert = () => {
    setAlert(false);
  }
  

  return(
    <View>
      <View style = {styles.card}>
        <Image source = {{uri: `${artist?.artwork_large}`}} style = {styles.modalbg}/>
        <View style = {{flexDirection:'row', alignItems:'baseline'}}>
          <Text h3 style={{padding:10}}>{artist?.artist}</Text>
          <Text h5 style={{padding:10}}>{artist?.likes} People like</Text>

        </View>
      </View>
        <Text h5 style={{padding:10, fontWeight:"800"}}>Top song</Text>
        <ListItem bottomDivider>
        <Avatar source = {{uri: `${artist?.user_image_large}`}} />
          <ListItem.Content>
            <ListItem.Title>{artist?.song}</ListItem.Title>
            <ListItem.Subtitle>Current User: {artist?.user}</ListItem.Subtitle>
          </ListItem.Content>
          <TouchableOpacity onPress= {() => addQueue(artist?.artist_id)}>
            <Entypo name="add-to-list" size={20} color="black" />
          </TouchableOpacity>
      </ListItem>
    </View>
    )
}

const styles = StyleSheet.create({
  modalbg:{
    height:300,
    width:'100%'    
  },
  card:{
    marginBottom:10,
    alignItems: 'flex-start',
    justifyContent: 'center'
    
  }
});

export default ArtistList