export async function fetchAPI <T>(
    endpoint: string,
    options?: RequestInit
): Promise <T>{
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "https://project-sporton-be.vercel.app/api";
    const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
    const url = `${baseUrl}${cleanEndpoint}`;

    try {
        const res = await fetch(url, {
            ...options,
            cache: options?.cache || "no-store", //no store agar data realtime
        });
        if(!res.ok) {
            let errorMessage = `Failed to fetch data from ${url} (status: ${res.status})`;
            try{
                const errorData = await res.json();
                errorMessage = errorData.message || errorData.error || errorMessage;
            } catch (e){
                console.log(e);
            }
            throw new Error(errorMessage);
        }
        return res.json();
    } catch (err) {
        console.error(`fetchAPI error for URL: ${url}`, err);
        throw err;
    }
}

export function getImageUrl(path:string){
    if(!path) return "/images/placeholder.png";
    if(path.startsWith("http")) return path;
    const root = process.env.NEXT_PUBLIC_API_ROOT || "https://project-sporton-be.vercel.app";
    const cleanPath = path.startsWith("/") ? path : `/${path}`;
    return `${root}${cleanPath}`;
}

export function getAuthHeaders(){
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    return{
        Authorization: `Bearer ${token}`,
    };
}
