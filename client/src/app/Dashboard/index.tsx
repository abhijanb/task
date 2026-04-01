import { useEffect } from "react"
import { useAddToFavorateMutation, useDashboardQuery, useRemoveFromFavorateMutation } from "../../slice/feature/apiSlice"
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
type DashboardData = {
    user: {
        name: string;
        role: string;
    };
    favoriteProperties: {
        _id: string;
        name: string;
        description: string;
        price: number;
        image: string;
    }[];
    suggestedProperties: {
        _id: string;
        name: string;
        description: string;
        price: number;
        image: string;
    }[];
}
const Dashboard = () => {
    console.log(useDashboardQuery({}))
    const { data: response, refetch, isLoading } = useDashboardQuery({});
    const [addToFavorite] = useAddToFavorateMutation()
    const [removeFromFavorite] = useRemoveFromFavorateMutation()
    const navigate = useNavigate()
    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            navigate('/login');
        }
    }, [response])
    const { favoriteProperties, suggestedProperties, user } = response?.data || { favoriteProperties: [], suggestedProperties: [], user: { name: '', role: '' } } as DashboardData;
    const handleAddToFavorites = async (e: React.FormEvent<HTMLFormElement>, propertyId: string) => {
        e.preventDefault();
        toast.info("Adding to favorites...", { autoClose: 1000 });
        try {
            const res = await addToFavorite(propertyId)
            // @ts-ignore
            if (res?.error?.data?.message === "User not found") {
                toast.error("User not found. Please login again.");
                localStorage.removeItem('accessToken');
                navigate('/login');
                return;
            }
            if (res.data.success) {
                toast.success("Property added to favorites!", { autoClose: 2000 })
            }
            await refetch();
        } catch (error) {
            console.error("Failed to add to favorites:", error);
            toast.error("Failed to add to favorites.");
        }
    }
    const handleRemoveFromFavorites = async (e: React.FormEvent<HTMLFormElement>, propertyId: string) => {
        e.preventDefault();
        toast.info("Removing from favorites...");
        try {
            const res = await removeFromFavorite(propertyId).unwrap()
            if (res.success) {
                toast.success("Property removed from favorites!")
                await refetch()
            }
        } catch (error) {
            console.error("Failed to remove from favorites:", error);
            toast.error("Failed to remove from favorites.");
        }
    }
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <p className="text-sm text-slate-500">Loading dashboard...</p>
            </div>
        )
    }
    return (
        <div className="min-h-screen bg-slate-50">
            <nav className="border-b border-slate-200 bg-white">
                <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
                    <h1 className="text-lg font-semibold text-slate-900">Dashboard</h1>
                    <ul className="flex items-center gap-2 text-sm sm:gap-4">
                        <li><Link className="rounded-md px-3 py-2 text-slate-700 hover:bg-slate-100" to="/">Dashboard</Link></li>
                        <li><button className="rounded-md px-3 py-2 text-slate-700 hover:bg-slate-100" onClick={() => { localStorage.removeItem("accessToken"); navigate('/login') }}>Logout</button></li>
                    </ul>
                </div>
            </nav>

            <main className="mx-auto grid w-full max-w-6xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-3">
                <section className="rounded-2xl border border-slate-200 bg-white p-5 lg:col-span-1">
                    <h2 className="text-base font-semibold text-slate-900">User Info</h2>
                    <div className="mt-4 space-y-3">
                        <div>
                            <p className="text-xs uppercase tracking-wide text-slate-500">Name</p>
                            <p className="text-sm font-medium text-slate-800">{user?.name}</p>
                        </div>
                        <div>
                            <p className="text-xs uppercase tracking-wide text-slate-500">Role</p>
                            <p className="inline-flex rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">{user?.role}</p>
                        </div>
                    </div>
                </section>

                <section className="rounded-2xl border border-slate-200 bg-white p-5 lg:col-span-2">
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-base font-semibold text-slate-900">Favorite Properties</h2>
                        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">{favoriteProperties.length} saved</span>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        {favoriteProperties?.map((property) => (
                            <article key={property._id} className="overflow-hidden rounded-xl border border-slate-200">
                                <img className="h-32 w-full object-cover" src={property.image} alt={property.name} />
                                <div className="space-y-2 p-3">
                                    <h3 className="text-sm font-semibold text-slate-900">{property.name}</h3>
                                    <p className="text-xs text-slate-500">{property.description}</p>
                                    <p className="text-sm font-medium text-slate-700">{property.price}</p>
                                    <form onSubmit={(e) => handleRemoveFromFavorites(e, property._id)}>
                                        <button className="mt-1 w-full rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-medium text-rose-700 hover:bg-rose-100" type="submit">
                                            Remove Favorite
                                        </button>
                                    </form>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>

                <section className="rounded-2xl border border-slate-200 bg-white p-5 lg:col-span-3">
                    <h2 className="mb-4 text-base font-semibold text-slate-900">Suggested Properties</h2>
                    <div className="grid gap-3 sm:grid-cols-2">
                        {suggestedProperties.map((property) => (
                            <div key={property._id} className="flex items-center justify-between rounded-xl border border-slate-200 p-3">
                                <div>
                                    <h3 className="text-sm font-semibold text-slate-900">{property.name}</h3>
                                    <p className="text-xs text-slate-500">{property.description}</p>
                                    <p className="text-xs font-medium text-slate-700">{property.price}</p>
                                </div>
                                <form onSubmit={(e) => handleAddToFavorites(e, property._id)}>
                                    <button type="submit" className="rounded-lg bg-slate-900 px-3 py-2 text-xs font-medium text-white hover:bg-slate-800">
                                        Add Favorite
                                    </button>
                                </form>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    )
}

export default Dashboard;