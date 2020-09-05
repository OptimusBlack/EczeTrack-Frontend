import React, { memo } from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from 'react-native';
import { WhiteBackground } from '../../components/Background';
import Header from '../../components/Header';
import Button from '../../components/Button';
import BackButton from '../../components/BackButton';
import { theme } from '../../core/theme';

import { useTranslation } from 'react-i18next';

const PersonalInformationCollectionStatementZH = ({ navigation }) => {
  const { t, i18n } = useTranslation();

  const _onAgree = async () => {
    navigation.navigate('RegisterScreen');
  };

  const _onDisagree = async () => {
    navigation.navigate('HomeScreen');
  };

  return (
    <WhiteBackground>
      <BackButton goBack={() => navigation.navigate('HomeScreen')} />
      <SafeAreaView>
        <Header>收集個人資料聲明</Header>
        <ScrollView>
          <Text style={styles.paragraph}>
            本收集個人資料聲明是根據《個人資料（私隠）條例》（「該條例」）及相關法律的規定向閣下提供有關 WeDerm Limited）會向閣下收集的個人資料的信息。
            {'\n\n'}
            培生在與閣下的業務往來中會不時收集閣下的個人資料。例如：閣下於培生的網上商店或其他地方購買產品或服務、在培生的網站登記成為用戶、參與或出席任何培生的活動、加入培生親子會、查詢關於產品或服務的資料、訂閱培生的定期通訊或簡報，或於培生開設經銷商帳戶。
            {'\n\n'}
            培生會向閣下收集的個人資料包括閣下的姓名、通訊地址、聯絡電話號碼、電郵地址、職業、健康狀況、病史，視乎收集目的而定。培生會在收集個人資料的表格上註明閣下必須提供的資料為何。如閣下未能提供必須的資料，培生可能無法向閣下提供與該等資料有關的產品、服務或信息。
          </Text>

          <Text style={styles.heading}>使用個人資料</Text>
          <Text style={styles.paragraph}>
          在經營期限內，在WeDerm 及/或資料處理者經營所在的法域內，WeDerm收集的個人資料將會以自動或手動形式進行如下處理或使用：
            {'\n1. '}處理閣下向WeDerm訂購產品的訂單；
            {'\n2. '}處理閣下的登記或購買WeDerm服務的訂單；
            {'\n3. '}在閣下取覽培生網站非公眾區的內容或參與培生活動的時候核實閣下的身份或在閣下參與WeDerm舉辦的活動時使用相關資料；
            {'\n4. '}進行研究及客戶調查；
            {'\n5. '}處理閣下加入WeDerm會員的申請；管理、運作及維持WeDerm會員；提供關於WeDerm會員活動和優惠的資訊；
            {'\n6. '}收費及追討欠款；
            {'\n7. '}處理閣下的建議、查詢及投訴；
            {'\n8. '}與閣下的一般溝通；
            {'\n9. '}在不抵觸該條例的情況下向閣下直接促銷WeDerm的產品及服務。
          </Text>

          <Text style={styles.heading}>轉移個人資料</Text>
          <Text style={styles.paragraph}>
            WeDerm持有閣下的個人資料會被保密，但WeDerm會把閣下的個人資料轉交培生委任代其處理個人資料的資料處理者（例如：印刷商、製作公司、郵遞服務商、雲服務提供者、存儲服務提供者或為培生產品提供支援的協力廠商），惟資料處理者會受保密責任約束。
            {'\n\n'}
            由於互聯網屬全球性，您接納及同意將您的個人資料轉交至全球其他國家和地區，包括日本、印度、中東地區、英國、美國、加拿大、新加坡、澳洲、菲律賓、中國（包括大陸、香港、澳門和臺灣）、埃及以及歐洲經濟區。
          </Text>

          <Text style={styles.heading}>查閱及更改已收集資料之權利</Text>
          <Text style={styles.paragraph}>
            閣下有權（1）查閱、（2）獲取複件、（3）補充或更改、（4）要求培生停止收集、處理或使用、（5）要求WeDerm刪除閣下向培生提供的個人資料。如閣下希望行使上述權利，請以電郵方式　(ml.wederm@gmail.com)，聯絡WeDerm的法律部門。WeDerm不會因此收取閣下任何費用。
            {'\n\n'}
            WeDerm將不時對本聲明作出修訂。本聲明的中、英文版本如有歧異，一概以英文版本為準。
            {'\n\n'}
            如 你 同 意 收 取 上 述 資 訊，請 在 本 表 格 上簽署，以表示你的同意。
            {'\n\n'}
            簽署:
            {'\n\n'}
            _____________________
            {'\n\n'}
            姓名: ____________________
            {'\n\n'}
            日期: ____________________（年/月/日）
          </Text>

        </ScrollView>

        <View style={styles.row}>
          <Button mode="text" color={theme.colors.secondary} style={styles.button} onPress={_onDisagree}>
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

export default memo(PersonalInformationCollectionStatementZH);
