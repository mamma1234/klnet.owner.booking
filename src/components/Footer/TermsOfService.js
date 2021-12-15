import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
//import useScrollTrigger from '@material-ui/core/useScrollTrigger';
//import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Zoom from '@material-ui/core/Zoom';
import HighlightOff from '@material-ui/icons/HighlightOff';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

function ScrollTop(props) {
  const { children } = props;

  const classes = useStyles();
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  /*const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 20,
  });*/

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top-anchor');
    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <Zoom in={true}>
      <div onClick={handleClick} role="presentation" className={classes.root}>
        {children}
      </div>
    </Zoom>
  );
}

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};
export default function Terms(props) {
	
return (	
		   <React.Fragment>
		      <CssBaseline />      
		      <AppBar style={{backgroundColor:'#26c6da'}} >
		        <Toolbar style={{paddingRight:'0'}}>
		          <Typography variant="h6" style={{flexGrow:'1'}}>Terms Of Service</Typography>
		          <HighlightOff onClick={()=>props.handleClose()} />
		        </Toolbar>
		      </AppBar>
		      <Toolbar id="back-to-top-anchor" />
		      <Container style={{paddingTop:'10px'}}>
		          <div style={{textAlignLast:'end'}}>시행일자 : 2020년 6월 11일</div><br/>
		          <div style={{textAlignLast:'center'}}>제 1 장  총 칙</div><br/>
		          제1조 (목적)<br/>
				  본 약관은 주식회사 케이엘넷(이하 "회사"라 함)이 제공하는 이트랜스(e-Trans)(이하 "서비스"라 함)를 이용함에 있어서 회사와 서비스 이용자(이하 “사용자”라 함)간에 이용 조건 및 절차, 권리 및 의무 등에 관한 기본적인 사항에 관하여 규정함을 목적으로 합니다.<br/><br/>
				  제2조 (약관의 효력)<br/>
										① 본 약관은 서비스가 이루어지는 주된 인터넷 홈페이지(https://www.plismplus.com, 이하 "홈페이지"라 함)에 공시함으로써 그 효력을 발생합니다.<br/>
										② 회사는 필요에 따라 약관의 내용을 개정할 수 있으며, 약관이 개정된 경우에는 제1항과 같은 방법으로 적용일자와 개정사유를 포함하여 그 내용을 공시함으로써 그 효력을 발생합니다.<br/>
										③ 회사가 약관을 개정할 경우, 적용일자 및 개정사유를 명시하여 현행약관과 함께 홈페이지 초기화면에 그 적용일자 7일 이전부터 적용일자 전일까지 공지합니다.<br/>
										④ 개정된 약관의 공시일로부터 1개월 이내에 사용자가 회사에 서면으로 이의를 제기하지 아니한 때에는 개정된 약관을 승인한 것으로 봅니다.<br/>
										⑤ 본 약관에서 정하지 아니한 사항과 약관의 해석에 관한 사항은 전자거래기본법, 전기통신사업법 등 관계법령 및 업계의 상거래 관행에 따름을 원칙으로 합니다.<br/><br/>
										
										제3조 (약관적용의 준칙)<br/>
										이 약관에 명시되지 않은 사항이 관계법령이나 회사 고객지원센터 홈페이지(http://help.klnet.co.kr)에 공지된 “KL-Net 서비스 이용약관”에 규정되어 있을 경우에는 그 규정을 따릅니다.<br/>
										
										제4조 (용어의 정의)<br/>
										이 약관에서 사용하는 용어의 정의는 다음과 같습니다.<br/>
										1. 사용자 :  회사와 서비스 이용계약을 체결하여 사용 중이거나 사용할 예정에 있는 자<br/>
										가. 유료회원 : 회사에 개인정보를 제공하여 유료회원 등록을 한 자로서, 회사의 정보를 지속적으로 제공받으며, 월사용료 또는 년사용료를 납부하며 서비스를 계속적으로 이용할 수 있는 자를 말합니다.<br/>
										나. 무료회원 : 회사에 개인정보를 제공하여 무료회원 등록을 한 자로서, 회사가 제공하는 서비스를 제한적으로 이용하며, 그 외 서비스는 별도로 요금을 납부하고  이용할 수 있는 자를 말합니다.<br/>
										다. 기업회원 : 유료 또는 무료 서비스를 이용하고자 하는 회사의 대표자 또는 이를 위임받은 자가 이용신청 후 회사의 이용승인을 득하여 서비스를 계속적으로 이용할 수 있는 자를 말합니다.<br/>
										라. 개인회원 : 기업회원에 소속된 개인으로서 기업회원의 대표자 또는 이를 위임받은 자에게 이용신청 후 이용승인을 득하여 서비스를 이용할 수 있는 자를 말합니다.<br/>
										2. 사용자 ID : 사용자의 식별과 서비스 이용을 위하여 회사가 부여 또는 사용자가 선택  에 의하여 회사가 승인하는 문자와 숫자의 조합<br/>
										3. 비밀번호 : 사용자 ID와 일치된 사용자임을 확인하고 사용자 자신 및 회사의 중요기밀을 보호하기 위하여 사용자 자신이 설정한 문자와 숫자의 조합.<br/>
										4. 이용요금 : 서비스를 이용한 대가로 회사의 별도 부과기준 및 체계에 따라 산정되어 부과되는 금액<br/><br/>
										
										<div style={{textAlignLast:'center'}}>제 2 장  서비스  이용계약</div><br/><br/>

										제5조 (사용자의 자격)<br/>
										① 사용자는 대한민국에 사업장을 두고 있는 법인 또는 개인사업자로서, 회사가 정한 정보를 제공할 수 있어야 합니다.<br/>
										② 다음 각 호에 해당하는 자는 사용자로 등록할 수 없습니다.<br/>
										1. 가입신청자가 본 약관 제14조에 의하여 사용자 자격을 상실한 적이 있는 경우. 다만, 사용자자격 상실 후 3년이 경과하거나, 회사에서 재가입의 승낙을한 경우는 예외로 합니다.<br/>
										2. 등록내용을 허위로 기재한 경우<br/><br/>
										
										제6조 (서비스 이용신청)<br/>
										① 서비스 이용 신청은 홈페이지에 접속하여 회사 소정양식의 이용신청서에 제반 정보를 입력하여 신청합니다.<br/>
										② 사용자로 가입을 하고자 하는 자는 본 약관에 동의하고, 회사가 정한 이용신청서 양식에 따라 모든 내용들을 허위 없이 기재하여야 합니다.<br/>
										③ 회사는 가입 신청자가 제2항에 따라 모든 사항을 성실히 기재하여 이용신청을 완료하면 필요사항을 확인한 후, 서비스 이용을 위한 사용자가입 승인 여부를 결정합니다.<br/>
										④ 회사는 승인 결과를 가입 신청자의 유선 또는 e-mail을 통해 통보하며, 가입 신청자는 홈페이지 접속을 통하여 승인 여부를 확인할 수 있습니다.<br/>
										⑤ 사용자 이용신청 양식에 기재하는 모든 정보는 모두 실제 데이터인 것으로 간주됩니다. 실명이나 실제 정보를 입력하지 않은 가입 신청자는 법적인 보호를 받을 수 없으며, 서비스 이용을 제한받을 수 있습니다.<br/>
										⑥ 홈페이지를 통해 사용자 이용신청 양식을 제출한 가입 신청자는 사업자등록증 사본을 회사에 팩스로 제출하여야 합니다.<br/>
										⑦ 홈페이지를 통해 사용자 이용신청을 완료하고 사업자등록증 사본이 회사에 도달한 후, 회사가 사용자로 가입하고자 하는 신청자에게 승낙의 의사표시를 하여야 사용자 자격을 취득합니다.<br/>
										⑧ 회원은 회사에 제공한 정보의 변경이 있는 경우, 즉시 사용자 정보를 변경하여야 합니다.<br/><br/>
										
										제7조 (이용신청의 제한 및 승인보류)<br/>
										① 회사는 다음의 각 호에 해당하는 사항을 인지하였을 경우, 해당 이용신청에 대해서는 신청을 승낙하지 아니합니다.<br/>
										1. 타인의 명의를 도용하였거나, 실명이 아닌 가명을 사용하여 신청하였을 때<br/>
										2. 가입신청서의 내용을 허위로 기재하였거나, 허위서류를 첨부하여 신청하였을 때<br/>
										3. 기타 가입 신청자의 귀책사유로 가입 승인이 어려운 경우<br/>
										② 회사는 이용신청이 다음의 각 호에 해당하는 경우에는, 해당 이용신청에 대해서는 가입승인 제한 사유가 해소될 때까지 이용승인을 제한 및 보류할 수 있습니다.<br/>
										1. 서비스관련 설비의 용량이 부족한 경우 <br/>
										2. 서비스의 기술상 장애사유가 발생한 경우 혹은 발생이 예상될 경우<br/>
										3. 전기통신사업법에 규정된 기간통신사업자가 전기통신 서비스의 중지로 인한 서비스의 제공이 불가능한 경우<br/>
										4. 기타 회사가 서비스를 위해서 필요하다고 인정되는 경우<br/>
										③ 회사는 제1항 및 제2항의 규정에 의해서 이용신청을 승인할 수 없거나, 승인을 제한하는 경우에는 이를 해당 가입 신청자에게 통지하여야 합니다. 단, 회사의 귀책사유가 아닌 사유로 인해 가입 신청자에게 통지할 수 없는 경우는 예외로서 인정합니다.<br/><br/>
										
										<div style={{textAlignLast:'center'}}>제 3 장  서비스  제공 및 이용</div><br/><br/>
					
										제8조 (서비스의 이용개시)<br/>
										회사는 사용자의 이용신청을 승낙한 때부터 서비스를 개시합니다.<br/><br/>
										
										제9조 (서비스 이용시간)<br/>
										① 서비스의 이용은 연중무휴 24시간을 원칙으로 합니다.  단, 다음 각 항에 해당하는 경우에는 예외로 인정합니다.<br/>
										1. 회사의 기기고장, 또는 이와 유사한 장애로 인한 중단<br/>
										2. 천재지변으로 인한 서비스 중단<br/>
										3. 정전으로 인하여 주컴퓨터의 통신장애가 발생했을 때<br/>
										4. 인터넷망이나 통신망의 장애<br/>
										5. 주기기 정기점검으로 인한 서비스 중단<br/>
										6. 기타 위의 각 호에 준하는 경우<br/>
										② 정기정검 등의 필요로 회사가 사전에 공지하여 정한 날이나 시간은 그러하지 않습니다.<br/><br/>
										
										제10조 (서비스 내용)<br/>
										1. 수입PLISM(수입화물반출입제어서비스)<br/>
										2. 수출PLISM(수출화물반출입제어서비스)<br/>
										3. 위수임운송<br/>
										4. 반출입계(COPINO 등)<br/>
										5. 화물추적<br/>
										6. 부가서비스<br/>
										7. 코드정보<br/>
										<br/>
										제11조 (서비스 이용)<br/>
										제9조 각 항의 서비스 이용에 관한 필요한 사항은 회사가 정하여  홈페이지에 게시하거나 또는 별도로 공지하는 내용에 따릅니다.<br/><br/>
										
										제12조 (서비스 내용변경)<br/>
										회사는 필요 시 서비스의 내용을 추가, 변경, 삭제할 수 있으며, 이에 따른 이용에 필요한 사항은 회사가 정하여 홈페이지에 게시 또는 별도로 공지하는 내용에 따릅니다.<br/><br/>
										
										제13조 (서비스 제공의 중지 및 일시중지)<br/>
										① 회사는 다음 각 호에 해당하는 경우 서비스 제공을 중지 또는 일시중지 할 수 있습니다.<br/>
										1. ‘전자거래기본법, '전기통신사업법' 등 관계법령 및 이 약관의 규정을 위반한 경우<br/>
										2. 서비스에 관한 회사의 업무수행 또는 설비에 현저한 지장을 초래하거나 초래할 위험이 있는 행위를 한 경우<br/>
										3. 서비스용 설비의 보수 또는 공사로 인한 부득이한 경우<br/>
										4. 전기통신사업법에 규정된 기간통신사업자가 전기통신 서비스를 중지했을 경우<br/>
										5. 서비스 이용요금을 3개월 이상 납부하지 아니하는 경우<br/>
										② 회사는 국가비상사태, 정전, 서비스 설비의 장애 또는 서비스 이용의 폭주 등으로 정상적인 서비스 이용에 지장이 있을 경우, 서비스용 설비의 보수 또는 공사로 인한 부득이한 때에는 서비스의 전부 또는 일부를 제한하거나 정지할 수 있습니다.<br/><br/>
										
										제14조 (이용계약의 해지)<br/>
										① 사용자가 서비스 이용계약을 해지할 경우에는 해지하고자 하는 날의 5일 전까지 "서비스해지 신청서"를 회사에 제출하여야 합니다.<br/>
										② 회사는 다음 각 호의 1에 해당하는 사유가 발생한 때에는 이용계약을 해지 할 수 있으며 일정 기간내에 재가입을 제한할 수 있습니다.<br/>
										1. 서비스 이용요금을 정한 기일내에 납부하지 아니한 경우<br/>
										2. 관계법령 및 약관을 위반하여 1회 이상의 시정요구를 받고 이에 불응하여 회사의 업무기술상 막대한 지장을 초래한 경우<br/>
										3. 기타 회사가 사용자로써 부적당하다고 판단한 경우<br/><br/>
										
										<div style={{textAlignLast:'center'}}>제 4 장  권리와 의무</div><br/>
								
										제15조 (양도 등의 금지)<br/>
										① 사용자가 서비스를 제공받는 권리는 제16조의 규정에 의해 승계되는 경우를 제외하고는 이를 양도하거나 증여, 처분할 수 없습니다.<br/>
										② 사용자는 회사의 사전동의 없이 제3자로 하여금 서비스를 이용하게 해서는 안 됩니다.<br/>
										
										제16조 (사용자의 지위승계)<br/>
										① 다음 각 호의 사유가 발생한 경우에는 사용자의 지위를 승계합니다.<br/>
										 1. 법인이 다른 법인을 흡수 합병하여 존속하는 법인이 그 지위를 승계한 경우<br/>
										 2. 둘 이상의 법인이 하나의 법인으로 신설합병하여 그 새로운 법인이 지위를 승계한 경우<br/>
										 3. 타인의 영업을 양수하여 그 영업을 승계하는 자<br/>
										② 제①항의 규정에 의하여 사용자의 지위를 승계한 자는 승계일로부터 30일 이내에 사용자의 지위승계 사실을 증명하는 서류를 첨부하여 회사에 제출하여야 합니다.<br/><br/>
										
										제17조 (회사의 의무)<br/>
										① 회사는 이 약관에서 정한 바에 따라 계속적이고 안정적으로 서비스를 제공할 의무가 있습니다.<br/>
										② 회사는 서비스 제공 및 청약과 관련하여 알게 된 사용자의 신상 정보나 중요한 사업내용에 대해 본인의 승낙없이 제3자에게 누설, 배포하여서는 안 됩니다.<br/>
										다만, 전기통신기본법 등 관계법령의 규정에 의하여 관계 국가기관의 요구가 있는 경우에는 그러하지 않습니다.<br/><br/>
										
										제18조 (사용자의 의무)<br/>
										① 사용자는 서비스 이용에 대한 대가로서 이 약관에서 정한 요금 등을 요금 납부책임자와 연대하여 납입하여야 합니다.<br/>
										② 사용자는 서비스를 이용하여 얻은 정보를 회사의 사전 승낙없이 사용자의 이용이외의 목적으로 복제하거나 제3자에게 제공하여서는 아니 됩니다.<br/>
										③ 사용자는 회사의 사전 서면 승낙없이 로봇, 스파이더 기타 자동화 프로그램 등을 회사의 웹 페이지 또는 웹 페이지에 있는 내용을 감시, 복제 또는 다운로드하기 위하여 사용하여서는 아니 되며, 그러한 사용으로 회사에 직,간접적인 손해를 입힌 경우 이를 배상하여야 합니다.<br/>
										④ 사용자는 회사가 제공하는 서비스 이용을 위하여 제공된 자료 및 정보 일체를 회사의 동의없이 제3자에게 제공할 수 없다.<br/>
										⑤ 사용자는 제①항과 ②항 및 ③항외에도 이 약관 및 관계법령에서 규정한 사항을 준수하여야 합니다.<br/><br/>
										
										<div style={{textAlignLast:'center'}}>제 5 장  서비스  이용요금</div><br/><br/>
									
										제19조 (서비스 이용요금)<br/>
										① 서비스의 이용요금은 요율, 적용기준, 적용방법은 [별표]의 이용요금표와 같습니다. 단, 회사와 별도 계약을 체결한 경우에는 별도로 약정한 바에 따릅니다.<br/>
										② 서비스 이용요금은 월 단위로 부과합니다. 단, 별도의 약정이 있을 경우에는 과금방식을 달리할 수 있습니다.<br/>
										③ 월정액제 요금은 사용량 유무와 무관하게 해지한 해당 월까지의 요금을 부과합니다.<br/>
										④ 서비스를 이용함에 있어 발생하는 EDI전송료는 별도 회사의 KL-Net 서비스 이용약관에 따라 별도 부과됩니다.<br/>
										⑤ 이용요금은 기업회원 ID별로 부과함을 원칙으로 합니다.<br/>
										⑥ 사용자는 서비스 이용요금에 부과되는 부가가치세를 별도로 부담하여야 합니다.<br/>
										
										제20조 (요금납입책임자)<br/>
										① 요금납입책임자는 서비스 사용자를 원칙으로 합니다. 단, 회사가 인정하는 경우에는 타인을 요금납입책임자로 지정할 수 있습니다.<br/>
										② 제①항의 규정에 의한 요금납입책임자는 사용자가 회사에 대하여 부담하는 서비스 이용 요금 등 약관에 따른 모든 채무를 사용자와 연대하여 회사에 납부할 책임이 있습니다.<br/><br/>
																		
										제21조 (요금부과 및 납부)<br/>
										① 회사는 서비스요금 청구서를 납입기일 7일전 까지 요금납입책임자에게 도달하도록 발송해야 합니다. 다만, 요금납입책임자가 자동이체, 신용카드 등 자동 납부방식으로 요금 등을 납부하기로 한 경우에는 그러하지 않습니다.<br/>
										② 사용자는 요금청구서에 기재된 기일까지 회사가 지정하는 장소에 지정하는 방법으로 요금을 납입해야 합니다.<br/>
										③ 사용자는 요금과 관련하여 청구서 등의 정확한 수령을 위해 주소지 이전 등 청구서 발송과 관련된 변경사항을 회사에 통보하여야 하며, 사용자의 통보누락 등으로 인하여 발생한 불이익에 대해 회사는 책임지지 않습니다.<br/><br/>
										
										제22조 (연체료의 부과)<br/>
										① 요금납입책임자가 지정된 기일까지 요금을 납부하지 아니한 때에는 그 체납된 요금의 100분의 2에 상당하는 금액을 가산금으로 납부하여야 합니다.<br/>
										② 제1항의 규정에 의한 가산금은 요금 납부 만료일의  익일을 기준으로 하여 체납된 요금에 가산하여 청구하며, 체납요금 및 연체료는 익월 요금청구서에 포함 하여 청구합니다.<br/><br/>
										
										제23조 (요금의 반환)<br/>
										① 요금의 과오납입액이 있는 때에는 회사는 해당 사용자의 청구에 따라 다음 각 호의 1에 해당하는 조치를 합니다.<br/>
										1. 과납청구한 요금 등에 대하여는 그 금액을 감액합니다.<br/>
										2. 과납입한 요금 등에 대하여는 그 금액을 반환하거나 다음 달에 청구할 요금에서 상계합니다.<br/>
										3. 요금 등을 반환받아야 할 사용자의 요금 등의 체납이 있는 경우, 회사는 반환해야 할 요금 등에서 이를 우선 공제하고 반환할 수 있습니다.<br/>
										4. 반환받을 요금 등의 수령권자가 2인 이상일 경우에는 그 중 1인에게 이를 반환합니다. 이 때, 회사는 요금을 반환받을 자를 임의로 결정할 수 있으며, 요금을 반환받지 못한 수령권자는 회사에 대하여 이의를 제기할 수 없습니다.<br/>
										② 제1항의 규정에 의한 요금반환 청구는 그 사유가 발생한 날로부터 기산하여 6개월을 경과한 때에는 청구를 할 수 없습니다.<br/>
										③ 회사는 과소청구액에 대해서는 익월에 합산하여 청구합니다.<br/><br/>
										
										<div style={{textAlignLast:'center'}}>제 6 장  사용자정보  보호정책</div><br/><br/>

										제24조 (사용자정보의 보호)<br/>
										① 회사는 수집된 사용자정보가 분실·도난·누출·변조 또는 훼손되지 아니하도록 보안 및 안전성 확보에 필요한 기술적인 조치 등을 취하여야 합니다.<br/>
										② 회사는 서비스와 관련하여 취득한 사용자의 정보 및 사용자의 개인정보를 본인의 사전 승낙 없이 타인에게 누설, 공개 또는 배포할 수 없으며, 서비스 관련 업무이외의 상업적 목적으로 사용할 수 없습니다.  다만, 다음 각 항에 해당하는 경우에는 그러하지 아니합니다.<br/>
										1. 관계법령에 의하여 수사상의 목적으로 관계기관으로부터 요구받은 경우<br/>
										2. 정보통신윤리위원회의 요청이 있는 경우<br/>
										3. 서비스 제공에 따른 이용요금의 정산을 위하여 필요한 경우<br/>
										4. 통계작성, 학술연구 또는 시장조사를 위하여 필요한 경우로서, 특정 개인을 식별할 수 없는 형태로 제공하는 경우<br/>
										5. 기타 관계법령에 의해 필요한 경우<br/><br/>
										
										제25조 (사용자정보의 열람 및 정정)<br/>
										사용자는 언제든지 회사의 홈페이지에서 본인의 개인정보를 열람 및 정정할 수 있습니다.  단, 사용자는 서비스의 특성상 사업자등록증상의 정보는 임의대로 변경할 수 없으며, 이 경우 정보정정을 증빙할 수 있는 관련서류(변경된 사업자등록증 사본 등)를 회사에 송부하여, 소정의 확인절차를 거쳐 회사에서 처리함을 원칙으로 합니다.<br/><br/>
										
										<div style={{textAlignLast:'center'}}>제 7 장  기 타</div><br/><br/>
									
										제26조 (기밀유지)<br/>
										사용자와 회사는 본 계약과 관련하여 취득한 상대방의 영업상 또는 기술상의 비밀이나 정보를 제3자에게 누출하거나 유출할 수 없습니다.<br/>
										
										제27조 (손해배상)<br/>
										① 사용자는 제18조 및 기타 본 약관의 규정을 위반함으로 인하여 회사가 다른 사용자 또는 제3자에 대하여 책임을 부담하게 되고 이로 인해 회사가 손해를 입게 되는 경우, 사용자는 회사가 입은 일체의 손해에 대하여 배상하여야 합니다.<br/>
										② 회사는 서비스 제공과 관련하여 다음 각 호의 사유로 사용자에게 어떠한 손해가 발생한 경우 회사는 이에 대하여 책임지지 아니합니다.<br/>								
		1. 천재지변, 제3자의 고의적 서비스 방해 및 기타 불가항력적인 사유로 인해 서비스를 제공하지 못한 경우<br/> 
		2. 사용자가 제공하는 자료의 오류로 인하여 사용자에게 손해가 발생한 경우<br/>
		3. 통신회선 등 회사 이외의 전산 시스템 장애에 의하여 서비스를 제공하지 못한 경우<br/>
		4. 바이러스 침투, 불법S/W설치 등 관리소홀 및 부주의 등 사용자의 귀책사유로 인한 서비스 이용 장애의  경우<br/>
		5. 기타 회사의 과실 없는 사유로 인하여 사용자에게 손해가 발생한 경우<br/><br/>

		제28조 (분쟁의 해결 및 관할법원)<br/>
		① 서비스와 관련하여 분쟁이 발생한 경우 관련법규가 있으면 그 관련법규를 따르고 관련법규가 없으면 관습 및 신의성실의 원칙에 입각, 상호 협의하여 해결 합니다.<br/>
		② 서비스와 관련하여 발생한 분쟁이 제1항에 따라 원만하게 해결되지 아니할 경우, 이와 관련된 소송의 관할법원은 회사 본점 소재지를 관할하는 법원으로 합니다.<br/><br/>

		<div style={{textAlignLast:'center'}}>부 칙</div><br/><br/>

	
		제1조 이 약관은 2015년 1월 1일부터 시행합니다.<br/><br/>
											
		
		제2조 2013년 8월 1일부터 시행되던 종전의 약관은 본 약관으로 대체합니다.<br/>
		
		      </Container>
		      <ScrollTop {...props}>
		        <Fab color="secondary" size="small" aria-label="scroll back to top" style={{backgroundColor:'#26c6da'}}>
		          <KeyboardArrowUpIcon />
		        </Fab>
		      </ScrollTop>
		    </React.Fragment>
);
}