import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

const loginScreen = ({route}) => {
   
 const {duration} = route.params;
  console.log(duration);

  const navigation = useNavigation();
  const handleContinueClick = () => {
    // Navigate to home screen
    navigation.navigate("GuideoHomeScreen");
  };
  return (
    <View style={styles.container} >
      <Text style={styles.text}>
        <Text style={styles.textcolor}>Guidos</Text> will find you and 
        {
          "\n"
        }answer your query 💫
      </Text>

      <Text style={{
          color:"#FFF",
          fontSize:14,
          fontWeight:"bold",
          borderColor:"#FFD385",
          borderWidth:1,
          borderRadius:24,
          marginTop:50,
          textAlign:"center",
          alignItems:"center",
          justifyContent:"center",
          padding:10,
          marginHorizontal:20,
          width:200,
          textAlign:"center",
          marginLeft:99,
      }}>
        {duration.hours} hours {duration.minutes} minutes
        </Text>
        
        <View style={styles.container1}>
           <Text style={styles.text2} >
           till then act as a <Text style={{
              color:"#FFC764",
              fontWeight:"bold",
              fontSize:22,
              textAlign:"center",
              marginTop:100,
              paddingHorizontal:20,
              lineHeight:34,
            
           }}>Guido</Text>  to  get { "\n" } 
            more rewards 🎊
           </Text>
           <TouchableOpacity onPress={handleContinueClick}>
            <Text style={styles.button}>Continue</Text>
          </TouchableOpacity>
        </View>

    </View>
  )
}

export default loginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    backgroundColor:"#000"
  },
  text: {
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 220,
    paddingHorizontal: 20,
    lineHeight: 34,
  } ,
  textcolor: {
    color: '#FFC764',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 100,
    paddingHorizontal: 20,
    lineHeight: 34,
  },
  container1: {
    flex: 1,
    marginTop: 10,
  },
  text2: {
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 100,
    paddingHorizontal: 20,
    lineHeight: 34,
  } ,
  button: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
    backgroundColor:"#FFC764",
    borderRadius: 30,
    marginTop: 20,
    paddingVertical: 14,
    paddingHorizontal: 10,
    width: 200,
    alignItems: "center",
    marginHorizontal: 95,
    textAlign:"center",
  },


})