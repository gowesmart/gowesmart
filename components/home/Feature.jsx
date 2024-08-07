const Feature = () => {
    return (
        <section className="py-5 flex justify-between items-center">
            <div className="bg-tertiary p-5 flex justify-center items-center gap-5 rounded-md border border-accent">
                <div className="text-[48px]"><i aria-hidden className="fa-solid fa-money-bill-transfer"></i></div>
                <div>
                    <p className="text-secondary text-[12px] font-bold">INSTALLMENT PAYMENT</p>
                    <p className="text-[12px]">0% installment facility for up to<br />
                        12 months (T&C apply)</p>
                </div>
            </div>
            <div className="bg-tertiary p-5 flex justify-center items-center gap-5 rounded-md border border-accent">
                <div className="text-[48px]"><i aria-hidden className="fa-solid fa-truck-fast"></i></div>
                <div>
                    <p className="text-secondary text-[12px] font-bold">FREE SHIPPING</p>
                    <p className="text-[12px]">Free shipping according to T&C</p>
                </div>
            </div>
            <div className="bg-tertiary p-5 flex justify-center items-center gap-5 rounded-md border border-accent">
                <div className="text-[48px]"><i aria-hidden className="fa-solid fa-screwdriver-wrench"></i></div>
                <div>
                    <p className="text-secondary text-[12px] font-bold">FREE ASSEMBLY</p>
                    <p className="text-[12px]">Free assembly for Polygon bikes<br />
                        at all Gowesmart outlets<br />
                        (T&C apply)</p>
                </div>
            </div>
            <div className="bg-tertiary p-5 flex justify-center items-center gap-5 rounded-md border border-accent">
                <div className="text-[48px]"><i aria-hidden className="fa-solid fa-store"></i></div>
                <div>
                    <p className="text-secondary text-[12px] font-bold">CLICK & COLLECT</p>
                    <p className="text-[12px]">No need to wait in line, buy<br />
                        online and pick up your items<br />
                        directly at our store!</p>
                </div>
            </div>
        </section>
    )
}

export default Feature