import React, { useRef} from "react";
// @material-ui/core components
import axios from 'axios';

export default function SectionHsnImo(props) {
	const [hsData, setHsData] = React.useState([]);
	const [hsCode, setHsCode] = React.useState("");
	const [hscodeOpen, setHscodeOpen] = React.useState(false);
	const [hscodeFail, setHscodeFail] = React.useState(false);
	const [hsinputMes, setHsinputMes] = React.useState(true);

	const [imo, setImo] = React.useState("");

	const linkRef = useRef();
	const hsInput = useRef();
	const imoInput =useRef();


	const Hs_search = () => {

		if(hsCode) {
			axios.post("/api/elasticHsSearch",{hs:hsCode}).then(setHsData([])).then(
				res => {
					if(res.data) {//console.log("hs data",res.data);	
							setHsData(res.data);							
							setHsinputMes(false);
							setHscodeOpen(true);
							setHscodeFail(false);
							hsInput.current.focus();
					} else {						
						//setHsData({satmntPrdlstNm:"데이터가 존재하지 않습니다."});
						setHsinputMes(true);
						setHscodeFail(true);
						setHscodeOpen(false);
						setHsCode('');
						hsInput.current.focus();
					}}
			).catch(err => {
				props.alertMsg(err,'error');
				setHscodeOpen(false);
				setHscodeFail(false);
			});
		} else {
			props.alertMsg("조회할 코드를 입력해주세요.",'error');
			setHscodeOpen(false);
		}	
	}
  return (
	<section id="section2" className="section section--02">
		<div className="section__inner">
			<div className="search-wrap">
				<div className="search is-left">
					<div className="search__inner">
						{/* <!-- 2021-02-03 div 추가 --> */}
						<h3 className="title">HS코드 찾기</h3>
						{hsinputMes === true ? 
							<p className="text">품명을 입력해주세요</p>	: null}								
								<div className="search__box">
									<input
										type="search"
										className="search__box--input"
										placeholder="Search"
										onChange={event => setHsCode(event.target.value)} 
										value={hsCode}
										ref={hsInput}
										onKeyPress={(e)=>{
											if (e.key==='Enter'){
												Hs_search();
											}
										}}
									/>
									<button type="submit" className="search__box--submit" onClick={Hs_search}>
										<span className="sr-only">검색</span>
									</button>
								</div> 
								{hscodeOpen ===true ?
								<div className="search-value search-value--result">
									<ul className="search-value__list">
										<li><strong>품목번호</strong> <span className="system">{hsData.prdlstCd}&nbsp;{hsData.prdlstCdDetail}</span></li>
										<li><strong>품명</strong> <span className="system">{hsData.satmntPrdlstNm}</span></li>
									</ul>
								</div>:null}
								{hscodeFail === true ?
								<div className="search-value search-value--fail">
									<p>품명이 올바르지 않거나, 결과가 없습니다.</p>
								</div> :null}
							</div>
						</div>
						<div className="search is-right">
							<div className="search__inner">
							{/* <!-- 2021-02-03 div 추가 --> */}
								<h3 className="title">IMO 번호 조회</h3>
									<p className="text">선박명을 입력해주세요</p>
								<div className="search__box">
									<input
										type="search"
										className="search__box--input"
										placeholder="Search"
										onChange={event => setImo(event.target.value)} 
										ref={imoInput}
										onKeyPress={(e)=>{
											if (e.key==='Enter'){
												linkRef.current.click();
											}
										}}
									/>
									<a ref={linkRef} href={"/svc/imosearch?search="+imo} >
									<button type="submit" className="search__box--submit" >
										<span className="sr-only">검색</span>
									</button>
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
  );
}

