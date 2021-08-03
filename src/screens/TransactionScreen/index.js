import React, {memo, useEffect, useState} from 'react';
import {View, ScrollView, Modal, StyleSheet} from 'react-native';
import {Colors, StyleGlobal} from '../../styles';
import {CSearch, CTrxList} from '../../component';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

const TransactionScreen = ({navigation}) => {
  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState([])
  const [modalVisible, setModalVisible] = useState(false);
  const [input, setInput] = useState('');
  const [valueRF, setValueRF] = useState(0)

  const sortBy = [
    { label: 'URUTKAN', value: 0 },
    { label: 'Nama A-Z', value: 1 },
    { label: 'Nama Z-A', value: 2 },
    { label: 'Tanggal Terbaru', value: 3 },
    { label: 'Tanggal Terlama', value: 4 }
  ];

  const fetchAPI = async () => {
    const response = await fetch('https://nextar.flip.id/frontend-test')
    const postData = response.json()
    return postData
  }

  useEffect(async () => {
    const data = await fetchAPI()  
    setData(Object.values(data))
  }, []);

  const sortName = (value) => {
    const newData = data.sort((x, y)=>{
      let a = x.beneficiary_name.toUpperCase(),
          b = y.beneficiary_name.toUpperCase();
      if(value === 1){
        return a == b ? 0 : a > b ? 1 : -1;
      } else {
        return a == b ? 0 : a < b ? 1 : -1; 
      }
    })
    setData(newData)
  }

  const sortDate = (value) => {
    const newData = data.sort((x, y) => {
      let a = new Date(x.created_at.substr(0,10))
      let b = new Date(y.created_at.substr(0,10))
      return value == 3 ? b - a : a - b
    })
    setData(newData)
  }

  const sortData = (value) => {
    setValueRF(value)
    switch (value) {
      case 1:
        sortName(1) 
        break;
      case 2:
        sortName(2) 
        break;
      case 3: 
        sortDate(3)
        break;
      case 4: 
        sortDate(4)
        break;
    }
    setModalVisible(!modalVisible)
  }

  const searchFilter = (typing) => {
    setInput(typing)
    const newData = data.filter(value => {
      if(
          value.beneficiary_name.toUpperCase().includes(input.toUpperCase()) ||
          value.beneficiary_bank.toUpperCase().includes(input.toUpperCase()) ||
          value.sender_bank.toUpperCase().includes(input.toUpperCase()) ||
          value.amount.toString().includes(input)
        ){
        return value
      }
    })
    setFiltered(newData)
  }
  return (
    <View style={StyleGlobal.container}>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <RadioForm
            animation={true}
          >
            {
              sortBy.map((obj, i) => (
                <RadioButton key={i} style={{marginVertical: 30}} >
                  <RadioButtonInput
                    obj={obj}
                    index={i}
                    onPress={()=>sortData(obj.value)}
                    borderWidth={1}
                    isSelected={ valueRF === i}
                    buttonOuterColor={Colors.red}
                    buttonInnerColor={Colors.red}
                    buttonSize={10}
                    buttonOuterSize={20}
                    buttonStyle={{}}
                    buttonWrapStyle={{marginLeft: 10}}
                  />
                  <RadioButtonLabel
                    obj={obj}
                    index={i}
                    labelHorizontal={true}
                    onPress={()=>sortData(obj.value)}
                    labelStyle={{fontSize: 20, color: 'black'}}
                    labelWrapStyle={{}}
                  />
                </RadioButton>
              ))
            }  
          </RadioForm>
          </View>
        </View>
      </Modal>

      <CSearch onChangeText={(e)=>searchFilter(e)} onPress={()=>setModalVisible(!modalVisible)} />

      <ScrollView showsVerticalScrollIndicator={false}>
        {input
          ? filtered.map((value, index) => {
              return (
                <CTrxList
                  onPress={() => navigation.navigate('Detail Transaction', value)}
                  {...value}
                  key={index}
                />
              );
            })
          : data.map((value, index) => {
              return (
                <CTrxList
                  onPress={() => navigation.navigate('Detail Transaction', value)}
                  {...value}
                  key={index}
                />
              );
            })
        }
      </ScrollView>

    </View>
  );
};

export default memo(TransactionScreen);

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    paddingVertical: 25,
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '90%'
  }
});