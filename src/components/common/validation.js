import $ from 'jquery';
import axios from 'axios';
/**
 * 추후 없어질것.
 */
export const REQ_MSG = "필수 ";
export const EML_MSG = "이메일 형태가 아닙니다.";
export const UPP_MSG = "대문자로 입력하세요.";
export const SEND_MSG = "전송 되었습니다.";
export const SAVE_MSG = "저장 되었습니다.";
export const DEL_MSG = "삭제 되었습니다.";
export const ERR_MSG = "오류가 발생했습니다.";
export const NEW_MSG = "등록 되었습니다.";
export const EXCD_MSG = "Digit Exceeded Error";
export const NOTLOGIN_MSG = "로그인이 필요한 서비스 입니다.";
export const TOKEN_EXPIRED_MSG = "사용자 인증 만료로 로그인이 필요한 서비스 입니다.";

/**
 * 부킹 SR 번호 직접 생성
 */
export const NO_NULL_MSG = "직접 생성할 번호를 입력하세요.";
export const NO_CHECK_MSG = "특수문자 및 한글은 입력 불가합니다.";
export const NO_MAKE_MSG = "번호로 새로 만드시겠습니까?";
export const NO_DUP_CHECK_MSG = "중복체크를 눌러주세요.";
export const NO_BKG_RECIPIENT = "BOOKING 업체 정보가 없습니다. [내 업체 선택] 후 이용하세요.";
export const NO_SR_RECIPIENT = "SR 업체 정보가 없습니다. [내 업체 선택] 후 이용하세요.";

/**
 * InputValid 사용
 */
export const LEN_MSG = "입력가능:";
export const EMAIL_MSG = "이메일 형식이 아닙니다.";
export const TEL_MSG = "전화번호 형식이 아닙니다.";
export const NUM_MSG = "숫자만 입력 가능합니다.";
export const ENG_MSG = "영어만 입력 가능합니다.";
export const ENG_NUM_MSG = "영어와 숫자만 입력 가능합니다.";

/**
 *  login err code
 */
export const E1001 = "아이디 혹은 비밀번호가 일치하지 않습니다. 입력한내용을 다시 확인해 주세요.";
export const E1002 = "입력한 계정은 존재하지 않습니다. 입력한내용을 다시 확인해 주세요.";

/**
 * Alert Message
 */
export const NO_USER_MSG="로그인 정보가 없습니다.";
export const DATE_MSG = "날짜를 다시 확인해주세요.";
export const OK_CHECK_MSG="조회가 완료되었습니다.";
export const FAIL_CHECK_MSG="조회 결과가 없습니다.";
export const LAST_PAGE_MSG="마지막 페이지입니다.";


export const validationEmail =(text)=>{
    let type = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let email = text;
    if( email ) {
        let returnValue = type.test(email.toLowerCase());
        return returnValue;
    } else {
        return false;
    }
}



export const validationNo =(text)=>{
    let type = /^[a-zA-Z0-9]*$/;
    if( text ) {
        let returnValue = type.test(text);
        return returnValue;
    } else {
        return false;
    }
}

export const validationHangle =(text)=>{
	let type=/[ㄱ-ㅎ|ㅏ-ㅣ|가-힝]/;
    if(text) {
    	let returnValue = type.test(text);
        return returnValue;
    } else {
        return false;
    }
}

