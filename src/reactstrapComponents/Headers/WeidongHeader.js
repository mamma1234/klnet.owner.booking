import React from "react";

// reactstrap components

// core components

function ProductPageHeader() {
	 let pageHeader = React.createRef();

	  React.useEffect(() => {
	    if (window.innerWidth > 991) {
	      const updateScroll = () => {
	        let windowScrollTop = window.pageYOffset / 3;
	        if(pageHeader.current !== null) {
	        	pageHeader.current.style.transform ="translate3d(0," + windowScrollTop + "px,0)";
	        }
	      };
	      window.addEventListener("scroll", updateScroll);
	      return function cleanup() {
	        window.removeEventListener("scroll", updateScroll);
	      };
	    }
	  });
  return (
    <>
      <div
      	ref={pageHeader}
        className="bg-white page-header page-header-xss"
      >
      
      </div>
    </>
  );
}

export default ProductPageHeader;
