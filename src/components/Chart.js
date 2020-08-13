import React, { memo } from 'react';
import { Dimensions } from "react-native";
import { LineChart } from 'react-native-chart-kit';

const Chart = ({ xValues, yValues, legend }) => {
  let graphData = [];
  yValues.forEach((graph) => {
    graphData.push({
      data: graph
    });
  });

  const data = {
    labels: xValues,
    datasets: graphData,
    legend: legend
  };

  return (
    <LineChart
      data={data}
      width={Dimensions.get('window').width * 0.85} // from react-native
      height={220}
      yAxisInterval={1} // optional, defaults to 1
      withDots={false}
      chartConfig={{
        backgroundGradientFrom: '#FFFFFF',
        backgroundGradientTo: "#FFFFFF",
        color: (opacity = 1) => `rgba(95, 184, 169, ${opacity})`,
        fillShadowGradientOpacity: 0, //opacity of the colour of area under the graph
        strokeWidth: 2, // optional, default 3
        decimalPlaces: 0,
        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`
      }}
      bezier
      style={{
        marginVertical: 8
      }}
    />
  );
}

export default memo(Chart);