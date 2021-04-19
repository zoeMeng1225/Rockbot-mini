import React,{useEffect, useState} from 'react';
import { StyleSheet, View } from 'react-native';
import { Header, Text, ListItem, Avatar, Image, Icon } from 'react-native-elements';
import Axios from 'axios';
import {BASE_URL, API_KEY} from '../constance';

import { AntDesign } from '@expo/vector-icons'; 


const Playlist = () => {
  const [playnow, setPlaynow] = useState([])
  const [queue, setQueue] = useState([])
  const url = `${BASE_URL}/now_playing?queue=1`;

 
  const getData = async() => {
     await Axios.get(url, {
      headers: {
        authorization: API_KEY
      }
    }).then(res => {
      setQueue(res.data.response.queue.map(item => {
        return{
          ...item
        }
      }))
      setPlaynow(res.data.response.now_playing)
    }).catch(e => {
      console.log(e.message)
    })
  } 


  useEffect(() => {
    getData()
    const interval = setInterval(() => {getData()}, 30000)
    return () => clearInterval(interval)
  }, [])

  


  const likehandler = id => {
    Axios.get(url, {
      headers: {
        authorization: API_KEY
      }
    }).then(res => {
      return res.data.response.queue.find(q => q?.pick_id === id)
    }).catch(e => console.log(e))
  }


  
 
  return(
   <View>
     <Header
        centerComponent= {{text: 'Mini Rockbot', style: {fontWeight: '600', fontSize: 15, color: '#fff'}}}
    />

    <View style = {styles.mainBody}>
      {
        playnow.length !== 0 && (
        <View style = {styles.artistInfo}>
            <Image source={{ uri: `${playnow.artwork_large}` }} style = {styles.artistInfoImg}></Image> 
            <View style = {styles.artistInfoText}>
              <Text h4 style = {styles.bold}>{playnow.artist}</Text>
              <Text>{playnow.song}</Text>
            </View>
          </View>
        )
      }
        
      <View style = {styles.playlist}>
        <Text h5 style = {styles.title}>Coming Up</Text>
        {
          queue.length != undefined && queue.map(item => (
            <ListItem key = {item.pick_id}>
              <Avatar source={{uri: `${item.artwork_small}`}}/>
              <ListItem.Content>
                <ListItem.Title>{item.artist}</ListItem.Title>
                <ListItem.Subtitle>{item.song}</ListItem.Subtitle>    
              </ListItem.Content>
              <AntDesign onClick = {() => {likehandler(item.pick_id)}} name="like2" size={20} color="black" /> 
              <Text>{item.likes}</Text>
            </ListItem>
          ))
      }
        
      </View>
    </View>
   </View>
  )
}


const styles = StyleSheet.create({
  artistInfo:{
    flexDirection: 'row',
    padding: 20,
  },


  artistInfoText:{
    marginLeft: 10,
    marginTop: 5
  },

  artistInfoImg:{
    width: 100, 
    height: 100,
    borderRadius:5
  },

  playlist:{
    marginTop: 20
  },

  title:{
    textDecorationLine: 'underline',
    fontWeight: '700',
    padding: 20,
  },
  
  bold: {fontWeight: '700'},


});

export default Playlist;