import React from 'react';

import {Input,FormFeedback, InputGroup, InputGroupText, InputGroupAddon} from 'reactstrap';
import * as validation from 'components/common/validation.js';
import moment from 'moment';

export default function InputValid (props) {
/**
 * <InputValid 
    type="text"
    name="cntr_qty"
    id="cntr_qty"
    bsSize={("MAIN"===openType)?'sm':null}
    placeholder=""
    onChange={(e)=>fncOnChange(e, 'cntr_qty')}
    onBlur={(e) => {fncOnBlur(e)}}
    maxLength="4" --> 필수
    value={container.cntr_qty?container.cntr_qty:''} --> 필수
    validtype="text" --> (email, tel) 필수 형식 체크(custom prperty)
    required={'CARD'===openType||'MAIN'===openType?true:false}  --> 필수입력은 true 아닌경우 false(길이만 체크)(custom prperty)
    feedid="container" --> 필수 validtation 실행 시 open할 Card 정보
    inputgrouptext --> 선택 kg, CBM 등 단위 표시
/>


SEND 시 필수 및 길이 validtiaon 체크
validation.fncValidation();
validation.fncFeedIdInvalidMaxLength('booking');

SAVE 시 길이만 validation 체크
validation.fncValidationMaxLength(); 
validation.fncFeedIdInvalidMaxLength('booking');

 */
    const {
        value,
        required,
        validtype,
        maxLength,
        feedid,
        inputgrouptext,
        bsSize,
        disable
    } = props;

    /**
     * 필수
     * value, maxLength 값은 입력이 필요함.
     * required = true:false 필수여부
     * validtype = text(일반텍스트) email(이메일) tel(전화번호)
     */
    let msgLength = "";
    if( maxLength ) {
        msgLength = " ("+maxLength+"/"+ validation.getByteB(value)+")";
    } else {
        msgLength = "";
    }
    const fncValidation =()=> {

        // console.log( "validtype",validtype )
        // 1. 필수 부터 확인
        if( required ) {
            // 1.1 필수 인 경우
            if( value ) {
                // 2. Check validtype
                if( 'text' === validtype ) {
                    if( maxLength ) {
                        return validation.validMaxLength(value, maxLength);
                    } else {
                        return false;
                    }
                } else if ( 'email' === validtype ) {
                    if( validation.validEmail(value) ) {
                        if( maxLength ) {
                            return validation.validMaxLength(value, maxLength);
                        } else {
                            return false;
                        }
                    } else {
                        return true;
                    }
                } else if ( 'tel' === validtype ) {
                    if( validation.validTel(value) ) {
                        if( maxLength ) {
                            return validation.validMaxLength(value, maxLength);
                        } else {
                            return false;
                        }
                    } else {
                        return true;
                    }
                } else if ( 'engNumber' === validtype ) {
                    if( validation.validEngNumber(value) ) {
                        if( maxLength ) {
                            return validation.validMaxLength(value, maxLength);
                        } else {
                            return false;
                        }
                    } else {
                        return true;
                    }
                }  else if ( 'number' === validtype ) {
                    if( validation.validNumber(value) ) {
                        if( maxLength ) {
                            return validation.validMaxLength(value, maxLength);
                        } else {
                            return false;
                        }
                    } else {
                        return true;
                    }
                } else if ( 'english' === validtype ) {
                    if( validation.validEnglish(value) ) {
                        if( maxLength ) {
                            return validation.validMaxLength(value, maxLength);
                        } else {
                            return false;
                        }
                    } else {
                        return true;
                    }
                } else if ( 'yyyymmdd' === validtype ) {
                    if( value.length === 8 ) {
                        let dateTime = moment(value,'YYYYMMDD');
                        if( dateTime.isValid() ) {
                            return false;
                        } else {
                            return true;
                        }
                    } else if( value.length === 10 ) {
                        let dateTime = moment(value,'YYYY-MM-DD');
                        if( dateTime.isValid() ) {
                            return false;
                        } else {
                            return true;
                        }
                    } else {
                        return true;
                    }
                } else if ( 'yyyymmddhhmm' === validtype ) {
                    if( value.length === 12 ) {
                        let dateTime = moment(value,'YYYYMMDDHHmm');
                        if( dateTime.isValid() ) {
                            return false;
                        } else {
                            return true;
                        }
                    } else if( value.length === 16 ) {
                        let dateTime = moment(value,'YYYY-MM-DD HH:mm');
                        if( dateTime.isValid() ) {
                            return false;
                        } else {
                            return true;
                        }
                    } else {
                        return true;
                    }
                }
            } else {
                return true;
            }
        } else {
            // 1.1 필수가 아닌 경우
            if( value ) {
                if( 'text' === validtype ) {
                    return validation.validMaxLength(value, maxLength);
                } else if ( 'email' === validtype ) {
                    if( validation.validEmail(value) ) {
                        if( maxLength ) {
                            return validation.validMaxLength(value, maxLength);
                        } else {
                            return false;
                        }
                    } else {
                        return true;
                    }
                } else if ( 'tel' === validtype ) {
                    if( validation.validTel(value) ) {
                        if( maxLength ) {
                            return validation.validMaxLength(value, maxLength);
                        } else {
                            return false;
                        }
                    } else {
                        return true;
                    }
                } else if ( 'engNumber' === validtype ) {
                    if( validation.validEngNumber(value) ) {
                        if( maxLength ) {
                            return validation.validMaxLength(value, maxLength);
                        } else {
                            return false;
                        }
                    } else {
                        return true;
                    }
                } else if ( 'number' === validtype ) {
                    if( validation.validNumber(value) ) {
                        if( maxLength ) {
                            return validation.validMaxLength(value, maxLength);
                        } else {
                            return false;
                        }
                    } else {
                        return true;
                    }
                } else if ( 'english' === validtype ) {
                    if( validation.validEnglish(value) ) {
                        if( maxLength ) {
                            return validation.validMaxLength(value, maxLength);
                        } else {
                            return false;
                        }
                    } else {
                        return true;
                    }
                } else if ( 'yyyymmdd' === validtype ) {
                    if( value.length === 8 ) {
                        let dateTime = moment(value,'YYYYMMDD');
                        if( dateTime.isValid() ) {
                            return false;
                        } else {
                            return true;
                        }
                    }  else if( value.length === 10 ) {
                        let dateTime = moment(value,'YYYY-MM-DD');
                        if( dateTime.isValid() ) {
                            return false;
                        } else {
                            return true;
                        }
                    } else {
                        return true;
                    }
                } else if ( 'yyyymmddhhmm' === validtype ) {
                    if( value.length === 12 ) {
                        let dateTime = moment(value,'YYYYMMDDHHmm');
                        if( dateTime.isValid() ) {
                            return false;
                        } else {
                            return true;
                        }
                    } else if( value.length === 16 ) {
                        let dateTime = moment(value,'YYYY-MM-DD HH:mm');
                        if( dateTime.isValid() ) {
                            return false;
                        } else {
                            return true;
                        }
                    } else {
                        return true;
                    }
                }
            } else {
                // 필수가 아닌 경우 false
                return false;
            }
        }
    }
    return (
        <>
        {inputgrouptext?
            <InputGroup>
                <Input
                    {...props}
                    invalid={fncValidation()}>
                </Input>
                <InputGroupAddon addonType="append"> 
                    <InputGroupText className={bsSize==='sm'?"pb-1":""}>{inputgrouptext}</InputGroupText> 
                </InputGroupAddon>
                
                <FormFeedback
                    feedid={feedid}
                >{
                    required?
                        validation.REQ_MSG+(
                        'text' === validtype ? validation.LEN_MSG+msgLength:
                        'email' === validtype ?  validation.EMAIL_MSG+msgLength :
                        'tel' === validtype ?  validation.TEL_MSG+msgLength :
                        'number' === validtype ?  validation.NUM_MSG+msgLength :
                        'engNumber' === validtype ?  validation.ENG_NUM_MSG+msgLength :
                        'english' === validtype ?  validation.ENG_MSG+msgLength :
                        // 'validtype' === validtype ? validation.REQ_MSG : 
                        'yyyymmdd' === validtype ? validation.YYYYMMDD_MSG : 
                        'yyyymmddhhmm' === validtype ? validation.YYYYMMDDHHMM_MSG :'' 
                        )
                    :
                        'text' === validtype ? validation.LEN_MSG+msgLength :
                        'email' === validtype ?  validation.EMAIL_MSG+msgLength :
                        'tel' === validtype ?  validation.TEL_MSG+msgLength :
                        'number' === validtype ?  validation.NUM_MSG+msgLength :
                        'engNumber' === validtype ?  validation.ENG_NUM_MSG+msgLength :
                        'english' === validtype ?  validation.ENG_MSG+msgLength :
                        // 'validtype' === validtype ? validation.REQ_MSG :
                        'yyyymmdd' === validtype ? validation.YYYYMMDD_MSG : 
                        'yyyymmddhhmm' === validtype ? validation.YYYYMMDDHHMM_MSG :'' 
                }</FormFeedback>
            </InputGroup>
        :
            <>
                <Input
                    {...props}
                    invalid={fncValidation()} disabled={disable?disable:false}>
                </Input>
                <FormFeedback
                    feedid={feedid}
                >{
                    required?
                        validation.REQ_MSG+(
                        'text' === validtype ? validation.LEN_MSG+msgLength:
                        'email' === validtype ?  validation.EMAIL_MSG+msgLength :
                        'tel' === validtype ?  validation.TEL_MSG+msgLength :
                        'number' === validtype ?  validation.NUM_MSG+msgLength :
                        'english' === validtype ?  validation.ENG_MSG+msgLength :
                        'engNumber' === validtype ?  validation.ENG_NUM_MSG+msgLength : 
                        'validtype' === validtype ? validation.REQ_MSG : 
                        'yyyymmdd' === validtype ? validation.YYYYMMDD_MSG : 
                        'yyyymmddhhmm' === validtype ? validation.YYYYMMDDHHMM_MSG :'' 
                        )
                    :
                        'text' === validtype ? validation.LEN_MSG+msgLength :
                        'email' === validtype ?  validation.EMAIL_MSG+msgLength :
                        'tel' === validtype ?  validation.TEL_MSG+msgLength :
                        'number' === validtype ?  validation.NUM_MSG+msgLength :
                        'english' === validtype ?  validation.ENG_MSG+msgLength:
                        'engNumber' === validtype ?  validation.ENG_NUM_MSG+msgLength : 
                        'validtype' === validtype ? validation.REQ_MSG : 
                        'yyyymmdd' === validtype ? validation.YYYYMMDD_MSG : 
                        'yyyymmddhhmm' === validtype ? validation.YYYYMMDDHHMM_MSG :'' 
                }</FormFeedback>
                
            </>}
        </>
    )
}