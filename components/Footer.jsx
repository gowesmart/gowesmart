const Footer = () => {
    return (
        <footer className="text-white">
            <section className="bg-neutral">
                <div className="container mx-auto flex flex-col justify-center items-center py-20 gap-20">
                    <div className="flex justify-center gap-32 items-center w-full">
                        <div>
                            <p className="font-semibold text-[24px] mb-5">GOWESMART</p>
                            <ul className="text-[14px] font-light">
                                <li>About Gowesmart</li>
                                <li>Gowesmart Outlet Locations in Indonesia</li>
                                <li>Our Brands at Gowesmart</li>
                                <li>Gowesmart Member Benefits</li>
                                <li>Business Opportunities</li>
                                <li>Careers</li>
                            </ul>
                        </div>
                        <div>
                            <p className="font-semibold text-[24px] mb-5">CUSTOMER FACILITIES</p>
                            <ul className="text-[14px] font-light">
                                <li>Bike Selection Guide</li>
                                <li>Tips & Tricks (Blog)</li>
                                <li>Bike Events</li>
                                <li>Bike Service Costs</li>
                                <li>Bike Rent</li>
                                <li>Bike Fitting</li>
                            </ul>
                        </div>
                        <div>
                            <p className="font-semibold text-[24px] mb-5">SHOPPING GUIDE</p>
                            <ul className="text-[14px] font-light">
                                <li>How to Order</li>
                                <li>Shipping Policy</li>
                                <li>Return Policy</li>
                                <li>Bike Warranty</li>
                                <li>Help Center</li>
                                <li>Terms and Conditions</li>
                            </ul>
                        </div>
                    </div>
                    <div>
                        <p className="font-semibold text-[24px] text-center mb-4">FOLLOW US</p>
                        <ul className="text-[24px] flex justify-center items-center gap-7">
                            <i className="fa-brands fa-facebook"></i>
                            <i className="fa-brands fa-instagram"></i>
                            <i className="fa-brands fa-twitter"></i>
                            <i className="fa-brands fa-youtube"></i>
                        </ul>
                    </div>
                </div>
            </section>
            <section className="bg-primary">
                <div className="container mx-auto flex justify-center items-center p-5">
                    COPYRIGHT © 2024 GOWESMART. ALL RIGHTS RESERVED.
                </div>
            </section>
        </footer>
    )
}

export default Footer