
import React, { useState, useEffect } from 'react';
import { TextInput, Text, TouchableOpacity, Platform, Image } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from './styles';
import { format } from 'date-fns';

import iconCalendar from '../../assets/calendar.png';
import iconClock from '../../assets/clock.png';

export default function DateTimeInput({ type, onSave, theDate }) {  
  
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false); 

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || theDate;
    setShow(Platform.OS === 'ios');

    onSave(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  return (
    <TouchableOpacity style={styles.container}
      onPress={type === 'date' ? showDatepicker : showTimepicker}>

      <TextInput
        style={styles.input}
        placeholder={type === 'date' ? 'Definir data...' : 'Definir hora...'}
        editable={false}
        value={type === 'date' ? format(theDate, 'dd/MM/yyyy') : format(theDate, 'HH:mm')}
      />

      <Image
        style={styles.iconTextInput}
        source={type === 'date' ? iconCalendar : iconClock}
      />

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={theDate}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </TouchableOpacity>
  );
};

