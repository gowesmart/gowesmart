const AboutUs = () => {
    return (
        <section className="pt-20 pb-28 px-5 xl:px-0">
            <div className="flex flex-col xl:flex-row justify-between xl:h-[550px]">
                <div className="xl:w-[50%] bg-secondary h-[300px] md:h-[500px] mb-5 xl:mb-0 xl:h-full flex flex-col justify-center items-center">
                    <i aria-hidden className="fa-solid fa-bicycle text-[40px] md:text-[64px]"></i>
                    <p className="font-bold md:text-[20px] mt-1">gowesmart</p>
                </div>
                <div className="flex flex-col gap-5 justify-between">
                    <div className="py-9 px-14 border border-accent">
                        <p className="text-[24px] font-bold mb-5">about us</p>
                        <p className="font-light">At Gowesmart, we are passionate about cycling and dedicated<br />
                            to providing the best products and services for all your biking<br />
                            needs. Whether you are a seasoned cyclist or just starting out,<br />
                            we have everything you need to enjoy your ride to the fullest.</p>
                    </div>
                    <div className="py-9 px-14 border border-accent">
                        <p className="text-[24px] font-bold mb-5">our story</p>
                        <p className="font-light">Gowesmart was founded with a simple goal: to make cycling <br />
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