export const validationHanSpc =(text)=>{
	let type=/[ㄱ-ㅎ|ㅏ-ㅣ|가-힝|~!@#$%^&*()_+|<>?:{}]/;
    if(text && !type.test(text)) {
        return true;
    } else {
        return false;
    }
}

export const validationDigit =(text,num)=>{
    if( text && text.length <= num ) {
        return true;
    } else {
        return false;
    }
}

export const getByte =(text)=>{
   return text.split('').map(s=>s.charCodeAt(0)).reduce((prev,c) => (prev +((c === 10)?2:((c>>7)?2:1))),0);
}


export const validationByteMaxLength = (text, maxLength)=> {
    // console.log(">>>>",text)
    if( text ) {
        let j = 0;
        let val = null;
        for( let i=0; i<text.length; i++ ) {
            val = escape(text.charAt(i)).length;
            if( val == 6 ) {
                j++;
            }
            j++;
        }
        return maxLength<=j;
    } else {
        return false;
    }
}

export const getByteLength = (text)=> {
    // console.log(">>>>",text)
    if( text ) {
        let j = 0;
        let val = null;
        for( let i=0; i<text.length; i++ ) {
            val = escape(text.charAt(i)).length;
            if( val == 6 ) {
                j++;
            }
            j++;
        }
        return j;
    } else {
        return 0;
    }
}















/**
 * InputValid 컴포넌트 사용
 * 한글 2byte 계산
 * @param {*} str 
 */
export function getByteB(str) {
    var byte = 0;
    for (var i=0; i<str.length; ++i) {
        // 기본 한글 2바이트 처리
        (str.charCodeAt(i) > 127) ? byte += 2 : byte++ ;
    }
    return byte;
}

/**
 * InputValid 컴포넌트 사용
 * 최대길이(maxLength) 비교
 * @param {*} str 
 * @param {*} maxLength 
 */
export const validMaxLength =( str, maxLength)=> {
    let bytes = getByteB(str);
    // console.log( bytes );
    if( str ) {
        if( bytes > maxLength ) {
            return true;
        } else {
            return false;
        }
    }
}

/**
 * InputValid 컴포는터 사용
 * Emial 형식 체크
 * @param {*} str 
 */
export const validEmail =(str)=> {
    var regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    return regExp.test(str); // 형식에 맞는 경우 true 리턴 
}

/**
 * InputValid 컴포넌트 사용
 * @param {*} asValue 
 */
export const validCelluar =(asValue)=> {
    var regExp = /^01(?:0|1|[6-9])-(?:\d{3}|\d{4})-\d{4}$/;
    return regExp.test(asValue); // 형식에 맞는 경우 true 리턴
}

/**
 * InputValid 사용
 * 전화번호 또는 팩스번호 체크
 * @param {*} asValue 
 */
export const validTel =(asValue)=> {
    var regExp = /(?:\d{2}|\d{3})(?:-|)(?:\d{3}|\d{4})(?:-|)\d{4}$/;
    return regExp.test(asValue); // 형식에 맞는 경우 true 리턴
}

/**
 * InputValid 사용
 * 영문 대문자 및 숫자만 허용
 * @param {*} asValue 
 */
export const validEngNumber =(asValue)=> {
    var regExp = /^[A-Za-z0-9+]*$/;
    return regExp.test(asValue); // 형식에 맞는 경우 true 리턴
}


/**
 * InputValid 사용
 * 숫자만 허용
 * @param {*} asValue 
 */
export const validNumber =(asValue)=> {
    var regExp = /^[0-9+]*$/;
    return regExp.test(asValue); // 형식에 맞는 경우 true 리턴
}

/**
 * InputValid 사용
 * 영어만 허용
 * @param {*} asValue 
 */
export const validEnglish =(asValue)=> {
    var regExp = /^[0-9a-zA-ZA-Za-z|()-.,/ +]*$/;
    return regExp.test(asValue); // 형식에 맞는 경우 true 리턴
}




/**
 * 비밀번호 유효성 검사 ( 영문,숫자 혼합 6~20)
 */
export const verifyPassword = (value) => {
    //var passwordRex = /^.*(?=.{6,20})(?=.*[0-9])(?=.*[a-zA-Z]).*$/; ( 영문,숫자 혼합 6~20)
    var passwordRex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/; //(숫자/대문자/소문자/특수문자를 모두 포함 8자~)
    return !passwordRex.test(value)?false:true;
}
/**
 * 스페이스바 검사
 */

export const checkSpace = (value) => {
    if(value.search(/\s/) != -1) {
      return true;
    }else {
      return false;
    }
  }
 /**
 * ID 유효성 검사
 */ 
export const verifyId = (value)  => {
    var idRex = /^[a-zA-Z0-9]/gi;
  
    if(idRex.test(value) === true) {
      return true;
    }else {
      return false;
    }
  
  }
/**
 * 필수 체크 여부
 * SEND 할때 사용하세요
 */
export const fncValidation=()=>{
    let check = true;
    let feedback = $('.MuiFormHelperText-root');
    feedback.each(function(i, item){
        if( 'block' === $(item).css('display') && $(item).attr('feedid') ) {
            if( 'deny' !== $(item).attr('feedid') ) {
                // console.log(item)
                check = false;
            }

        } else if ( 'block' === $(item).css('display') && $(item).attr('name') ) {
            if( 'deny' !== $(item).attr('name') ) {
                // console.log(item)
                check = false;
            }
        }
        // break;
    });
    return check;
}
/**
 * 
 */
export const fncFeedIdInvalid =( text )=> {
    let feedback = $('.MuiFormHelperText-root ');
    let check = false;
    feedback.each(function(i, item){
        if( 'block' === $(item).css('display') && $(item).attr('feedid') ) {
            if( 'deny' !== $(item).attr('feedid') ) {
                if( text ===  $(item).attr("feedid") ) {
                    // console.log("text: ",text, "feedid: ",$(item).attr('feedid'), "feedback: ",feedback);
                    check = true;
                    return check;
                }
            }
        } else if( 'block' === $(item).css('display') && $(item).attr('name') ) {
            if ( 'deny' !== $(item).attr('name') ) {
                if( text ===  $(item).attr("name") ) {
                    // console.log("text: ",text, "name: ",$(item).attr('name'), "feedback: ",feedback);
                    check = true;
                    return check;
                }
            }
        }
    });
    return check;

}

/**
 * 필수 제외 자릿수만 체크
 * SAVE 할때 사용하세요
 */
export const fncValidationMaxLength =()=> {
    let check = true;
    let feedback = $('.MuiFormHelperText-root');
    feedback.each(function(i, item){
        // console.log(i, item)
        if( 'block' === $(item).css('display') &&
            'deny' !== $(item).attr('feedid') ) {
            
            //<div feedid="booking" class="invalid-feedback">필수 입력가능: (20/28)</div>
            // (20/28) 중 20 꺼내기
            let text = $(item).text();
            let maxNum = text.substring(
                text.lastIndexOf("(")+1,
                text.lastIndexOf("/"),
            )
            // (20/28) 중 28 꺼내기
            let curNum = text.substring(
                text.lastIndexOf("/")+1,
                text.lastIndexOf(")"),
            )
            // console.log(firstNum, curNum)

            if( parseInt(maxNum) <parseInt(curNum) ) {
                check = false;
                return check;
            }
        }
    });
    return check;
}

/**
 * 
 */
export const fncFeedIdInvalidMaxLength =( feedid )=> {
    let feedback = $('.MuiFormHelperText-root');
    let check = false;
    feedback.each(function(i, item){
        if( 'block' === $(item).css('display')&&
            'deny' !== $(item).attr('feedid')) {

            //<div feedid="booking" class="invalid-feedback">필수 입력가능: (20/28)</div>
            // (20/28) 중 20 꺼내기
            let text = $(item).text();
            let maxNum = text.substring(
                text.lastIndexOf("(")+1,
                text.lastIndexOf("/"),
            )
            // (20/28) 중 28 꺼내기
            let curNum = text.substring(
                text.lastIndexOf("/")+1,
                text.lastIndexOf(")"),
            )

            if( feedid ===  $(item).attr("feedid")
            && parseInt(maxNum) <parseInt(curNum) ) {
                check = true;
                return check;
            }
        }
    });
    return check;

}


export const fncWeidongDangerCheck =(line_code, start_port_code, end_port_code, vessel_name, callback)=> {
    axios.post(
        "/shipper/selectWeidongDangerCheck"
        ,{
            line_code: line_code,
            start_port_code: start_port_code,
            end_port_code: end_port_code,
            vessel_name: vessel_name
        }
        ,{}
    ).then(
        // props.onAlert("success", "정상 조회 되었습니다.")
    ).then(
        res => {
            const result =  res.data[0];
            console.log( result );
            if( result ) {
                if ("Y" == result.cargo_trans_yn && "Y" == result.vsl_cntr_yn) {
                    callback(true);
                } else {
                    callback(false);
                }
            } else {
                callback(false);
            }
            
        }   
    ).catch(
        error => {
            //
        }
    );
}
/**
 * 전화번호 포맷 return String
 */
export const TELFormatter = (num) => {
    if(num !== null) {
        let Num = num;
        if(!Num) return "";
        let formatNum = "";

        Num = num.replace(/\s/gi,"");

        try{
            formatNum = Num.replace(/(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/,'$1-$2-$3');
        }catch(e) {
            formatNum = Num;
        }
        return formatNum
    }else {
        return num;
    }
}
/**
 * 날짜포맷 '-'삽입
 */
export const YMDFormatter = (num) => {
    let Num = num;
    if(!Num) return "";
    let formatNum = "";

    Num = num.replace(/\s/gi,"");

    try{
        if(Num.length === 8) {
            formatNum = Num.replace(/(\d{4})(\d{2})(\d{2})/,'$1-$2-$3');
        }else if(Num.length ===12 ){
            formatNum = Num.replace(/(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})/,'$1-$2-$3 $2:$2');
        }else if(Num.length ===14 ){
            formatNum = Num.replace(/(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/,'$1-$2-$3 $2:$2:$2');
        }
    }catch(e) {
        formatNum = Num;
    }
    return formatNum
}

/**
 * 사람이름 포맷 ex) 홍길동-> 홍*동, 김구 -> 김*, 김아무개 -> 김**개
 */
export const NameReplace = (value) =>{
    if( value.length !== 0 && value!==null && value!==undefined) {
      if(value.length === 2) {
  
        return value.substr(0,1) + '*'
      }else if (value.length === 1) {
        return '*';
      }else {
        return value.substr(0,1) + '*' + value.substr(value.length-1, value.length);
      }
    } else {
      return null;
    }
  
  }
  