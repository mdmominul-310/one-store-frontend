

const ProductSkeletons = () => {
    return (
        <div className="grid grid-cols-4 my-4 container gap-3">
            {
                Array(16).fill(0).map((_, index) => (
                    <div className="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto" key={index}>
                        <div className="animate-pulse  space-x-4">
                            <div className="rounded- bg-slate-700 h-80 w-50"></div>
                            <div className="flex-1 space-y-6 py-1">
                                <div className="h-2 bg-slate-700 rounded"></div>
                                <div className="space-y-3">
                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                                        <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                                    </div>
                                    <div className="h-2 bg-slate-700 rounded"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default ProductSkeletons;