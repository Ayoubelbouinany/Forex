import React,{useState} from 'react'
import { Image, Text, TextInput, TouchableOpacity, View, Dimensions } from 'react-native'
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
  } from 'react-native-chart-kit'
   
  import DropDownPicker from 'react-native-dropdown-picker';
function Chart({navigation}) {
// const chart = createChart(document.getElementsByClassName('tvChar'), { width: 400, height: 300 });
// const lineSeries = chart.addLineSeries();
// lineSeries.setData([
//     { time: '2019-04-11', value: 80.01 },
//     { time: '2019-04-12', value: 96.63 },
//     { time: '2019-04-13', value: 76.64 },
//     { time: '2019-04-14', value: 81.89 },
//     { time: '2019-04-15', value: 74.43 },
//     { time: '2019-04-16', value: 80.01 },
//     { time: '2019-04-17', value: 96.63 },
//     { time: '2019-04-18', value: 76.64 },
//     { time: '2019-04-19', value: 81.89 },
//     { time: '2019-04-20', value: 74.43 },
// ]);
//     return (
//         <View className="tvChar">

//             </View>
//     )

// return (
//     <View>
//   <Text>
//     Bezier Line Chart
//   </Text>
//   <LineChart
//     data={{
//       labels: ['January', 'February', 'March', 'April', 'May', 'June'],
//       datasets: [{
//         data: [
//           Math.random() * 100,
//           Math.random() * 100,
//           Math.random() * 100,
//           Math.random() * 100,
//           Math.random() * 100,
//           Math.random() * 100
//         ]
//       }]
//     }}
//     width={Dimensions.get('window').width} // from react-native
//     height={220}
//     yAxisLabel={'$'}
//     chartConfig={{
//       backgroundColor: '#e26a00',
//       backgroundGradientFrom: '#fb8c00',
//       backgroundGradientTo: '#ffa726',
//       decimalPlaces: 2, // optional, defaults to 2dp
//       color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
//       style: {
//         borderRadius: 16
//       }
//     }}
//     bezier
//     style={{
//       marginVertical: 8,
//       borderRadius: 16
//     }}
//   />
//   </View>


// )


const [open, setOpen] = useState(false);
const [value, setValue] = useState(null);
const [items, setItems] = useState([
  {label: 'EUR', value: 'https://www.tradingview.com/chart/?symbol=FX%3AEURUSD'},
  {label: 'MADUSD', value: 'https://www.tradingview.com/chart/?symbol=FX_IDC%3AMADUSD'}
]);


return (
  <WebView source={{ uri: 'https://expo.io' }} style={{ marginTop: 20 }} />
)
}
const chartConfig = {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientTo: '#08130D',
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2 // optional, default 3
  }
export default Chart
