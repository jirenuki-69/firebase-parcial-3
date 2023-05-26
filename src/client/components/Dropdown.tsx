import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';

interface DropdownProps {
  data: any[];
  labelField: string;
  valueField: string;
  onChange: (value: string) => void;
  disable?: boolean
}

const CustomDropdown: React.FC<DropdownProps> = ({
  data,
  labelField,
  valueField,
  onChange,
  disable = false
}) => {
  const [selectedValue, setSelectedValue] = useState<string | Number>('');
  const [isFocus, setIsFocus] = useState(false);

  const handleValueChange = (item: any) => {
    setSelectedValue(item[valueField]);
    onChange(item);
  };

  return (
    <View style={styles.container}>
      <Dropdown
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        value={selectedValue}
        onChangeText={handleValueChange}
        labelField={labelField}
        valueField={valueField}
        onChange={(item) => {
          handleValueChange(item);
          setIsFocus(false);
        }}
        search
        maxHeight={300}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        placeholder={!isFocus ? 'Select item' : '...'}
        searchPlaceholder="Search..."
        renderLeftIcon={() => (
          <AntDesign
            style={styles.icon}
            color={isFocus ? 'blue' : 'black'}
            name="Safety"
            size={20}
          />
        )}
        disable={disable}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
    width: '100%',
    marginBottom: 20
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8
  },
  icon: {
    marginRight: 5
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14
  },
  placeholderStyle: {
    fontSize: 16
  },
  selectedTextStyle: {
    fontSize: 16
  },
  iconStyle: {
    width: 20,
    height: 20
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16
  }
});

export default CustomDropdown;
