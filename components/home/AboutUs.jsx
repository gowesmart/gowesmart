const AboutUs = () => {
    return (
        <section className="pt-20 pb-28">
            <div className="flex justify-between h-[550px]">
                <div className="w-[50%] bg-secondary h-full flex flex-col justify-center items-center">
                    <i className="fa-solid fa-bicycle text-[64px]"></i>
                    <p className="font-bold text-[20px]">gowesmart</p>
                </div>
                <div className="flex flex-col gap-5 justify-between">
                    <div className="py-9 px-14 border border-accent">
                        <p className="text-[24px] font-bold mb-5">about us</p>
                        <p>At Gowesmart, we are passionate about cycling and dedicated<br />
                            to providing the best products and services for all your biking<br />
                            needs. Whether you are a seasoned cyclist or just starting out,<br />
                            we have everything you need to enjoy your ride to the fullest.</p>
                    </div>
                    <div className="py-9 px-14 border border-accent">
                        <p className="text-[24px] font-bold mb-5">our story</p>
                        <p>Gowesmart was founded with a simple goal: to make cycling <br />
                            accessible and enjoyable for everyone. Over the years, we have <br />
                            grown into a trusted name in the cycling community, known for <br />
                            our commitment to quality and customer satisfaction. We are<br />
                            proud to be a part of your cycling journey and look forward to <br />
                            helping you find the perfect bike and gear.</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AboutUs