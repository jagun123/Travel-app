import { AntDesign } from "@expo/vector-icons";
import * as React from "react";
import {
  FlatList,
  ScrollView,
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import { Octicons } from '@expo/vector-icons';
import { useState } from "react";
import Modal from "react-native-modal";
import { firebase } from "@react-native-firebase/auth";
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../AuthProvider";
import AsyncStorage from '@react-native-async-storage/async-storage';


function MyComponent(props) {

  const { route } = props;
  const { userInfo , location} = route.params;
  console.log(userInfo , location);
    const { setIsLoggedIn } = React.useContext(AuthContext);


  const storeToken = async (token) => {
    try {
      await AsyncStorage.setItem('@token', token);
    } catch (e) {
      console.error('Error storing token:', e);
    }
  };

  const login = async () => {
    setIsLoggedIn(true);
    storeToken(userInfo);
  };


  
  const navigation = useNavigation();

  const tags = [
    {
      id: 1,
      name: "Cafes & pubs",
    },
    {
      id: 2,
      name: "Resorts",
    },
    {
      id: 3,
      name: "Hotels",
    },
    {
      id: 4,
      name: "Social Events",
    },
    {
      id: 5,
      name: "Tourist Spots",
    },
  ];
  
  const [selectedIds, setSelectedIds] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const renderItem = ({ item }) => {
    const isSelected = selectedIds.includes(item.id);
    const backgroundColor = isSelected ? "#334B5C" : "#000";
    const color = isSelected ? "white" : "white";
    return (
      <TouchableOpacity onPress={() => handleTagSelection(item.id)}>
        <View
          style={[
            styles.item,
            { backgroundColor },
            {
              borderColor: "#DDD",
              borderWidth: 1,
              borderRadius: 30,
              padding: 10,
              margin: 10,
              alignItems: "center",
              justifyContent: "center",
              width: 150,
              height: 40,
              marginLeft: 24,
            },
          ]}
        >
          <Text style={[styles.title, { color }]}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const handleTagSelection = (tagId) => {
    const updatedIds = selectedIds.includes(tagId)
      ? selectedIds.filter((id) => id !== tagId)
      : [...selectedIds, tagId];
    setSelectedIds(updatedIds);
  };

  const handleContinueClick = async () => {
    if (selectedIds.length === 0) {
      // Show a message or alert that at least one tag must be selected
      return;
    }

    if (selectedIds.length === 1) {
      setModalVisible(true);
      return;
    }
      
    await addTagsToFirestore();

  };

    const addTagsToFirestore = async () => {
        const selectedTags = tags.filter((tag) => selectedIds.includes(tag.id));
         // add the selected tags 
         const data = await firestore().collection('users').doc(userInfo).set({
          tags: selectedTags,
          location: location,
        });
        console.log(data);
        navigation.navigate("GuideoTabScreen");
        
    }
    



  return (
    <View style={styles.view1}>
       <View style={styles.entypoContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={24} color="gray" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.view8}>
        <Text style={styles.heading} >Power up your profile!</Text>
      </View>
      <View style={styles.view9}>
        <Text style={styles.subHeading}>Choose tags that match your expertise and interests</Text>
      </View>
      <View style={styles.view10}>
        <Text style={styles.subHeading} >You can select more than one tag</Text>
      </View>

      <View style={styles.view11}>
        <FlatList
          data={tags}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          extraData={selectedId}
          numColumns={2}
        />
      </View>
      <View style={styles.view18}>
        <View style={styles.view19}>
        <Octicons name="stop" size={24} color="gray" />
          <View style={styles.view20}>
            <Text style={{
              color:'gray'
            }}>Tags match you with Exploros in your {`\n`} expertise zones. </Text>
          </View>
        </View>
      </View>
      {modalVisible && (
        <Modal
          isVisible={modalVisible}
          onBackdropPress={() => setModalVisible(false)}
        >
          <View style={styles.modal}>
            <Text style={styles.modalText}>
            You can select more than {"\n"}
             one tag
            </Text>
            <Text style={styles.modalText1}>
            Tags match you with Exploros in your expertise zones. 
            </Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>Select More</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      )}
      <TouchableOpacity onPress={handleContinueClick}>
        <View style={styles.buttonContainer}>
          <Text style={styles.button}>Continue</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default MyComponent;

const styles = StyleSheet.create({
    view1: {
        flex: 1,
        backgroundColor: "#000",
        paddingVertical: 64,
    },
    entypoContainer: {
        marginTop: 30,
        paddingHorizontal: 20,
        alignItems: "flex-start",
    },
    view8: {
        width: 375,
        height: 40,
        marginTop: 20,
        marginLeft: 20,
    },

     heading: {
        color: "#fff",
        paddingHorizontal: 5,
        fontWeight: "900",
        fontSize: 25,
        lineHeight: 34,
    },
    view9: {
        width: 375,
        height: 40,
        marginTop: 10,
        marginLeft: 20,
    },
    subHeading :{
        color: "#8E8E8E",
        paddingHorizontal: 5,
        fontWeight: "300",
        fontSize: 16,
        lineHeight: 19,
    },
    view10: {
        width: 375,
        height: 40,
        marginTop: 10,
        marginLeft: 20,
    },
    view11: {
       flexDirection: "row",
        
    },
    view12: {
        width: 160,
        height: 40,
       
        marginTop: 10,
        marginLeft: 20,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
        borderColor: "#DDD",
        borderWidth: 1,

    },
    view13: {
        width: 160,
        height: 40,
        marginTop: 10,
        marginLeft: 20,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
        borderColor: "#DDD",
        borderWidth: 1,
    },
    view14: {
        flexDirection: "row",
    },
    view15: {
        width: 120,
        height: 40,
         marginTop: 10,
        marginLeft: 20,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
        borderColor: "#DDD",
        borderWidth: 1,
    },
    view16: {
        width: 160,
        height: 40,
        marginTop: 10,
        marginLeft: 20,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
        borderColor: "#DDD",
        borderWidth: 1,
    },
    view17: {
        width: 160,
        height: 40,
        marginTop: 10,
        marginLeft: 20,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
        borderColor: "#DDD",
        borderWidth: 1,
    },
     // make them in one view
    view18: {

        backgroundColor: "#212121",
        borderRadius: 10,
        marginTop: 169,
        paddingVertical: 14,
        paddingHorizontal: 20,
        
        marginHorizontal: 20,
       
        
    },
    view19: {
        flexDirection: "row",
        
    },

    view20: {
      marginLeft: 10,
     
    },

    buttonContainer: {
        backgroundColor: "#0C8CE9",
        borderRadius: 10,
        marginTop: 29,
        paddingVertical: 14,
        paddingHorizontal: 20,
        alignItems: "center",
        marginHorizontal: 20,
      },
        button: {
            color: "#fff",
            fontWeight: "500",
            fontSize: 16,
        },

        modal: {
            backgroundColor: "#2D2D2D",
            borderRadius: 10,
            padding: 20,
            alignItems: "center",
        },
        modalText: {
            color: "#fff",
            fontWeight: "500",
            fontSize: 20,
            marginRight: 35,
            
        },
        modalText1: {
            color: "gray",
            fontWeight: "500",
            fontSize: 16,
            marginTop: 20,
            
        },
        modalButton: {
            backgroundColor: "#0C8CE9",
            borderRadius: 10,
            marginTop: 29,
            paddingVertical: 14,
            paddingHorizontal: 25,
            alignItems: "center",
            marginHorizontal: 20,
        },
        modalButtonText: {
            color: "#fff",
            fontWeight: "500",
            fontSize: 16,
        },
        item: {
            padding: 10,
            marginVertical: 8,
            marginHorizontal: 16,
          },
          title: {
            fontSize: 12,
          },


    
});



