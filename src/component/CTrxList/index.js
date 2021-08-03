import React, { memo } from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Octicons from 'react-native-vector-icons/Octicons';
import { Colors } from '../../styles';
import { CText } from '../';
import { convertDate, numberWithCommas } from '../../helper';

const CTrxList = ({
  beneficiary_bank = 'Beneficiary',
  sender_bank = 'Sender',
  amount = 'amount',
  created_at = '2021-07-15 14:59:11',
  beneficiary_name = 'beneficiary_name',
  status = 'SUCCESS',
  onPress
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, {borderLeftColor: status!='SUCCESS' ? Colors.red : Colors.green}]}>
      <View style={{flex:1}}>
        <View style={{flexDirection: 'row', alignItems:'center'}}>
          <CText text={beneficiary_bank} bold title />
          <Fontisto name='arrow-right' size={16} style={{marginHorizontal: 6}} />
          <CText text={sender_bank} bold title />
        </View>
        <CText text={beneficiary_name} title />
        <View style={{flexDirection: 'row', alignItems:'center'}}>
          <CText text={`Rp${numberWithCommas((amount))}`} />
          <Octicons name="primitive-dot" size={16} style={{marginHorizontal: 6}} />
          <CText text={`${convertDate(new Date(created_at.substr(0,10)))}`} />
        </View>
      </View>
      <View style={{justifyContent: 'center'}}>
        { status === 'SUCCESS'
          ? <View style={[styles.button, {backgroundColor: Colors.green}]}>
              <CText text="Berhasil" white bold small />
            </View>
          : <View style={[styles.button, {borderColor: Colors.red, borderWidth:2}]}>
              <CText text="Pengecekan" bold small />
            </View>
        }
      </View>
    </TouchableOpacity>
  );
};

export default memo(CTrxList);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    marginBottom: 10,
    borderRadius: 8,
    borderLeftWidth: 8,
    paddingLeft: 16,
    paddingRight: 12,
    paddingVertical: 10,
  },
  button: {
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 10,
    justifyContent: 'center'
  }
});
