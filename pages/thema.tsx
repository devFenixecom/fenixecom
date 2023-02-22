import useSWR from 'swr';
import axios from 'axios';
import router from 'next/router';


const ThemePage = () => {
    const { data, error } = useSWR<any>('/api/themes', async (url: string) => {
        const response = await axios.get(url);
        return response.data;
    });

    if (error) return <div>Failed to load themes</div>;
    if (!data) return <div>Loading...</div>;

    return (
        <div>
            {data.map((theme: any) => (
                <p key={theme._id}>{theme.name}</p>
            ))}
        </div>
    );
}

export default ThemePage;