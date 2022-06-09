import React, {useEffect, useState} from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';
import {Calendar} from 'react-native-calendars';
import DropDownPicker from 'react-native-dropdown-picker';

const App = () => {
  let date = new Date();
  let d = new Date().toLocaleDateString().split('/');
  let listMonth = {
    0: 'January',
    1: 'February',
    2: 'March',
    3: 'April',
    4: 'May',
    5: 'June',
    6: 'July',
    7: 'August',
    8: 'September',
    9: 'October',
    10: 'November',
    11: 'December',
  };

  const [marks, setMarks] = useState();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'January', value: '01'},
    {label: 'February', value: '02'},
    {label: 'March', value: '03'},
    {label: 'April', value: '04'},
    {label: 'May', value: '05'},
    {label: 'June', value: '06'},
    {label: 'July', value: '07'},
    {label: 'August', value: '08'},
    {label: 'September', value: '09'},
    {label: 'October', value: '10'},
    {label: 'November', value: '11'},
    {label: 'December', value: '12'},
  ]);
  const [open1, setOpen1] = useState(false);
  const [value1, setValue1] = useState(null);
  const [items1, setItems1] = useState([
    {label: '2016', value: 2016},
    {label: '2017', value: 2017},
    {label: '2018', value: 2018},
    {label: '2019', value: 2019},
    {label: '2020', value: 2020},
    {label: '2021', value: 2021},
    {label: '2022', value: 2022},
  ]);
  console.log(marks);

  useEffect(() => {
    setNowDate(`${value1}-${value}-01`);
  }, [value, value1]);

  let nowDayStr = d[1].length <= 1 ? `0${d[1]}` : d[1];
  let firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  let firstDayStr =
    firstDay.getDate().toString().length <= 1
      ? `0${firstDay.getDate()}`
      : firstDay.getDate();
  let lastDayStr =
    lastDay.getDate().toString().length <= 1
      ? `0${lastDay.getDate()}`
      : lastDay.getDate();
  let monthStr =
    (firstDay.getMonth() + 1).toString().length <= 1
      ? `0${firstDay.getMonth() + 1}`
      : firstDay.getMonth() + 1;
  const [nowDate, setNowDate] = useState(
    `${firstDay.getFullYear()}-${monthStr}-${nowDayStr}`,
  );

  console.log(nowDate, 'now dateeee');

  // function getDaysInMonth() {
  //   let d2 = new Date();
  //   let currDate = d2.getDate();
  //   let currYear = d2.getFullYear();
  //   let currMonth = d2.getMonth();
  //   let date2 = new Date(currYear, currMonth, currDate);
  //   let days = [];
  //   while (
  //     date2.getMonth() === currMonth &&
  //     date2.getDay() !== 6 &&
  //     date2.getDay() !== 7
  //   ) {
  //     let tempDate =
  //       new Date(date2).getDate().toString().length <= 1
  //         ? `0${new Date(date2).getDate()}`
  //         : new Date(date2).getDate();
  //     // days.push(
  //     //   `${weekday[new Date(date).getDay()]}-${new Date(date).getDate()}-${
  //     //     listMonth[new Date(date).getMonth()]
  //     //   }-${new Date(date).getFullYear()}-${new Date(date).getMonth() + 1}`,
  //     // );
  //     days.push(tempDate);
  //     date.setDate(date.getDate() + 1);
  //   }
  //   return days;
  // }
  const getAllDaysInMonth = () => {
    let d2 = new Date();
    let currYear = d2.getFullYear();
    let currMonth = d2.getMonth();
    const date2 = new Date(currYear, currMonth, 1);

    const dates = [];

    while (date2.getMonth() === currMonth) {
      dates.push(new Date(date2));
      date2.setDate(date2.getDate() + 1);
    }

    return dates;
  };

  const getSpecificDaysObj = () => {
    var obj = {};
    getAllDaysInMonth().forEach(item => {
      if (item.getDay() === 6 || item.getDay() === 0) {
        obj[
          `${item.getFullYear()}-${
            (item.getMonth() + 1).toString().length <= 1
              ? `0${item.getMonth() + 1}`
              : item.getMonth()
          }-${
            item.getDate().toString().length <= 1
              ? `0${item.getDate()}`
              : item.getDate()
          }`
        ] = {
          customStyles: {
            text: {
              color: '#2196F3',
              fontWeight: 'normal',
            },
          },
        };
      }
    });
    return obj;
  };

  useEffect(() => {
    setMarks(getSpecificDaysObj());
  }, []);

  let key = `${firstDay.getFullYear()}-${monthStr}-${nowDayStr}`;

  let markerDatesObj = {
    [key]: {
      customStyles: {
        container: {
          backgroundColor: '#69F0AE',
        },
        text: {
          color: 'white',
          fontWeight: 'normal',
        },
      },
    },
    ...marks,
  };

  console.log(`${firstDay.getFullYear()}-${monthStr}-${firstDayStr}`);
  console.log(`${firstDay.getFullYear()}-${monthStr}-${lastDayStr}`);

  return (
    <View style={styles.container}>
      <View style={styles.wrapperCalendar}>
        <DropDownPicker
          open={open}
          placeholderStyle={{
            color: 'grey',
            fontWeight: 'bold',
          }}
          placeholder={listMonth[new Date().getMonth()]}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          style={{
            borderWidth: 0,
            width: '50%',
          }}
          dropDownContainerStyle={{
            backgroundColor: '#dfdfdf',
            width: '50%',
          }}
          // containerStyle={{
          //   width: '50%',
          // }}
        />

        <DropDownPicker
          open={open1}
          placeholderStyle={{
            color: 'grey',
            fontWeight: 'bold',
          }}
          placeholder={new Date().getFullYear()}
          value={value1}
          items={items1}
          setOpen={setOpen1}
          setValue={setValue1}
          setItems={setItems1}
          style={{
            borderWidth: 0,
            width: '30%',
          }}
          dropDownContainerStyle={{
            backgroundColor: '#dfdfdf',
            width: '30%',
          }}
          // containerStyle={{
          //   width: '50%',
          // }}
        />

        <Calendar
          // style={styles.calendar}

          current={nowDate}
          markingType="custom"
          markedDates={markerDatesObj}
          minDate={`${firstDay.getFullYear()}-${monthStr}-${firstDayStr}`}
          maxDate={`${firstDay.getFullYear()}-${monthStr}-${lastDayStr}`}
          onDayPress={day => {
            console.log('selected day', day);
          }}
          // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
          monthFormat={'yyyy MM'}
          // Handler which gets executed when visible month changes in calendar. Default = undefined
          onMonthChange={month => {
            console.log('month changed', month);
          }}
          // Hide month navigation arrows. Default = false
          // hideArrows={true}
          // Replace default arrows with custom ones (direction can be 'left' or 'right')
          // renderArrow={direction => <Arrow />}
          disableMonthChange={true}
          firstDay={1}
          // Handler which gets executed when press arrow icon left. It receive a callback can go back month
          onPressArrowLeft={subtractMonth => subtractMonth()}
          // Handler which gets executed when press arrow icon right. It receive a callback can go next month
          onPressArrowRight={addMonth => addMonth()}
          // Disable left arrow. Default = false
          // disableArrowLeft={true}
          // Disable right arrow. Default = false
          // disableArrowRight={true}
          // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
          disableAllTouchEventsForDisabledDays={true}
          // Replace default month and year title with custom one. the function receive a date as parameter
          // renderHeader={date => {
          //   <View>
          //     <Text>udwddgdgy</Text>
          //   </View>;
          // }}
          // customHeader={}

          enableSwipeMonths={true}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
  },
  wrapperCalendar: {
    backgroundColor: 'white',
  },
});

export default App;
