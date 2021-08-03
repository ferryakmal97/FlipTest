import React, { memo } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ToastAndroid} from 'react-native';
import {Colors} from '../../styles';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { CText } from '../../component';
import { convertDate, numberWithCommas } from '../../helper';
import Clipboard from '@react-native-clipboard/clipboard';

const DetailScreen = ({route, navigation}) => {
  const {
    account_number,
    amount,
    beneficiary_bank,
    beneficiary_name,
    completed_at,
    created_at,
    fee,
    id,
    remark,
    sender_bank,
    status,
    unique_code,
  } = route.params;
  
  const copyToClipboard = () =>{
    Clipboard.setString(id)
    ToastAndroid.showWithGravity(
      "ID TRANSAKSI Berhasil di-copy",
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <View style={[styles.title, {borderBottomWidth: 0.2, borderColor: 'grey'}]}>
          <CText bold text={`ID TRANSAKSI: #${id}`} />
          <TouchableOpacity onPress={copyToClipboard}>
           <MCIcon name="content-copy" size={24} color={Colors.red} />
          </TouchableOpacity>
        </View>
        <View
          style={[
            styles.title,
            {justifyContent: 'space-between', borderBottomWidth: 0.4},
          ]}>
          <CText text='DETAIL TRANSAKSI' bold />
          <TouchableOpacity onPress={()=>navigation.goBack()}>
            <Text style={{
              color: Colors.red, 
              fontWeight: 'bold',
              fontSize: 16,
              marginRight: 8
            }}>Tutup</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.box2}>
        <View style={styles.title}>
          <CText text={beneficiary_bank} bold title />
          <Fontisto name='arrow-right' size={16} style={{marginHorizontal: 6}} />
          <CText text={sender_bank} bold title />
        </View>
        <View style={[styles.list, {paddingVertical: 0}]}>
          <View>
            <CText bold text={beneficiary_name.toUpperCase()} />
            <CText text={account_number} />
          </View>
          <View style={{width: '35%'}}>
            <CText bold text='NOMINAL' />
            <CText text={`Rp${numberWithCommas((amount))}`} />
          </View>
        </View>
        <View style={styles.list}>
          <View>
            <CText bold text='BERITA TRANSFER' />
            <CText text={remark} />
          </View>
          <View style={{width: '35%'}}>
            <CText bold text='KODE UNIK' />
            <CText text={unique_code.toString()} />
          </View>
        </View>
        <View style={[styles.list, {paddingTop: 0}]}>
          <View>
            <CText bold text='WAKTU DIBUAT' />
            <CText text={`${convertDate(new Date(created_at.substr(0,10)))}`} />
          </View>
        </View>
      </View>
    </View>
  );
};

export default memo(DetailScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  box: {
    backgroundColor: 'white',
    marginTop: 10,
  },
  title: {
    paddingHorizontal: 16,
    paddingVertical: 22,
    flexDirection: 'row',
    alignItems: 'center',
  },
  box2: {
    backgroundColor: 'white'
  },
  list: {
    paddingHorizontal: 16,
    paddingVertical: 22,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 50
  }
});
