import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import {FormControl,InputAdornment} from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Input from "@material-ui/core/Input";
import * as validation from "components/common/validation.js";
import styles from "assets/jss/material-dashboard-pro-react/components/customInputStyle.js";
import {Close} from "@material-ui/icons";
    
const useStyles = makeStyles(styles);

export default function CustomInput(props) {
  const classes = useStyles();
  const {
    formControlProps,
    validtype,
    labelText,
    id,
    feedback,
    labelProps,
    inputProps,
   // error,
    white,
    inputRootCustomClasses,
  //  success,
    required,
    maxLength
  } = props;
  
  const vValidation = fncValidation(props.inputProps.value);


  const labelClasses = classNames({
    [" " + classes.labelRootError]: vValidation,
    [" " + classes.labelRootSuccess]: props.inputProps.value && !vValidation
  });
  
  const underlineClasses = classNames({
    [classes.underlineError]: vValidation,
    [classes.underlineSuccess]: props.inputProps.value && !vValidation,
    [classes.underline]: true,
    [classes.whiteUnderline]: white
  });
  const marginTop = classNames({
    [inputRootCustomClasses]: inputRootCustomClasses !== undefined
  });
  const inputClasses = classNames({
    [classes.input]: true,
    [classes.whiteInput]: white
  });
  var formControlClasses;
  if (formControlProps !== undefined) {
    formControlClasses = classNames(
      formControlProps.className,
      classes.formControl
    );
  } else {
    formControlClasses = classes.formControl;
  }
  var helpTextClasses = classNames({
    [classes.labelRootError]: vValidation,
    [classes.labelRootSuccess]: props.inputProps.value && !vValidation
  });
  
  /**
   * 필수
   * value, maxLength 값은 입력이 필요함.
   * required = true:false 필수여부
   * validtype = text(일반텍스트) email(이메일) tel(전화번호)
   */
  let msgLength = "";
  if( maxLength ) {
      msgLength = " ("+maxLength+"/"+ validation.getByteB(props.inputProps.value)+")";
  } else {
      msgLength = "";
  }
  
  function fncValidation(value) {

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
              }
          } else {
              // 필수가 아닌 경우 false
              return false;
          }
      }
  }

  return (
    <FormControl {...formControlProps} className={formControlClasses}>
      {labelText !== undefined ? (
        <InputLabel
          className={classes.labelRoot + " " + labelClasses}
          htmlFor={id}
          {...labelProps}
        >
          {labelText}
        </InputLabel>
      ) : null}
      <Input 
        classes={{
          input: inputClasses,
          root: marginTop,
          disabled: classes.disabled,
          underline: underlineClasses
        }}
        id={id}
        autoComplete='off'
      endAdornment={vValidation?
   	       (
             <InputAdornment position="end">
               <Close className={classes.danger} style={{color:'red'}} />
             </InputAdornment>
           ) : (
             undefined
           )}
        {...inputProps}
      />
      {vValidation? (
        <FormHelperText feedid={feedback} className={helpTextClasses}>
        {
            required?
                validation.REQ_MSG+(
                'text' === validtype ? validation.LEN_MSG+msgLength:
                'email' === validtype ?  validation.EMAIL_MSG+msgLength :
                'tel' === validtype ?  validation.TEL_MSG+msgLength :
                'number' === validtype ?  validation.NUM_MSG+msgLength :
                'english' === validtype ?  validation.ENG_MSG+msgLength :
                'engNumber' === validtype ?  validation.ENG_NUM_MSG+msgLength : 
                'validtype' === validtype ? validation.REQ_MSG : '')
            :
                'text' === validtype ? validation.LEN_MSG+msgLength :
                'email' === validtype ?  validation.EMAIL_MSG+msgLength :
                'tel' === validtype ?  validation.TEL_MSG+msgLength :
                'number' === validtype ?  validation.NUM_MSG+msgLength :
                'english' === validtype ?  validation.ENG_MSG+msgLength:
                'engNumber' === validtype ?  validation.ENG_NUM_MSG+msgLength : 
                'validtype' === validtype ? validation.REQ_MSG : ''
        }
        </FormHelperText>
      ) : <></>}
    </FormControl>
  );
}

CustomInput.propTypes = {
  labelText: PropTypes.node,
  labelProps: PropTypes.object,
  id: PropTypes.string,
  inputProps: PropTypes.object,
  formControlProps: PropTypes.object,
  inputRootCustomClasses: PropTypes.string,
  error: PropTypes.bool,
  success: PropTypes.bool,
  white: PropTypes.bool,
  helperText: PropTypes.node
};
