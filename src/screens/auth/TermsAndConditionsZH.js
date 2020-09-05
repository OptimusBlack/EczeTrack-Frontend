import React, { memo } from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from 'react-native';
import { WhiteBackground } from '../../components/Background';
import Header from '../../components/Header';
import Button from '../../components/Button';
import BackButton from '../../components/BackButton';
import { theme } from '../../core/theme';

import { useTranslation } from 'react-i18next';

const TermsAndConditionsZH = ({ navigation }) => {
  const { t, i18n } = useTranslation();

  const _onAgree = async () => {
    if (i18n.language == "en") {
      navigation.navigate('PersonalInformationCollectionStatement');
    } else {
      navigation.navigate('PersonalInformationCollectionStatementZH');
    }
  };

  const _onDisagree = async () => {
    navigation.navigate('HomeScreen');
  };

  return (
    <WhiteBackground>
      <BackButton goBack={() => navigation.navigate('HomeScreen')} />
      <SafeAreaView>
        <Header>手機應用程式使用條款</Header>
        <ScrollView>
          {/* <Text style={styles.heading}>AGREEMENT TO TERMS</Text> */}
          <Text style={styles.paragraph}>
          透過使用ＷｅＤｅｒｍ手機應用程式時(下稱「本程式」)，閣下將會被視作接受本應用程式的條款及細則，請點擊「同意」以繼續使用本程式。如閣下不同意受下述有關使用條款的約束，請勿使用本程式。
          </Text>
          <Text style={styles.heading}>使用要求</Text>
          <Text style={styles.paragraph}>
          本程式是由　WeDerm  Limited 　(下稱「ＷｅＤｅｒｍ」、「本公司」或「我們」) 擁有及運作。本使用條款限制本公司及其關聯公司、子公司、僱員、代理人、承辦商及任何第三方內容提供者就該等內容、資料、商品及/或服務的使用所承擔的責任。
          </Text>
          <Text style={styles.heading}>知識產權</Text>
          <Text style={styles.paragraph}>
            本程式及其可用的任何資料，包括文字、圖形、圖標、圖像及商標均受WeDerm 或我們的特許人所擁有或控制的版權、商標及其他知識產權的保護。
            未經我們事先書面許可，您不得以任何方式複印、複製、上傳、下載、傳輸、存儲於檢索系統、修改、變更或公開展示或分發本程式的內容或其任何部分作任何用途。
            所有資料和服務均受到知識產權保護。您必須遵守下列要求：1)不記錄、複製、或從本程式中創建衍生作品；2)不於公眾場所發布、張貼或展示本程式所提供的資料或內容及不在互聯網上或任何其他網絡分發或使本程式可供使用；
            3)不使用本程式作任何不道德、非法或可能被認定為有威脅性、侮辱性或有害的其他目的。
          </Text>
          <Text style={styles.heading}>收集個人資料</Text>
          <Text style={styles.paragraph}>
            WeDerm會要求閣下提供以下個人資料，包括但不限於，姓名、通訊地址、聯絡電話號碼、電郵地址、職業、健康狀況、病史，視乎收集目的而定。當您使用本程式時，閣下可能會被要求提供個人資料，而我們保留在進行會籍登記、網上帳戶登記及網上購物等情況下核對閣下身份的權利。本公司載於官方網站的私隱政策聲明適用於此。
          </Text>
          <Text style={styles.heading}>免責聲明</Text>
          <Text style={styles.paragraph}>
            WeDerm特此聲明，在法律允許的最大範圍內，排除所有有關本程式的，無論明示或默示、法定或其他方面的保證、條件、承諾、陳述及條款。閣下將自行承擔使用本程式的風險。本程式所提供的資料僅供參考之用，我們不保證該等資料的準確性、完整性、可靠性或及時性。本公司概不負責閣下就任何直接或間接使用或依賴此等資料所引起的索賠、債務、損失或損害。
            本公司不負責透過本程式及/或服務發送通信的安全性和保密性，包括但不限於透過無線裝置或其他設備上的應用程式及/或服務使用本程式及/或服務。我們不保證本程式的使用不會被中斷、不會有任何延誤、故障、錯誤、遺漏或資料丟失、不會傳輸病毒或其他破壞性的內容或不會對閣下的手機造成損害。尤其我們對下載本程式的任何中斷，對閣下的裝置內的其他軟件、程式、或應用程式造成的干擾，或任何其他可能會不時出現的技術缺陷不承擔任何責任。閣下將自行負責因下載或使用本程式而對閣下的裝置所造成的損壞或數據丟失。
            使用本程式需要兼容的設備，我們建議使用速度較快的Wi-Fi無線網絡。您的互聯網服務供應商可能會就使用流動數據或Wi-Fi收取費用。本公司概不負責因干擾、傳送中斷、延遲傳送或任何其他原因而影響閣下透過本程式所發送的訊息的準確性或及時性。
          </Text>
          <Text style={styles.heading}>第三方網站和服務</Text>
          <Text style={styles.paragraph}>
            本程式可能提供我們無法控制的第三方所運作的應用程式、網站、服務、或包含該等第三方所運作的產品或服務的廣告連結，而本公司對此排除所有責任。閣下自行承擔使用該等網站和服務的風險。
            您的資料可能會在下載或使用本程式的過程中向公眾披露（無論是透過互聯網或任何其他方式）。
            閣下明白閣下對本程式的使用及可使用的能力可能會受到其他第三方的條款和細則以及私隱政策的限制，包括但不限於那些應用程式商店、
            流動軟件平台、遊戲平台和付款服務供應商。在任何情況下，本公司不為第三方的條款及細則、行為及其使用您的個人資料而承擔任何責任。
          </Text>
          <Text style={styles.heading}>責任限制</Text>
          <Text style={styles.paragraph}>
            在適用法律允許的最大範圍內，本公司不會因本程式所引起的任何訴訟因由而導致任何直接或間接的、特別的、附帶的、後果性的或懲罰性的損害賠償而對閣下承擔任何責任。
          </Text>
          <Text style={styles.heading}>修改、支援及維修</Text>
          <Text style={styles.paragraph}>
            WeDerm保留隨時在不作事先通知的情況下修改或修訂本使用條款的權利。在公佈使用條款的變更後繼續使用本程式，即表示您同意受使用條款的最新版本約束。
            我們會在不作事先通知的情況下不時發放本程式的更新版本。我們建議您下載或更新本程式的最新版本以獲取最新資料及功能。
            WeDerm保留在任何時間及不時在不作事先通知的情況下修改、暫停或（暫時或永久）中止本程式（或其任何部分）。本公司不會就本程式的任何修改、暫停或中止而對您或任何第三方承擔任何責任。本公司也可以限制某些功能和服務，或限制您對本程式的部分或全部的使用，而不作另行通知或承擔任何責任。本公司可全權酌情決定是否提供有關本程式的維修和支援服務。
          </Text>
          <Text style={styles.heading}>終止</Text>
          <Text style={styles.paragraph}>
            如果您未能遵守本特許協議的任何條款和細則，您在本特許協議項下的權利將立即及自動被終止，而本公司毋須另行通知。終止時，您必須立即停止對本程式的所有使用，並銷毀所有閣下擁有或控制的本程式的副本。該終止將不會限制本公司在法律或衡平法上的任何其他權利或補救措施。
            如中文版本與英文版本的使用條款有任何差異，應以英文版本為準。
          </Text>
        </ScrollView>
        
        <View style={styles.row}>
          <Button mode="text" color={theme.colors.secondary}  style={styles.button} onPress={_onDisagree}>
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
  button : {
    width: '50%'
  },
  paragraph: {
    color: theme.colors.secondary,
    textAlign: 'justify',
    lineHeight: 20,
    fontSize: 16,
    marginBottom: 20
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10
  }
});

export default memo(TermsAndConditionsZH);
