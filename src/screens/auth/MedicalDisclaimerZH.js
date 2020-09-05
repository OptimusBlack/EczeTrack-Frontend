import React, { memo } from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from 'react-native';
import { WhiteBackground } from '../../components/Background';
import Header from '../../components/Header';
import Button from '../../components/Button';
import BackButton from '../../components/BackButton';
import { theme } from '../../core/theme';

import { useTranslation } from 'react-i18next';

const MedicalDisclaimerZH = ({ navigation }) => {
  const { t, i18n } = useTranslation();

  const _onAgree = async () => {
    if (i18n.language == "en") {
      navigation.navigate('TermsAndConditions');
    } else {
      navigation.navigate('TermsAndConditionsZH');
    }
  };

  const _onDisagree = async () => {
    navigation.navigate('HomeScreen');
  };

  return (
    <WhiteBackground>
      <BackButton goBack={() => navigation.navigate('HomeScreen')} />
      <SafeAreaView>
        <Header>免責聲明</Header>
        <ScrollView>
          <Text style={styles.paragraph}>
            WeDerm並非持有效醫療執證人士，所提供之意見並不涉及專業的醫療診斷。
            閣下參與本計劃，代表閣下同意自行承擔風險。我們並不會因參與計劃所引起的任何損失而作直接、間接、意外、衍生性的及懲罰性的損害賠償（包括金錢利益及無形的損失）及負上法律責任（除了法律上已隱含的的條例）。{'\n'}

            WeDerm建議閣下在有需要的情況下應向醫療專家尋求協助及獲取專業意見。閣下亦不應因為參與本計劃而忽略或延遲獲取專業的醫療意見。{'\n'}
            此免責聲明中的任何內容都不會：{'\n'}
            （a）限制或排除因疏忽造成的死亡或人身傷害的任何責任；{'\n'}
            （b）限制或排除欺詐或欺詐性虛假陳述的任何責任；{'\n'}
            （c）以適用法律不允許的任何方式限制任何責任；{'\n'}
            （d）排除適用法律可能未排除的任何責任。{'\n'}

            此免責聲明已翻譯成中文。如英文版本和中文版本有任何不一致或不清晰之處，請以英文版本為準。{'\n'}

          </Text>
        </ScrollView>



        <View style={styles.row}>
          <Button
            mode="text"
            color={theme.colors.secondary}
            style={styles.button}
            onPress={_onDisagree}
          >
            {t('DISAGREE')}
          </Button>

          <Button mode="contained" style={styles.button} onPress={_onAgree}>
            {t('AGREE')}
          </Button>
        </View>
      </SafeAreaView>

    </WhiteBackground>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 4,
    alignSelf: 'flex-end'
  },
  button: {
    width: '50%'
  },
  paragraph: {
    color: theme.colors.secondary,
    textAlign: 'justify',
    lineHeight: 20,
    fontSize: 16
  },
});

export default memo(MedicalDisclaimerZH);
