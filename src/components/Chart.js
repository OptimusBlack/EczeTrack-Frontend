import React, { memo } from 'react';
import { ActivityIndicator, Dimensions, Text } from "react-native";
import { LineChart } from 'react-native-chart-kit';

import { useTranslation } from 'react-i18next';

let COLORS = [
  "rgba(137, 203, 194,",
  "rgba(50, 50, 204,",
  "rgba(97, 48, 64,",
  "rgba(134, 65, 244,",
  "rgba(142, 107, 35,",
  "rgba(105, 31, 1,",

];

const Chart = ({ xValues, yValues, legend, loading }) => {
  const { t } = useTranslation();

  if(loading)
    return <ActivityIndicator size={25} color={'black'} style={{height: 270}}/>;

  if(xValues.length === 0){
    return <Text style={{paddingVertical: 130, color: '#1c1c1c'}}>{t('No data to show')}</Text>
  }

  let graphData = [];
  yValues.forEach((graph, i) => {
    graphData.push({
      data: graph,
      color: (opacity = 1) => `${COLORS[i]} ${opacity})`,
      withDots: graph.length === 1 ? true : false
    });
  });

  const data = {
    labels: xValues,
    datasets: graphData,
    legend: legend.map((item) => t(item))
  };

  return (
    <LineChart
      data={data}
      width={Dimensions.get('window').width * 0.85} // from react-native
      height={220}
      yAxisInterval={1} // optional, defaults to 1
      withDots={true}
      verticalLabelRotation={-20}
      chartConfig={{
        backgroundGradientFrom: '#FFFFFF',
        backgroundGradientTo: "#FFFFFF",
        color: (opacity = 1) => `rgba(95, 184, 169, ${opacity})`,
        fillShadowGradientOpacity: 0, //opacity of the colour of area under the graph
        strokeWidth: 3, // optional, default 3
        decimalPlaces: 0,
        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`
      }}
      bezier
      style={{
        marginVertical: 8
      }}
      // withDots={false}
    />
  );
};

export default memo(Chart);