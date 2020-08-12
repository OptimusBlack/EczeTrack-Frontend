import React, { memo } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button } from 'react-native-paper';

const TimeRangeSelector = () => {
    return(
        <View
            style={styles.container}
        >
            {['7 days', '1 Month', '3 Months', 'Custom'].map(e => 
                <Button style={styles.button} mode='outlined' labelStyle={styles.buttonText} >{e}</Button>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderRadius: 9,
        borderWidth: 1,
        overflow: 'hidden',
        height: 50
    },
    buttonText: {
        fontSize: 11,
        textTransform: 'capitalize',
    },
    button: {
        borderRadius: 0,
        borderBottomWidth: 0,
        borderTopWidth: 0,
        justifyContent: 'center'
    }
});

export default memo(TimeRangeSelector);